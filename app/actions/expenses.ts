"use server";

import { createClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { parseLocalDate } from "@/lib/utils";
import type { UpdateExpenseInput } from "./expenses.types";

/**
 * Validação de acesso restrito a administradores.
 */
async function assertAdminUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Não autenticado.");
  }

  const role = user.app_metadata?.role || user.user_metadata?.role;
  const isDanilo = user.email === "contato@mindsite.com.br";

  if (!isDanilo && role !== "ADMIN") {
    const dbUser = await prisma.user.findUnique({ where: { id: user.id } });
    if (!dbUser || dbUser.role !== "ADMIN") {
      throw new Error("Acesso não autorizado.");
    }
  }

  return user;
}

/**
 * 1. Gera uma Signed URL temporária (60 minutos) para visualização de comprovante
 * armazenado no bucket privado 'expense-receipts', neutralizando o erro 404 de URLs públicas estáticas.
 */
export async function getExpenseReceiptSignedUrlAction(filePath: string) {
  try {
    await assertAdminUser();

    if (!filePath || typeof filePath !== "string") {
      return { success: false, error: "Caminho do comprovante não fornecido." };
    }

    // Extrai o caminho relativo caso venha uma URL completa legada
    let cleanPath = filePath.trim();
    if (cleanPath.includes("expense-receipts/")) {
      cleanPath = cleanPath.split("expense-receipts/")[1];
    }
    // Remove query params residuais caso existam
    cleanPath = cleanPath.split("?")[0].replace(/^\/+/, "");

    if (!cleanPath) {
      return { success: false, error: "Identificador relativo de arquivo inválido." };
    }

    const { data, error } = await supabaseAdmin.storage
      .from("expense-receipts")
      .createSignedUrl(cleanPath, 3600); // 60 minutos

    if (error || !data?.signedUrl) {
      console.error("[Expenses Storage] Erro ao gerar signed URL para comprovante:", error);
      return { success: false, error: error?.message || "Não foi possível gerar link assinado do comprovante." };
    }

    return { success: true, signedUrl: data.signedUrl };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Erro desconhecido";
    return { success: false, error: message };
  }
}

/**
 * 2. Faz o upload e anexa o comprovante a uma despesa existente (ou substitui comprovante anterior).
 */
export async function attachExpenseReceiptAction(formData: FormData) {
  try {
    await assertAdminUser();

    const expenseId = formData.get("expenseId") as string;
    const file = formData.get("file") as File;

    if (!expenseId) {
      return { success: false, error: "ID da despesa não fornecido." };
    }

    if (!file || !(file instanceof File) || file.size === 0) {
      return { success: false, error: "Arquivo de comprovante inválido ou vazio." };
    }

    const expense = await prisma.companyExpense.findUnique({
      where: { id: expenseId },
    });

    if (!expense) {
      return { success: false, error: "Despesa operacional não localizada." };
    }

    // Garante que o bucket privado exista
    try {
      await supabaseAdmin.storage.createBucket("expense-receipts", {
        public: false,
        fileSizeLimit: 25 * 1024 * 1024, // 25MB
      });
    } catch {
      // Ignora erro caso o bucket já exista
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const cleanFileName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const storagePath = `expenses/${expenseId}/${Date.now()}_${cleanFileName}`;

    const { error: uploadError } = await supabaseAdmin.storage
      .from("expense-receipts")
      .upload(storagePath, buffer, {
        contentType: file.type || "application/octet-stream",
        upsert: true,
      });

    if (uploadError) {
      console.error("[Expenses Storage] Falha no upload do comprovante:", uploadError);
      return { success: false, error: `Falha no upload: ${uploadError.message}` };
    }

    // Atualiza o registro no PostgreSQL via Prisma com o caminho relativo gravado
    await prisma.companyExpense.update({
      where: { id: expenseId },
      data: { receiptUrl: storagePath },
    });

    revalidatePath("/admin");
    revalidatePath("/admin/dashboard");
    return { success: true, receiptUrl: storagePath };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Erro ao anexar comprovante.";
    return { success: false, error: message };
  }
}

/**
 * 3. Atualiza os dados de uma despesa existente (Edição Completa).
 */
export async function updateExpenseAction(expenseId: string, input: UpdateExpenseInput) {
  try {
    await assertAdminUser();

    if (!expenseId) {
      return { success: false, error: "ID da despesa não fornecido." };
    }

    if (!input.name?.trim() || !input.estimatedAmount) {
      return { success: false, error: "Nome e valor estimado são obrigatórios." };
    }

    const dueDateParsed = parseLocalDate(input.dueDate);
    const paymentDateParsed = input.isPaid && input.paymentDate ? parseLocalDate(input.paymentDate) : (input.isPaid ? new Date() : null);

    await prisma.companyExpense.update({
      where: { id: expenseId },
      data: {
        name: input.name.trim(),
        category: input.category,
        frequency: input.frequency,
        currency: input.currency,
        estimatedAmount: input.estimatedAmount,
        actualAmountPaid: input.isPaid ? (input.actualAmountPaid ?? input.estimatedAmount) : null,
        exchangeRateUsed: input.currency === "USD" ? (input.exchangeRateUsed || 5.80) : null,
        dueDate: dueDateParsed,
        paymentDate: paymentDateParsed,
        isPaid: Boolean(input.isPaid),
        notes: input.notes?.trim() || null,
        ...(input.receiptUrl !== undefined ? { receiptUrl: input.receiptUrl } : {}),
      },
    });

    revalidatePath("/admin");
    revalidatePath("/admin/dashboard");
    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Erro ao atualizar despesa.";
    return { success: false, error: message };
  }
}
