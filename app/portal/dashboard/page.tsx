import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getClientDashboardData } from "@/app/actions/portal";
import PortalDashboardView from "./PortalDashboardView";
import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Área do Cliente | MindSite",
  description: "Gerencie chamados técnicos com SLA e faturas do seu projeto.",
};

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function ClientDashboardPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  try {
    const params = searchParams ? await searchParams : {};
    const isPaymentSuccess = params.payment === "success";

    const orderNsu =
      typeof params.order_nsu === "string"
        ? params.order_nsu
        : typeof params.orderNsu === "string"
        ? params.orderNsu
        : undefined;

    const transactionNsu =
      typeof params.transaction_nsu === "string"
        ? params.transaction_nsu
        : typeof params.transaction_id === "string"
        ? params.transaction_id
        : undefined;

    const slug = typeof params.slug === "string" ? params.slug : undefined;
    const receiptUrl =
      typeof params.receipt_url === "string" ? params.receipt_url : undefined;
    const captureMethod =
      typeof params.capture_method === "string"
        ? params.capture_method.toLowerCase()
        : "pix";

    if (isPaymentSuccess) {
      console.info("[Sync Settle] Retorno de pagamento detectado:", {
        orderNsu,
        slug,
        transactionNsu,
        userId: user?.id,
      });

      const orConditions: Array<Record<string, unknown>> = [];

      if (orderNsu) {
        orConditions.push({ invoiceNumber: orderNsu });
        orConditions.push({ gatewayPaymentId: orderNsu });
        orConditions.push({ id: orderNsu });
      }

      if (slug) {
        orConditions.push({ gatewayInvoiceUrl: { contains: slug } });
        orConditions.push({ gatewayPaymentId: slug });
      }

      if (transactionNsu) {
        orConditions.push({ gatewayPaymentId: transactionNsu });
      }

      // 1. Tenta localizar pelos identificadores específicos retornados
      let invoice =
        orConditions.length > 0
          ? await prisma.invoice.findFirst({
              where: { OR: orConditions },
              include: { items: { include: { installment: true } } },
            })
          : null;

      // 2. Fallback de Segurança por Sessão: Se os identificadores da URL divergirem,
      // busca a fatura em aberto (PENDING ou OVERDUE) mais recente do próprio usuário logado
      if (!invoice && user?.id) {
        console.warn(
          "[Sync Settle] Identificador direto não coincidiu. Ativando fallback de fatura em aberto do usuário autenticado."
        );
        invoice = await prisma.invoice.findFirst({
          where: {
            userId: user.id,
            status: { in: ["PENDING", "OVERDUE"] },
          },
          orderBy: { createdAt: "desc" },
          include: { items: { include: { installment: true } } },
        });
      }

      // 3. Executa a liquidação atômica no PostgreSQL via Prisma
      if (invoice && invoice.status !== "PAID") {
        await prisma.$transaction([
          prisma.invoice.update({
            where: { id: invoice.id },
            data: {
              status: "PAID",
              paidAt: new Date(),
              receiptUrl: receiptUrl || invoice.receiptUrl,
              paymentMethod: captureMethod === "pix" ? "PIX" : "CREDIT_CARD",
              gatewayPaymentId:
                transactionNsu || orderNsu || slug || invoice.gatewayPaymentId,
            },
          }),
          prisma.contractInstallment.updateMany({
            where: {
              invoiceItemId: { in: invoice.items.map((it) => it.id) },
            },
            data: { status: "PAID" },
          }),
        ]);

        for (const item of invoice.items) {
          if (item.installment?.contractId) {
            await prisma.contract.update({
              where: { id: item.installment.contractId },
              data: { paidAmount: { increment: item.amount } },
            });
          }
        }

        console.info(
          `[Sync Settle Success] Fatura #${invoice.invoiceNumber} liquidada com sucesso!`
        );

        // Invalida o cache do App Router para renderizar os dados atualizados imediatamente
        revalidatePath("/portal/dashboard");
      }
    }
  } catch (reconcileError: unknown) {
    console.error("[Sync Settle Error]:", reconcileError);
  }

  let data;
  try {
    data = await getClientDashboardData();
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Erro desconhecido";
    console.error("Erro ao carregar área do cliente:", message);
    redirect("/login");
  }

  return <PortalDashboardView data={data} isFirstLogin={data.isFirstLogin} />;
}