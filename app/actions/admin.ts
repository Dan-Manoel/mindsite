"use server";

import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Resend } from "resend";
import { createInfinitePayCheckoutLink } from "@/lib/payment/infinitepay";
import { renderInvoiceEmailHtml } from "@/lib/mail/invoiceTemplate";
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
          let pName = "Personalizado";
          if (val === 100) {
            sustainabilityPlanLabel = "Essential (R$ 100/mês)";
            pName = "Essential";
          } else if (val === 300) {
            sustainabilityPlanLabel = "Development (R$ 300/mês)";
            pName = "Development";
          } else if (val === 700) {
            sustainabilityPlanLabel = "Advanced (R$ 700/mês)";
            pName = "Advanced";
          } else {
            sustainabilityPlanLabel = `Custom (R$ ${val}/mês)`;
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
      companyName: client.companyName || client.fullName || "Não informado",
      projectName: client.projects[0]?.name || "Nenhum projeto",
      sustainabilityPlan: sustainabilityPlanLabel,
      sustainabilityDetails: sustainabilityContract,
      pendingInstallments,
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
      comments: (t.comments || []).map((c) => ({
        id: c.id,
        message: c.message,
        authorName: c.authorName,
        isAdmin: c.isAdmin,
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

// Atualização de status de chamado (OPEN -> IN_PROGRESS -> RESOLVED)
export async function updateTicketStatusAction(
  ticketId: string,
  newStatus: TicketStatus
) {
  await assertAdmin();

  const dataToUpdate: { status: TicketStatus; resolvedAt?: Date | null } = { status: newStatus };
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
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Erro ao liquidar despesa.";
    return { success: false, error: message };
  }
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
