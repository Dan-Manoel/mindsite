"use server";

import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Resend } from "resend";
import { createInfinitePayCheckoutLink } from "@/lib/payment/infinitepay";
import { renderInvoiceEmailHtml } from "@/lib/mail/invoiceTemplate";
import { renderTicketNotificationEmailHtml } from "@/lib/mail/ticketCreatedTemplate";
import { sendTicketNotificationEmail } from "@/lib/mail/ticketNotificationTemplate";
import { supabaseAdmin } from "@/lib/supabase/admin";
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
import { settleInstallmentManuallyAction as settleAction } from "@/app/actions/adminClients";

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
  const isDanilo = user.email === "contato@mindsite.com.br";

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
        include: {
          items: true,
        },
        orderBy: { dueDate: "desc" },
      },
      tickets: {
        orderBy: { createdAt: "desc" },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  let mrrTotal = 0;
  let activeSustainabilityCount = 0;
  const projected = { d30: 0, d60: 0, d90: 0, d120: 0, total: 0 };

  const planDistribution = {
    essential: 0,
    development: 0,
    advanced: 0,
    custom: 0,
    total: 0,
  };

  const clientBalances = clients.map((client) => {
    let setupTotal = 0;
    let setupPaid = 0;
    let setupPending = 0;
    let sustainabilityPlanLabel = "Sem Sustentação";
    let hasOverdueInstallment = false;
    let hasOverdueInvoice = false;

    let sustainabilityContract: {
      contractId: string;
      planName: string;
      monthlyAmount: number;
    } | null = null;

    const pendingInstallments: Array<{
      id: string;
      installmentNumber: number;
      description: string;
      amount: number;
      scheduledDate: string;
      projectName: string;
    }> = [];

    // Checa faturas vencidas do cliente
    client.invoices.forEach((inv) => {
      const isOverdue = inv.status === InvoiceStatus.OVERDUE || (inv.status === InvoiceStatus.PENDING && new Date(inv.dueDate) < now);
      if (isOverdue) {
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
          planDistribution.total++;
          let pName = "Personalizado";
          if (val === 100) {
            sustainabilityPlanLabel = "Essential (R$ 100/mês)";
            pName = "Essential";
            planDistribution.essential++;
          } else if (val === 300) {
            sustainabilityPlanLabel = "Development (R$ 300/mês)";
            pName = "Development";
            planDistribution.development++;
          } else if (val === 700) {
            sustainabilityPlanLabel = "Advanced (R$ 700/mês)";
            pName = "Advanced";
            planDistribution.advanced++;
          } else {
            sustainabilityPlanLabel = `Custom (R$ ${val}/mês)`;
            pName = "Custom";
            planDistribution.custom++;
          }

          sustainabilityContract = {
            contractId: contract.id,
            planName: pName,
            monthlyAmount: val,
          };
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

              if (inst.status === InstallmentStatus.SCHEDULED) {
                pendingInstallments.push({
                  id: inst.id,
                  installmentNumber: inst.installmentNumber,
                  description: inst.description || `Parcela 0${inst.installmentNumber}`,
                  amount: instAmount,
                  scheduledDate: inst.scheduledDate.toISOString(),
                  projectName: proj.name,
                });
              }

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
      phone: client.phone || "",
      companyName: client.companyName || client.fullName || "Não informado",
      document: client.document || "",
      projectName: client.projects[0]?.name || "Nenhum projeto",
      projects: client.projects.map((p) => ({
        id: p.id,
        name: p.name,
        domain: p.domain,
        isActive: p.isActive,
        contracts: p.contracts.map((c) => ({
          id: c.id,
          title: c.title,
          contractType: c.contractType,
          status: c.status,
          totalAmount: Number(c.totalAmount),
          paidAmount: Number(c.paidAmount),
        })),
      })),
      sustainabilityPlan: sustainabilityPlanLabel,
      sustainabilityDetails: sustainabilityContract,
      pendingInstallments,
      setupTotal,
      setupPaid,
      setupDue: setupPending,
      status: statusText,
      activeContractsCount: client.projects.reduce((acc, p) => acc + p.contracts.length, 0),
      ticketsCount: client.tickets.length,
      invoicesCount: client.invoices.length,
    };
  });

  projected.total = projected.d30 + projected.d60 + projected.d90 + projected.d120;

  // 2. Despesas, Tickets e Faturas
  const expenses = await prisma.companyExpense.findMany({ orderBy: { dueDate: "asc" } });
  const tickets = await prisma.ticket.findMany({
    include: {
      user: true,
      project: true,
      attachments: true,
      comments: {
        orderBy: { createdAt: "asc" },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const estimatedExpenses = expenses.reduce((acc, curr) => acc + Number(curr.estimatedAmount), 0);
  const paidExpenses = expenses
    .filter((e) => e.isPaid)
    .reduce((acc, curr) => acc + Number(curr.actualAmountPaid || curr.estimatedAmount), 0);

  // 3. Projeção de Recebimentos para os Próximos 12 Meses
  const shortMonthNames = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
  const fullMonthNames = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  const allPendingInstallments = clients.flatMap((c) =>
    c.projects.flatMap((p) =>
      p.contracts.flatMap((ct) =>
        ct.installments.filter(
          (i) => i.status !== InstallmentStatus.PAID && i.status !== InstallmentStatus.CANCELLED
        )
      )
    )
  );

  const projection12Months: Array<{
    monthKey: string;
    monthLabel: string;
    mrr: number;
    milestones: number;
    total: number;
  }> = [];

  let total12MonthsProjected = 0;

  for (let m = 0; m < 12; m++) {
    const targetDate = new Date(now.getFullYear(), now.getMonth() + m, 1);
    const nextMonthDate = new Date(now.getFullYear(), now.getMonth() + m + 1, 1);
    const monthKey = `${shortMonthNames[targetDate.getMonth()]}/${targetDate.getFullYear().toString().slice(-2)}`;
    const monthLabel = `${fullMonthNames[targetDate.getMonth()]} ${targetDate.getFullYear()}`;

    // Recorrência mensal fixa (MRR)
    const mrrForMonth = mrrTotal;

    // Parcelas de projetos agendadas para o mês correspondente
    const milestonesForMonth = allPendingInstallments
      .filter((inst) => {
        const d = new Date(inst.scheduledDate);
        return d >= targetDate && d < nextMonthDate;
      })
      .reduce((sum, inst) => sum + Number(inst.amount), 0);

    const monthTotal = mrrForMonth + milestonesForMonth;
    total12MonthsProjected += monthTotal;

    projection12Months.push({
      monthKey,
      monthLabel,
      mrr: mrrForMonth,
      milestones: milestonesForMonth,
      total: monthTotal,
    });
  }

  // 4. Comparativo de Despesas Projetadas vs. Realizadas (12 meses: 4 passados + atual + 7 futuros)
  const expensesComparison: Array<{
    monthKey: string;
    monthLabel: string;
    projected: number;
    actual: number;
  }> = [];

  for (let m = -4; m <= 7; m++) {
    const targetDate = new Date(now.getFullYear(), now.getMonth() + m, 1);
    const nextMonthDate = new Date(now.getFullYear(), now.getMonth() + m + 1, 1);
    const monthKey = `${shortMonthNames[targetDate.getMonth()]}/${targetDate.getFullYear().toString().slice(-2)}`;
    const monthLabel = `${fullMonthNames[targetDate.getMonth()]} ${targetDate.getFullYear()}`;

    const monthExpenses = expenses.filter((e) => {
      const d = new Date(e.dueDate);
      return d >= targetDate && d < nextMonthDate;
    });

    const projectedAmount = monthExpenses.reduce((sum, e) => sum + Number(e.estimatedAmount), 0);
    const actualAmount = monthExpenses
      .filter((e) => e.isPaid)
      .reduce((sum, e) => sum + Number(e.actualAmountPaid || e.estimatedAmount), 0);

    expensesComparison.push({
      monthKey,
      monthLabel,
      projected: projectedAmount,
      actual: actualAmount,
    });
  }

  // 5. Métricas Operacionais Adicionais (Faturas em Atraso consolidado, Distribuição de Assinantes, Resumo de Chamados)
  const allInvoices = await prisma.invoice.findMany({
    select: {
      id: true,
      dueDate: true,
      totalAmount: true,
      status: true,
    },
  });

  const overdueInvoices = allInvoices.filter(
    (inv) => inv.status === InvoiceStatus.OVERDUE || (inv.status === InvoiceStatus.PENDING && new Date(inv.dueDate) < now)
  );
  const overdueInvoicesCount = overdueInvoices.length;
  const overdueInvoicesTotal = overdueInvoices.reduce((sum, inv) => sum + Number(inv.totalAmount), 0);

  const ticketSummary = {
    open: tickets.filter((t) => t.status === "OPEN").length,
    inProgress: tickets.filter((t) => t.status === "IN_PROGRESS").length,
    waitingClient: tickets.filter((t) => t.status === "WAITING_CLIENT").length,
    resolved: tickets.filter((t) => t.status === "RESOLVED").length,
    overdue: tickets.filter(
      (t) => t.status !== "RESOLVED" && t.status !== "CANCELLED" && new Date(t.slaDueAt) < now
    ).length,
    total: tickets.length,
  };

  // 6. Opções de clientes para o Combobox de abertura de chamado
  const clientOptions = clients.map((c) => ({
    id: c.id,
    name: c.fullName || c.companyName || c.email,
    companyName: c.companyName || "",
    email: c.email,
    document: c.document || "",
    projects: c.projects.map((p) => ({
      id: p.id,
      name: p.name,
      domain: p.domain,
    })),
  }));

  return {
    finance: {
      mrrTotal,
      activeSustainabilityCount,
      projected,
      projection12Months,
      total12MonthsProjected,
      expensesComparison,
      clientBalances,
      monthlyExpenses: {
        estimated: estimatedExpenses,
        paid: paidExpenses,
      },
    },
    operationalMetrics: {
      overdueInvoices: {
        count: overdueInvoicesCount,
        totalAmount: overdueInvoicesTotal,
      },
      planDistribution,
      ticketSummary,
    },
    clientOptions,
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
      comments: (t.comments || []).map((c) => ({
        id: c.id,
        message: c.message,
        authorName: c.authorName,
        isAdmin: c.isAdmin,
        attachments: c.attachments || [],
        createdAt: c.createdAt.toISOString(),
      })),
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

// Atualização de status de chamado (OPEN -> IN_PROGRESS -> WAITING_CLIENT -> RESOLVED)
export async function updateTicketStatusAction(
  ticketId: string,
  newStatus: TicketStatus
) {
  await assertAdmin();

  const dataToUpdate: {
    status: TicketStatus;
    resolvedAt?: Date | null;
    slaPausedAt?: Date | null;
  } = { status: newStatus };

  const now = new Date();

  if (newStatus === "RESOLVED") {
    dataToUpdate.resolvedAt = now;
    dataToUpdate.slaPausedAt = null;
  } else if (newStatus === "WAITING_CLIENT") {
    dataToUpdate.resolvedAt = now;
    dataToUpdate.slaPausedAt = now;
  } else {
    dataToUpdate.resolvedAt = null;
    dataToUpdate.slaPausedAt = null;
  }

  const updatedTicket = await prisma.ticket.update({
    where: { id: ticketId },
    data: dataToUpdate,
    include: { user: true },
  });

  if (newStatus === "WAITING_CLIENT" && updatedTicket.user.email) {
    sendTicketNotificationEmail({
      to: updatedTicket.user.email,
      clientName: updatedTicket.user.fullName || updatedTicket.user.companyName || "Cliente",
      ticketNumber: updatedTicket.ticketNumber,
      ticketTitle: updatedTicket.title,
      messageSnippet: "A equipe concluiu o atendimento desta demanda e aguarda sua homologação no portal.",
      actionUrl: "https://mindsite.com.br/portal/chamados",
      type: "AGUARDANDO_CLIENTE",
    }).catch((mailErr) => {
      console.error("Erro ao enviar email de aguardando cliente:", mailErr);
    });
  }

  revalidatePath("/admin/dashboard");
  revalidatePath("/portal/dashboard");
  revalidatePath("/admin/chamados");
  revalidatePath("/portal/chamados");

  return { success: true };
}

// Lançamento de despesa operacional da empresa
type CreateExpenseInput = {
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
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Erro ao registrar despesa.";
    console.error("Erro ao criar despesa:", message);
    return { success: false, error: message };
  }
}

// Liquidação / Baixa de despesa com suporte a comprovante de pagamento
export async function settleExpenseAction(
  expenseId: string,
  actualAmountPaid: number,
  arg3?: string | number, // paymentDate (string) ou exchangeRateUsed (number)
  arg4?: string, // receiptUrl ou paymentDate
  arg5?: string // receiptUrl
) {
  await assertAdmin();

  let paymentDate: string | undefined;
  let exchangeRateUsed: number | undefined;
  let receiptUrl: string | undefined;

  if (typeof arg3 === "number") {
    exchangeRateUsed = arg3;
    paymentDate = typeof arg4 === "string" ? arg4 : undefined;
    receiptUrl = arg5;
  } else if (typeof arg3 === "string") {
    paymentDate = arg3;
    receiptUrl = arg4;
  }

  try {
    await prisma.companyExpense.update({
      where: { id: expenseId },
      data: {
        isPaid: true,
        actualAmountPaid,
        exchangeRateUsed: exchangeRateUsed || null,
        paymentDate: paymentDate ? new Date(paymentDate) : new Date(),
        ...(receiptUrl ? { receiptUrl } : {}),
      },
    });

    revalidatePath("/admin/dashboard");
    revalidatePath("/admin");
    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Erro ao liquidar despesa.";
    return { success: false, error: message };
  }
}

// Upload de Comprovante de Pagamento de Despesa no Supabase Storage
export async function uploadExpenseReceiptAction(formData: FormData) {
  await assertAdmin();

  const file = formData.get("file") as File;
  if (!file) {
    return { success: false, error: "Nenhum arquivo enviado." };
  }

  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileExt = file.name.split(".").pop() || "pdf";
    const fileName = `receipt-${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

    try {
      await supabaseAdmin.storage.createBucket("expense-receipts", { public: true });
    } catch {
      // Ignora caso bucket já exista
    }

    const { error: uploadError } = await supabaseAdmin.storage
      .from("expense-receipts")
      .upload(fileName, buffer, {
        contentType: file.type || "application/octet-stream",
        upsert: true,
      });

    if (uploadError) {
      console.error("Erro upload Supabase storage:", uploadError);
      return { success: false, error: uploadError.message };
    }

    const { data: urlData } = supabaseAdmin.storage
      .from("expense-receipts")
      .getPublicUrl(fileName);

    return { success: true, publicUrl: urlData.publicUrl };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Erro no upload do comprovante.";
    return { success: false, error: msg };
  }
}

// Abertura Administrativa de Chamado em nome do Cliente (Triagem via WhatsApp)
export async function createTicketForClientAction(data: {
  clientId: string;
  projectId: string;
  title: string;
  category: TicketCategory;
  description: string;
}) {
  await assertAdmin();

  if (!data.clientId || !data.projectId || !data.title?.trim() || !data.description?.trim()) {
    return { success: false, error: "Preencha todos os campos obrigatórios." };
  }

  const client = await prisma.user.findUnique({
    where: { id: data.clientId },
    include: {
      projects: { where: { id: data.projectId } },
    },
  });

  if (!client) {
    return { success: false, error: "Cliente não encontrado." };
  }

  const project = client.projects[0];
  if (!project) {
    return { success: false, error: "Projeto selecionado não pertence ao cliente." };
  }

  let slaHours = 24;
  if (data.category === TicketCategory.INTERMEDIATE) slaHours = 72;
  if (data.category === TicketCategory.ADVANCED) slaHours = 168; // 7 dias

  const slaDueAt = new Date(Date.now() + slaHours * 60 * 60 * 1000);

  const ticket = await prisma.ticket.create({
    data: {
      title: data.title.trim(),
      description: data.description.trim(),
      category: data.category,
      slaHours,
      slaDueAt,
      userId: client.id,
      projectId: project.id,
      status: TicketStatus.OPEN,
    },
  });

  // Notificar cliente por e-mail com template institucional
  try {
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const emailHtml = renderTicketNotificationEmailHtml({
        clientName: client.fullName || client.companyName || "Cliente",
        ticketNumber: ticket.ticketNumber,
        ticketTitle: ticket.title,
        category: data.category as "BASIC" | "INTERMEDIATE" | "ADVANCED",
        slaHours,
        slaDueAt: slaDueAt.toLocaleString("pt-BR"),
        description: ticket.description,
        projectName: project.name,
        portalUrl: "https://mindsite.com.br/portal/dashboard",
      });

      await resend.emails.send({
        from: "MindSite Suporte <suporte@mindsite.com.br>",
        to: client.email,
        subject: `[Chamado #${ticket.ticketNumber}] ${ticket.title} — MindSite Suporte`,
        html: emailHtml,
      });
    }
  } catch (err: unknown) {
    console.error("Erro ao enviar e-mail de notificação de chamado:", err);
  }

  revalidatePath("/admin/dashboard");
  revalidatePath("/admin");
  revalidatePath("/portal/dashboard");

  return { success: true, ticketId: ticket.id, ticketNumber: ticket.ticketNumber };
}

// Criação atômica de fatura com múltiplos itens discriminados (prisma.$transaction)
type CreateInvoiceInput = {
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
    const linkedInstIds = input.items.map((it) => it.installmentId).filter(Boolean) as string[];
    let invoiceDueDate = new Date(input.dueDate);
    if (linkedInstIds.length > 0) {
      const linkedInst = await prisma.contractInstallment.findMany({
        where: { id: { in: linkedInstIds } },
        orderBy: { scheduledDate: "asc" },
      });
      if (linkedInst.length > 0) {
        invoiceDueDate = new Date(linkedInst[0].scheduledDate);
      }
    }

    const isOverdue = invoiceDueDate <= new Date();
    const initialStatus: InvoiceStatus = isOverdue ? "OVERDUE" : "PENDING";

    const invoice = await prisma.$transaction(async (tx) => {
      const createdInvoice = await tx.invoice.create({
        data: {
          invoiceNumber,
          dueDate: invoiceDueDate,
          totalAmount,
          status: initialStatus,
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

      // Se houver vínculos com parcelas de contrato agendadas, atualiza status para BILLED e vincula invoiceItemId
      for (let idx = 0; idx < input.items.length; idx++) {
        const item = input.items[idx];
        if (item.installmentId && createdInvoice.items[idx]) {
          await tx.contractInstallment.update({
            where: { id: item.installmentId },
            data: {
              status: "BILLED",
              invoiceItemId: createdInvoice.items[idx].id,
            },
          });
        }
      }

      return createdInvoice;
    });

    revalidatePath("/admin/dashboard");
    revalidatePath("/portal/dashboard");
    return { success: true, invoiceId: invoice.id, invoiceNumber: invoice.invoiceNumber };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Erro ao gerar fatura consolidada.";
    console.error("Erro na transação de fatura:", message);
    return { success: false, error: message };
  }
}

interface IssueInvoiceItemInput {
  description: string;
  amount: number;
  installmentId?: string;
}

export async function issueImmediateInvoiceAction(data: {
  userId: string;
  description?: string;
  amount?: number;
  installmentId?: string;
  items?: IssueInvoiceItemInput[];
  dueDateOption?: "TODAY" | "24H" | "3D" | "5D" | string | number;
  dueDateDays?: number;
}) {
  await assertAdmin();

  const items: IssueInvoiceItemInput[] =
    data.items && data.items.length > 0
      ? data.items
      : [
        {
          description: data.description || "Fatura Avulsa",
          amount: data.amount || 0,
          installmentId: data.installmentId,
        },
      ];

  const totalAmount = items.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);

  if (!data.userId || totalAmount <= 0) {
    return { success: false, error: "A fatura precisa de itens válidos com valor total maior que zero." };
  }

  const client = await prisma.user.findUnique({
    where: { id: data.userId },
  });

  if (!client) {
    return { success: false, error: "Cliente não localizado." };
  }

  const invoiceNumber = `INV-${Date.now().toString().slice(-6)}`;

  const installmentIds = items
    .map((it) => it.installmentId)
    .filter(Boolean) as string[];

  let dueDate = new Date();
  if (installmentIds.length > 0) {
    const linkedInstallments = await prisma.contractInstallment.findMany({
      where: { id: { in: installmentIds } },
      orderBy: { scheduledDate: "asc" },
    });
    if (linkedInstallments.length > 0) {
      dueDate = new Date(linkedInstallments[0].scheduledDate);
    }
  } else {
    if (data.dueDateOption === "TODAY") {
      dueDate = new Date();
    } else if (data.dueDateOption === "24H" || data.dueDateOption === "1") {
      dueDate = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000);
    } else if (data.dueDateOption === "3D" || data.dueDateOption === "3") {
      dueDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
    } else if (data.dueDateOption === "5D" || data.dueDateOption === "5") {
      dueDate = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000);
    } else {
      const days = typeof data.dueDateOption === "number" ? data.dueDateOption : (data.dueDateDays || 3);
      dueDate = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
    }
  }

  const isOverdue = dueDate <= new Date();
  const initialStatus: InvoiceStatus = isOverdue ? "OVERDUE" : "PENDING";

  // 1. Gera link oficial na InfinitePay
  const checkoutRes = await createInfinitePayCheckoutLink({
    orderNsu: invoiceNumber,
    amountInCents: Math.round(totalAmount * 100),
    items: items.map((it) => ({
      description: it.description.trim(),
      price: Math.round(it.amount * 100),
      quantity: 1,
    })),
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

  // 2. Salva a fatura no Prisma com múltiplos itens
  const invoice = await prisma.invoice.create({
    data: {
      invoiceNumber,
      dueDate,
      totalAmount,
      status: initialStatus,
      gatewayPaymentId: checkoutRes.slug || invoiceNumber,
      gatewayInvoiceUrl: checkoutUrl,
      userId: client.id,
      items: {
        create: items.map((it) => ({
          description: it.description.trim(),
          amount: it.amount,
        })),
      },
    },
    include: { items: true },
  });

  // Vincula as parcelas agendadas aos respectivos invoice items
  for (let idx = 0; idx < items.length; idx++) {
    const it = items[idx];
    if (it.installmentId && invoice.items[idx]) {
      await prisma.contractInstallment.update({
        where: { id: it.installmentId },
        data: {
          status: "BILLED",
          invoiceItemId: invoice.items[idx].id,
        },
      });
    }
  }

  // 3. Dispara e-mail profissional via Resend usando o template estilizado
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const emailHtml = renderInvoiceEmailHtml({
      clientName: client.fullName || "Cliente",
      invoiceNumber,
      totalAmount,
      dueDate: dueDate.toLocaleDateString("pt-BR"),
      items: items.map((it) => ({
        description: it.description.trim(),
        amount: it.amount,
      })),
      paymentUrl: checkoutUrl,
    });

    await resend.emails.send({
      from: "MindSite Financeiro <financeiro@mindsite.com.br>",
      to: client.email,
      subject: `Nova Fatura Disponível: #${invoiceNumber} (R$ ${totalAmount.toFixed(2).replace(".", ",")})`,
      html: emailHtml,
    });
  } catch (emailErr: unknown) {
    const message = emailErr instanceof Error ? emailErr.message : "Erro desconhecido";
    console.error("Falha ao disparar e-mail da fatura imediata:", message);
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

export async function addTicketCommentAction(ticketId: string, message: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Não autenticado." };
  }

  if (!message?.trim()) {
    return { success: false, error: "O comentário não pode ser vazio." };
  }

  const isAdmin = user.app_metadata?.role === "ADMIN" || user.email === "contato@mindsite.com.br";
  const authorName = isAdmin
    ? "Danilo (MindSite)"
    : user.user_metadata?.full_name || user.email || "Cliente";

  try {
    const comment = await prisma.ticketComment.create({
      data: {
        ticketId,
        message: message.trim(),
        authorName,
        isAdmin,
      },
    });

    // Atualiza status do chamado
    await prisma.ticket.update({
      where: { id: ticketId },
      data: {
        updatedAt: new Date(),
        ...(isAdmin ? { status: TicketStatus.IN_PROGRESS } : { status: TicketStatus.OPEN }),
      },
    });

    revalidatePath("/admin/dashboard");
    revalidatePath("/portal/dashboard");
    return { success: true, comment };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Erro ao comentar chamado";
    return { success: false, error: message };
  }
}

export async function settleInstallmentManuallyAction(installmentId: string) {
  return settleAction(installmentId);
}

export async function markInstallmentPaidAction(installmentId: string) {
  return settleAction(installmentId);
}

// Obter Signed URL temporária de anexo
export async function getAttachmentSignedUrlAction(attachmentIdOrUrl: string) {
  const { getAttachmentSignedUrlAction: getUrl } = await import("@/app/actions/portal");
  return getUrl(attachmentIdOrUrl);
}

