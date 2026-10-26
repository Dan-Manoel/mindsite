"use server";

import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { TicketCategory } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { createInfinitePayCharge, createInfinitePayCheckoutLink } from "@/lib/payment/infinitepay";

export async function getClientDashboardData() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Não autenticado.");
  }

  // 1. Busca dados do usuário, projetos vinculados e contratos
  let client = await prisma.user.findUnique({
    where: { id: user.id },
    include: {
      projects: {
        where: { isActive: true },
        include: {
          contracts: {
            where: { status: "ACTIVE" },
            include: {
              installments: {
                orderBy: { scheduledDate: "asc" },
              },
            },
          },
        },
      },
      tickets: {
        orderBy: { createdAt: "desc" },
        include: {
          attachments: true,
          project: true,
        },
      },
      invoices: {
        orderBy: { dueDate: "desc" },
        include: {
          items: true,
        },
      },
    },
  });

  // Garante inicialização no banco caso seja primeiro login
  if (!client) {
    await prisma.user.create({
      data: {
        id: user.id,
        email: user.email!,
        fullName: user.user_metadata?.full_name || user.email?.split("@")[0] || "Cliente",
        role: "CLIENT",
      },
    });

    client = await prisma.user.findUnique({
      where: { id: user.id },
      include: {
        projects: {
          where: { isActive: true },
          include: {
            contracts: {
              where: { status: "ACTIVE" },
              include: {
                installments: {
                  orderBy: { scheduledDate: "asc" },
                },
              },
            },
          },
        },
        tickets: {
          orderBy: { createdAt: "desc" },
          include: {
            attachments: true,
            project: true,
          },
        },
        invoices: {
          orderBy: { dueDate: "desc" },
          include: {
            items: true,
          },
        },
      },
    });
  }

  if (!client) {
    throw new Error("Cliente não localizado no banco de dados.");
  }

  // Se o cliente ainda não possuir projeto, cria um inicial para permitir abertura imediata de chamados
  if (client.projects.length === 0) {
    const newProject = await prisma.project.create({
      data: {
        name: client.companyName || `${client.fullName || "Cliente"} - Website`,
        slug: `projeto-${client.id.substring(0, 8)}`,
        domain: "meudominio.com.br",
        stagingUrl: "https://staging.mindsite.com.br",
        description: "Projeto principal de presença digital e sustentação contínua.",
        userId: client.id,
        contracts: {
          create: {
            title: "Sustentação Development",
            contractType: "SUSTAINABILITY",
            status: "ACTIVE",
            totalAmount: 300.0,
            paidAmount: 0.0,
            userId: client.id,
          },
        },
      },
      include: {
        contracts: {
          include: { installments: true },
        },
      },
    });

    // Cria fatura de demonstração pendente
    const pendingInv = await prisma.invoice.create({
      data: {
        invoiceNumber: `INV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
        dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        totalAmount: 300.0,
        status: "PENDING",
        pixCopyPaste: "00020126580014br.gov.bcb.pix0136danilo@mindsite.com.br5204000053039865406300.005802BR5916Mindsite Agencia6009Sao Paulo62070503***6304E8A2",
        userId: client.id,
        items: {
          create: [
            {
              description: "Sustentação Mensal Development",
              amount: 300.0,
            },
          ],
        },
      },
      include: { items: true },
    });

    client.projects = [newProject as any];
    client.invoices = [pendingInv as any];
  }

  const now = new Date();

  const activeInvoice =
    client.invoices.find((inv) => inv.status === "PENDING" || inv.status === "OVERDUE") ||
    client.invoices[0] ||
    null;

  // 2. Estatísticas de Chamados
  const openTickets = client.tickets.filter((t) => t.status === "OPEN" || t.status === "IN_PROGRESS").length;
  const waitingTickets = client.tickets.filter((t) => t.status === "WAITING_CLIENT").length;
  const resolvedTickets = client.tickets.filter((t) => t.status === "RESOLVED").length;
  const overdueTickets = client.tickets.filter(
    (t) => t.status !== "RESOLVED" && t.status !== "CANCELLED" && new Date(t.slaDueAt) < now
  ).length;

  // 4. Detalhes do Plano de Sustentação & Consumo
  let planName = "Sem Sustentação";
  let monthlyQuota = 0;
  let emailBoxes = "0 caixas";
  let features = "Sem chamados inclusos";
  let slaHoursLabel = "Sem SLA";
  let monthlyPrice = 0;

  const sustContract = client.projects
    .flatMap((p) => p.contracts)
    .find((c) => c.contractType === "SUSTAINABILITY" && c.status === "ACTIVE");

  if (sustContract) {
    const val = Number(sustContract.totalAmount);
    monthlyPrice = val;
    if (val === 100) {
      planName = "Essential";
      monthlyQuota = 5;
      emailBoxes = "5 caixas de e-mail";
      features = "5 chamados básicos mensais (SLA 24h)";
      slaHoursLabel = "24h";
    } else if (val === 300) {
      planName = "Development";
      monthlyQuota = 15;
      emailBoxes = "15 caixas de e-mail";
      features = "Chamados básicos (SLA 24h) e intermediários de layout/código (SLA 72h)";
      slaHoursLabel = "24h a 72h";
    } else if (val === 700) {
      planName = "Advanced";
      monthlyQuota = 30;
      emailBoxes = "30+ caixas de e-mail";
      features = "Suporte prioritário a regras de negócio e novas rotas (SLA 7 dias)";
      slaHoursLabel = "7 dias";
    } else {
      planName = "Personalizado";
      monthlyQuota = 10;
      emailBoxes = "Caixas personalizadas";
      features = "Suporte sob demanda conforme escopo";
      slaHoursLabel = "Conforme contrato";
    }
  }

  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const ticketsConsumedThisMonth = client.tickets.filter(
    (t) => new Date(t.createdAt) >= startOfMonth
  ).length;

  let totalPendingSetupBalance = 0;
  client.projects.forEach((p) => {
    p.contracts.forEach((c) => {
      if (c.contractType === "PROJECT_DEV") {
        c.installments.forEach((inst) => {
          if (inst.status !== "PAID" && inst.status !== "CANCELLED") {
            totalPendingSetupBalance += Number(inst.amount);
          }
        });
      }
    });
  });

  return {
    client: {
      id: client.id,
      fullName: client.fullName,
      email: client.email,
      companyName: client.companyName,
      activeProject: client.projects[0]
        ? {
            id: client.projects[0].id,
            name: client.projects[0].name,
            domain: client.projects[0].domain,
            description: client.projects[0].description,
          }
        : null,
    },
    sustainability: {
      planName,
      monthlyPrice,
      monthlyQuota,
      emailBoxes,
      features,
      slaHoursLabel,
      ticketsConsumedThisMonth,
    },
    totalPendingSetupBalance,
    stats: {
      openTickets,
      waitingTickets,
      resolvedTickets,
      overdueTickets,
    },
    tickets: client.tickets.map((t) => ({
      id: t.id,
      ticketNumber: t.ticketNumber,
      title: t.title,
      description: t.description,
      category: t.category,
      status: t.status,
      slaHours: t.slaHours,
      slaDueAt: t.slaDueAt.toISOString(),
      createdAt: t.createdAt.toISOString(),
      isOverdue: t.status !== "RESOLVED" && t.status !== "CANCELLED" && new Date(t.slaDueAt) < now,
      projectName: t.project.name,
      attachments: t.attachments.map((a) => ({
        id: a.id,
        fileName: a.fileName,
        fileUrl: a.fileUrl,
      })),
    })),
    activeInvoice: activeInvoice
      ? {
          id: activeInvoice.id,
          invoiceNumber: activeInvoice.invoiceNumber,
          dueDate: activeInvoice.dueDate.toISOString(),
          totalAmount: Number(activeInvoice.totalAmount),
          pixCopyPaste: activeInvoice.pixCopyPaste,
          pixQrCode: activeInvoice.pixQrCode,
          gatewayInvoiceUrl: activeInvoice.gatewayInvoiceUrl,
          items: activeInvoice.items.map((i) => ({
            id: i.id,
            description: i.description,
            amount: Number(i.amount),
          })),
        }
      : null,
    upcomingInstallments: client.projects.flatMap((p) =>
      p.contracts.flatMap((c) =>
        c.installments
          .filter((inst) => inst.status === "SCHEDULED")
          .map((inst) => ({
            id: inst.id,
            installmentNumber: inst.installmentNumber,
            amount: Number(inst.amount),
            scheduledDate: inst.scheduledDate.toISOString(),
            description: inst.description || "Parcela",
            projectName: p.name,
            status: inst.status,
          }))
      )
    ),
    invoicesHistory: client.invoices.map((inv) => ({
      id: inv.id,
      invoiceNumber: inv.invoiceNumber,
      dueDate: inv.dueDate.toISOString(),
      totalAmount: Number(inv.totalAmount),
      status: inv.status,
      paidAt: inv.paidAt ? inv.paidAt.toISOString() : null,
      receiptUrl: inv.receiptUrl || null,
      gatewayInvoiceUrl: inv.gatewayInvoiceUrl || null,
    })),
  };
}

export async function addTicketCommentAction(ticketId: string, comment: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Não autenticado." };
  }

  if (!comment || !comment.trim()) {
    return { success: false, error: "O comentário não pode ser vazio." };
  }

  const ticket = await prisma.ticket.findUnique({
    where: { id: ticketId },
    include: { user: true },
  });

  if (!ticket) {
    return { success: false, error: "Chamado não encontrado." };
  }

  const authorName = user.user_metadata?.full_name || user.email?.split("@")[0] || "Cliente";
  const timestamp = new Date().toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const appendedDescription = `${ticket.description.trim()}\n\n---\n💬 [${timestamp}] ${authorName}:\n${comment.trim()}`;

  await prisma.ticket.update({
    where: { id: ticketId },
    data: {
      description: appendedDescription,
      updatedAt: new Date(),
      status: ticket.status === "WAITING_CLIENT" ? "IN_PROGRESS" : ticket.status,
    },
  });

  revalidatePath("/portal/dashboard");
  revalidatePath("/admin/dashboard");
  return { success: true };
}

export async function createTicketAction(formData: {
  title: string;
  description: string;
  category: TicketCategory;
  projectId?: string;
  attachments?: Array<{ fileName: string; fileUrl: string; fileSize?: number; mimeType?: string }>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Usuário não autenticado." };
  }

  try {
    let projectId = formData.projectId;
    if (!projectId) {
      const activeProject = await prisma.project.findFirst({
        where: { userId: user.id, isActive: true },
      });
      if (!activeProject) {
        return { success: false, error: "Nenhum projeto ativo associado ao cliente." };
      }
      projectId = activeProject.id;
    }

    // SLAs: BASIC = 24h, INTERMEDIATE = 72h, ADVANCED = 168h (7 dias)
    let slaHours = 24;
    if (formData.category === "INTERMEDIATE") slaHours = 72;
    if (formData.category === "ADVANCED") slaHours = 168;

    const slaDueAt = new Date(Date.now() + slaHours * 60 * 60 * 1000);

    const ticket = await prisma.ticket.create({
      data: {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        slaHours: slaHours,
        slaDueAt: slaDueAt,
        userId: user.id,
        projectId: projectId,
        attachments: {
          create:
            formData.attachments?.map((att) => ({
              fileName: att.fileName,
              fileUrl: att.fileUrl,
              fileSize: att.fileSize,
              mimeType: att.mimeType,
            })) || [],
        },
      },
    });

    revalidatePath("/portal/dashboard");
    revalidatePath("/admin/dashboard");
    return { success: true, ticketId: ticket.id };
  } catch (error: any) {
    return { success: false, error: error.message || "Erro ao registrar chamado." };
  }
}

export async function generateConsolidatedPaymentAction(payload: {
  includeCurrentInvoice: boolean;
  selectedInstallmentIds: string[];
  paymentMethod: "PIX" | "BOLETO";
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Não autenticado." };
  }

  const client = await prisma.user.findUnique({
    where: { id: user.id },
    include: {
      invoices: { where: { status: "PENDING" } },
      projects: {
        include: {
          contracts: {
            include: {
              installments: {
                where: { id: { in: payload.selectedInstallmentIds }, status: "SCHEDULED" },
              },
            },
          },
        },
      },
    },
  });

  if (!client) {
    return { success: false, error: "Cliente não encontrado." };
  }

  let totalAmount = 0;
  const itemsToBill: Array<{ description: string; amount: number; installmentId?: string }> = [];

  // 1. Inclui fatura corrente se solicitado
  if (payload.includeCurrentInvoice && client.invoices[0]) {
    totalAmount += Number(client.invoices[0].totalAmount);
    itemsToBill.push({
      description: `Fatura Vigente (${client.invoices[0].invoiceNumber})`,
      amount: Number(client.invoices[0].totalAmount),
    });
  }

  // 2. Soma as parcelas futuras adiantadas selecionadas pelo cliente
  client.projects.forEach((proj) => {
    proj.contracts.forEach((cont) => {
      cont.installments.forEach((inst) => {
        const val = Number(inst.amount);
        totalAmount += val;
        itemsToBill.push({
          description: `Adiantamento: ${inst.description || "Parcela"} (${proj.name})`,
          amount: val,
          installmentId: inst.id,
        });
      });
    });
  });

  if (totalAmount <= 0) {
    return { success: false, error: "Nenhum valor selecionado para cobrança." };
  }

  const invoiceNumber = `INV-${Date.now().toString().slice(-6)}`;

  // 3. Comunica com a InfinitePay para gerar o link oficial de checkout
  const checkoutRes = await createInfinitePayCheckoutLink({
    orderNsu: invoiceNumber,
    amountInCents: Math.round(totalAmount * 100),
    items: itemsToBill.map((item) => ({
      description: item.description,
      price: Math.round(item.amount * 100),
      quantity: 1,
    })),
    customer: {
      name: client.fullName || "Cliente",
      email: client.email,
      phone: client.phone || undefined,
    },
  });

  const checkoutUrl = checkoutRes.success && checkoutRes.url ? checkoutRes.url : `https://pay.infinitepay.io/checkout/${invoiceNumber}`;

  // 4. Salva a fatura no Prisma com status PENDING
  const createdInvoice = await prisma.invoice.create({
    data: {
      invoiceNumber,
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 dias de vencimento
      totalAmount,
      status: "PENDING",
      paymentMethod: payload.paymentMethod,
      gatewayPaymentId: checkoutRes.slug || invoiceNumber,
      gatewayInvoiceUrl: checkoutUrl,
      userId: client.id,
      items: {
        create: itemsToBill.map((item) => ({
          description: item.description,
          amount: item.amount,
        })),
      },
    },
    include: {
      items: true,
    },
  });

  // Vincula as parcelas à nova fatura e ao item correspondente
  for (let i = 0; i < itemsToBill.length; i++) {
    const item = itemsToBill[i];
    if (item.installmentId && createdInvoice.items[i]) {
      await prisma.contractInstallment.update({
        where: { id: item.installmentId },
        data: {
          status: "BILLED",
          invoiceItemId: createdInvoice.items[i].id,
        },
      });
    }
  }

  revalidatePath("/portal/dashboard");
  return {
    success: true,
    invoiceId: createdInvoice.id,
    checkoutUrl: checkoutUrl,
    orderNsu: invoiceNumber,
  };
}
