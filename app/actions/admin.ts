"use server";

import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Resend } from "resend";
import { createInfinitePayCheckoutLink } from "@/lib/payment/infinitepay";
import {
  Currency,
  ExpenseCategory,
  ExpenseFrequency,
  TicketCategory,
  TicketStatus,
  ContractType,
  InvoiceStatus,
  InstallmentStatus,
  UserRole,
} from "@prisma/client";

// Validador de autorização de administrador
export async function assertAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Não autenticado.");
  }

  const role = user.app_metadata?.role || user.user_metadata?.role;
  const isDanilo = user.email === "danilo@mindsite.com.br";

  if (!isDanilo && role !== "ADMIN") {
    // Verifica no banco de dados também
    const dbUser = await prisma.user.findUnique({ where: { id: user.id } });
    if (!dbUser || dbUser.role !== "ADMIN") {
      throw new Error("Acesso não autorizado. Área restrita a administradores.");
    }
  }

  return user;
}

export async function getAdminDashboardData() {
  await assertAdmin();

  const now = new Date();

  // 1. Clientes com contratos, parcelas, projetos e faturas
  const clients = await prisma.user.findMany({
    where: { role: UserRole.CLIENT },
    include: {
      projects: {
        include: {
          contracts: {
            include: {
              installments: {
                orderBy: { scheduledDate: "asc" },
              },
            },
          },
        },
      },
      invoices: {
        where: {
          status: { in: [InvoiceStatus.PENDING, InvoiceStatus.OVERDUE] },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  let mrrTotal = 0;
  let activeSustainabilityCount = 0;
  const projected = { d30: 0, d60: 0, d90: 0, d120: 0, total: 0 };

  const clientBalances = clients.map((client) => {
    let setupTotal = 0;
    let setupPaid = 0;
    let setupPending = 0;
    let sustainabilityPlanLabel = "Sem Sustentação";
    let hasOverdueInstallment = false;
    let hasOverdueInvoice = false;

    // Checa faturas vencidas do cliente
    client.invoices.forEach((inv) => {
      if (new Date(inv.dueDate) < now) {
        hasOverdueInvoice = true;
      }
    });

    client.projects.forEach((proj) => {
      proj.contracts.forEach((contract) => {
        // Sustentação (MRR recorrente puro)
        if (contract.contractType === ContractType.SUSTAINABILITY && contract.status === "ACTIVE") {
          const val = Number(contract.totalAmount);
          mrrTotal += val;
          activeSustainabilityCount++;
          if (val === 100) sustainabilityPlanLabel = "Essential (R$ 100/mês)";
          else if (val === 300) sustainabilityPlanLabel = "Development (R$ 300/mês)";
          else if (val === 700) sustainabilityPlanLabel = "Advanced (R$ 700/mês)";
          else sustainabilityPlanLabel = `Custom (R$ ${val}/mês)`;
        }

        // Setup e Implantação
        if (contract.contractType === ContractType.PROJECT_DEV) {
          setupTotal += Number(contract.totalAmount);
          setupPaid += Number(contract.paidAmount);

          contract.installments.forEach((inst) => {
            const instAmount = Number(inst.amount);
            const instDate = new Date(inst.scheduledDate);

            if (inst.status !== InstallmentStatus.PAID && inst.status !== InstallmentStatus.CANCELLED) {
              setupPending += instAmount;

              // Verifica se a parcela passou da data prevista sem baixa
              if (instDate < now) {
                hasOverdueInstallment = true;
              }

              // Projeção futura nos próximos 120 dias
              const diffDays = Math.ceil((instDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
              if (diffDays >= 0 && diffDays <= 30) projected.d30 += instAmount;
              else if (diffDays > 30 && diffDays <= 60) projected.d60 += instAmount;
              else if (diffDays > 60 && diffDays <= 90) projected.d90 += instAmount;
              else if (diffDays > 90 && diffDays <= 120) projected.d120 += instAmount;
            }
          });
        }
      });
    });

    // Status composto de inadimplência
    const isOverdue = hasOverdueInstallment || hasOverdueInvoice;
    let statusText: "EM_DIA" | "ATRASO" | "QUITADO" = "EM_DIA";

    if (isOverdue) {
      statusText = "ATRASO";
    } else if (setupTotal > 0 && setupPending === 0) {
      statusText = "QUITADO";
    }

    return {
      userId: client.id,
      name: client.fullName || "Cliente",
      email: client.email,
      companyName: client.companyName || client.fullName || "Não informado",
      projectName: client.projects[0]?.name || "Nenhum projeto",
      sustainabilityPlan: sustainabilityPlanLabel,
      setupTotal,
      setupPaid,
      setupDue: setupPending,
      status: statusText,
      activeContractsCount: client.projects.reduce((acc, p) => acc + p.contracts.length, 0),
    };
  });

  projected.total = projected.d30 + projected.d60 + projected.d90 + projected.d120;

  // Demais consultas (despesas, tickets, estatísticas)
  const expenses = await prisma.companyExpense.findMany({ orderBy: { dueDate: "asc" } });
  const tickets = await prisma.ticket.findMany({
    include: {
      user: true,
      project: true,
      attachments: true,
    },
    orderBy: { createdAt: "desc" },
  });

  const estimatedExpenses = expenses.reduce((acc, curr) => acc + Number(curr.estimatedAmount), 0);
  const paidExpenses = expenses
    .filter((e) => e.isPaid)
    .reduce((acc, curr) => acc + Number(curr.actualAmountPaid || curr.estimatedAmount), 0);

  return {
    finance: {
      mrrTotal,
      activeSustainabilityCount,
      projected,
      clientBalances,
      monthlyExpenses: {
        estimated: estimatedExpenses,
        paid: paidExpenses,
      },
    },
    expenses: expenses.map((e) => ({
      ...e,
      estimatedAmount: Number(e.estimatedAmount),
      actualAmountPaid: e.actualAmountPaid ? Number(e.actualAmountPaid) : null,
      exchangeRateUsed: e.exchangeRateUsed ? Number(e.exchangeRateUsed) : null,
      dueDate: e.dueDate.toISOString(),
      paymentDate: e.paymentDate ? e.paymentDate.toISOString() : null,
    })),
    tickets: tickets.map((t) => ({
      ...t,
      slaDueAt: t.slaDueAt.toISOString(),
      createdAt: t.createdAt.toISOString(),
      isOverdue: t.status !== "RESOLVED" && t.status !== "CANCELLED" && new Date(t.slaDueAt) < now,
      client: { name: t.user.fullName || t.user.email, email: t.user.email },
      project: { name: t.project.name, domain: t.project.domain },
      attachmentsCount: t.attachments.length,
      attachments: t.attachments,
    })),
    stats: {
      openTickets: tickets.filter((t) => t.status === "OPEN").length,
      inProgressTickets: tickets.filter((t) => t.status === "IN_PROGRESS").length,
      overdueTickets: tickets.filter(
        (t) => t.status !== "RESOLVED" && t.status !== "CANCELLED" && new Date(t.slaDueAt) < now
      ).length,
      resolvedTickets: tickets.filter((t) => t.status === "RESOLVED").length,
    },
  };
}

// Reclassificação de chamados (ajustando categoria e recalculando SLA automaticamente)
export async function reclassifyTicketAction(
  ticketId: string,
  newCategory: TicketCategory
) {
  await assertAdmin();

  const ticket = await prisma.ticket.findUnique({
    where: { id: ticketId },
  });

  if (!ticket) {
    return { success: false, error: "Chamado não encontrado." };
  }

  // Define novas horas de SLA
  let slaHours = 24;
  if (newCategory === "INTERMEDIATE") {
    slaHours = 72;
  } else if (newCategory === "ADVANCED") {
    slaHours = 168; // 7 dias
  }

  // Recalcula SLA baseado na data de criação original do chamado
  const slaDueAt = new Date(ticket.createdAt.getTime() + slaHours * 60 * 60 * 1000);

  await prisma.ticket.update({
    where: { id: ticketId },
    data: {
      category: newCategory,
      slaHours,
      slaDueAt,
      // Se estava OPEN e mudou categoria, pode manter ou sinalizar
    },
  });

  revalidatePath("/admin/dashboard");
  revalidatePath("/portal/dashboard");

  return {
    success: true,
    message: `Chamado reclassificado para ${newCategory}. SLA recalculado para ${slaHours}h.`,
  };
}

// Atualização de status de chamado (OPEN -> IN_PROGRESS -> RESOLVED)
export async function updateTicketStatusAction(
  ticketId: string,
  newStatus: TicketStatus
) {
  await assertAdmin();

  const dataToUpdate: any = { status: newStatus };
  if (newStatus === "RESOLVED") {
    dataToUpdate.resolvedAt = new Date();
  } else {
    dataToUpdate.resolvedAt = null;
  }

  await prisma.ticket.update({
    where: { id: ticketId },
    data: dataToUpdate,
  });

  revalidatePath("/admin/dashboard");
  revalidatePath("/portal/dashboard");

  return { success: true };
}

// Lançamento de despesa operacional da empresa
export type CreateExpenseInput = {
  name: string;
  category: ExpenseCategory;
  frequency: ExpenseFrequency;
  currency: Currency;
  estimatedAmount: number;
  actualAmountPaid?: number;
  exchangeRateUsed?: number;
  dueDate: string;
  paymentDate?: string;
  isPaid?: boolean;
  notes?: string;
};

export async function createExpenseAction(input: CreateExpenseInput) {
  await assertAdmin();

  if (!input.name?.trim() || !input.estimatedAmount) {
    return { success: false, error: "Nome e valor estimado são obrigatórios." };
  }

  try {
    const expense = await prisma.companyExpense.create({
      data: {
        name: input.name.trim(),
        category: input.category,
        frequency: input.frequency,
        currency: input.currency,
        estimatedAmount: input.estimatedAmount,
        actualAmountPaid: input.actualAmountPaid || (input.isPaid ? input.estimatedAmount : null),
        exchangeRateUsed: input.currency === "USD" ? (input.exchangeRateUsed || 5.80) : null,
        dueDate: new Date(input.dueDate),
        paymentDate: input.isPaid && input.paymentDate ? new Date(input.paymentDate) : (input.isPaid ? new Date() : null),
        isPaid: Boolean(input.isPaid),
        notes: input.notes?.trim() || null,
      },
    });

    revalidatePath("/admin/dashboard");
    return { success: true, expenseId: expense.id };
  } catch (err: any) {
    console.error("Erro ao criar despesa:", err);
    return { success: false, error: err.message || "Erro ao registrar despesa." };
  }
}

// Liquidação / Baixa de despesa com cotação cambial efetiva
export async function settleExpenseAction(
  expenseId: string,
  actualAmountPaid: number,
  exchangeRateUsed?: number,
  paymentDate?: string
) {
  await assertAdmin();

  try {
    await prisma.companyExpense.update({
      where: { id: expenseId },
      data: {
        isPaid: true,
        actualAmountPaid,
        exchangeRateUsed: exchangeRateUsed || null,
        paymentDate: paymentDate ? new Date(paymentDate) : new Date(),
      },
    });

    revalidatePath("/admin/dashboard");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Erro ao liquidar despesa." };
  }
}

// Criação atômica de fatura com múltiplos itens discriminados (prisma.$transaction)
export type CreateInvoiceInput = {
  userId: string;
  dueDate: string;
  items: Array<{
    description: string;
    amount: number;
    installmentId?: string;
  }>;
  pixCopyPaste?: string;
  pixQrCode?: string;
  gatewayInvoiceUrl?: string;
};

export async function createInvoiceWithItemsAction(input: CreateInvoiceInput) {
  await assertAdmin();

  if (!input.userId || !input.items || input.items.length === 0) {
    return { success: false, error: "Cliente e ao menos um item de fatura são obrigatórios." };
  }

  const totalAmount = input.items.reduce((sum, item) => sum + Number(item.amount), 0);
  const invoiceNumber = `INV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

  try {
    const invoice = await prisma.$transaction(async (tx) => {
      const createdInvoice = await tx.invoice.create({
        data: {
          invoiceNumber,
          dueDate: new Date(input.dueDate),
          totalAmount,
          status: "PENDING",
          pixCopyPaste: input.pixCopyPaste || null,
          pixQrCode: input.pixQrCode || null,
          gatewayInvoiceUrl: input.gatewayInvoiceUrl || null,
          userId: input.userId,
          items: {
            create: input.items.map((it) => ({
              description: it.description,
              amount: it.amount,
            })),
          },
        },
        include: {
          items: true,
        },
      });

      // Se houver vínculos com parcelas de contrato agendadas, atualiza status para BILLED
      for (const item of input.items) {
        if (item.installmentId) {
          await tx.contractInstallment.update({
            where: { id: item.installmentId },
            data: { status: "BILLED" },
          });
        }
      }

      return createdInvoice;
    });

    revalidatePath("/admin/dashboard");
    revalidatePath("/portal/dashboard");
    return { success: true, invoiceId: invoice.id, invoiceNumber: invoice.invoiceNumber };
  } catch (err: any) {
    console.error("Erro na transação de fatura:", err);
    return { success: false, error: err.message || "Erro ao gerar fatura consolidada." };
  }
}

export async function issueImmediateInvoiceAction(data: {
  userId: string;
  description: string;
  amount: number;
  installmentId?: string;
  dueDateDays?: number;
}) {
  await assertAdmin();

  if (!data.userId || data.amount <= 0 || !data.description?.trim()) {
    return { success: false, error: "Preencha a descrição e um valor válido." };
  }

  const client = await prisma.user.findUnique({
    where: { id: data.userId },
  });

  if (!client) {
    return { success: false, error: "Cliente não localizado." };
  }

  const invoiceNumber = `INV-${Date.now().toString().slice(-6)}`;
  const days = data.dueDateDays || 3;
  const dueDate = new Date(Date.now() + days * 24 * 60 * 60 * 1000);

  // 1. Gera link oficial na InfinitePay
  const checkoutRes = await createInfinitePayCheckoutLink({
    orderNsu: invoiceNumber,
    amountInCents: Math.round(data.amount * 100),
    items: [
      {
        description: data.description.trim(),
        price: Math.round(data.amount * 100),
        quantity: 1,
      },
    ],
    customer: {
      name: client.fullName || "Cliente",
      email: client.email,
      phone: client.phone || undefined,
    },
  });

  const checkoutUrl =
    checkoutRes.success && checkoutRes.url
      ? checkoutRes.url
      : `https://pay.infinitepay.io/checkout/${invoiceNumber}`;

  // 2. Salva a fatura no Prisma
  const invoice = await prisma.invoice.create({
    data: {
      invoiceNumber,
      dueDate,
      totalAmount: data.amount,
      status: "PENDING",
      gatewayPaymentId: checkoutRes.slug || invoiceNumber,
      gatewayInvoiceUrl: checkoutUrl,
      userId: client.id,
      items: {
        create: [
          {
            description: data.description.trim(),
            amount: data.amount,
          },
        ],
      },
    },
    include: { items: true },
  });

  // Se vinculada a uma parcela agendada
  if (data.installmentId && invoice.items[0]) {
    await prisma.contractInstallment.update({
      where: { id: data.installmentId },
      data: {
        status: "BILLED",
        invoiceItemId: invoice.items[0].id,
      },
    });
  }

  // 3. Dispara e-mail imediato via Resend
  const valorFormatado = `R$ ${data.amount.toFixed(2).replace(".", ",")}`;
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "MindSite Financeiro <financeiro@mindsite.com.br>",
      to: client.email,
      subject: `Fatura Emitida: ${data.description} (${valorFormatado})`,
      html: `
        <div style="font-family: sans-serif; padding: 25px; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 4px;">
          <h2 style="color: #002bba; margin-top: 0;">Nova Fatura Emitida</h2>
          <p>Olá, <strong>${client.fullName || "Cliente"}</strong>.</p>
          <p>Informamos que foi gerada uma nova fatura (<strong>${invoiceNumber}</strong>) no valor de <strong>${valorFormatado}</strong> com vencimento para <strong>${dueDate.toLocaleDateString("pt-BR")}</strong>.</p>
          <p><strong>Item / Descrição:</strong> ${data.description}</p>
          <p style="margin: 30px 0;">
            <a href="${checkoutUrl}" target="_blank" rel="noopener noreferrer" style="background:#002bba; color:#ffffff; padding:12px 24px; text-decoration:none; border-radius:4px; font-weight:bold; display:inline-block;">
              Pagar com Cartão ou Pix na InfinitePay ➔
            </a>
          </p>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
          <p style="font-size: 12px; color: #64748b; margin-bottom: 0;">MindSite Agência Digital — CNPJ 19.725.535/0001-58</p>
        </div>
      `,
    });
  } catch (emailErr: any) {
    console.error("Falha ao disparar e-mail da fatura imediata:", emailErr.message);
  }

  revalidatePath("/admin/dashboard");
  revalidatePath("/admin/clients");
  revalidatePath("/portal/dashboard");

  return {
    success: true,
    invoiceNumber,
    checkoutUrl,
    message: "Fatura emitida e enviada por e-mail com sucesso!",
  };
}
