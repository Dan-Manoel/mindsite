"use server";

import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { TicketCategory, InvoiceStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { createInfinitePayCheckoutLink } from "@/lib/payment/infinitepay";
import { createAdminClient, supabaseAdmin } from "@/lib/supabase/admin";
import { logAudit } from "@/lib/audit";
import { getAutentiqueDocument } from "@/lib/integrations/autentique";

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
          comments: {
            orderBy: { createdAt: "asc" },
          },
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
            comments: {
              orderBy: { createdAt: "asc" },
            },
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
        pixCopyPaste: "00020126580014br.gov.bcb.pix0136contato@mindsite.com.br5204000053039865406300.005802BR5916Mindsite Agencia6009Sao Paulo62070503***6304E8A2",
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

    client.projects = [newProject as unknown as (typeof client.projects)[number]];
    client.invoices = [pendingInv as unknown as (typeof client.invoices)[number]];
  }

  const now = new Date();

  // Consolidação de todas as parcelas dos contratos ativos
  const allInstallments = client.projects.flatMap((p) =>
    p.contracts.flatMap((c) =>
      c.installments.map((inst) => ({
        id: inst.id,
        installmentNumber: inst.installmentNumber,
        amount: Number(inst.amount),
        scheduledDate: inst.scheduledDate,
        status: inst.status,
        description: inst.description || "Parcela",
        projectName: p.name,
        invoiceItemId: inst.invoiceItemId,
      }))
    )
  );

  // 1. Faturas em atraso (status === 'OVERDUE' ou PENDING com dueDate < now)
  const overdueInvoices = client.invoices.filter(
    (inv) => inv.status === "OVERDUE" || (inv.status === "PENDING" && new Date(inv.dueDate) < now)
  );

  // 2. Parcelas agendadas com vencimento expirado (mesmo que sem fatura gerada)
  const overdueScheduledInstallments = allInstallments.filter(
    (inst) => inst.status === "SCHEDULED" && new Date(inst.scheduledDate) < now
  );

  const isOverdue = overdueInvoices.length > 0 || overdueScheduledInstallments.length > 0;

  const overdueInvoicesAmount = overdueInvoices.reduce((sum, inv) => sum + Number(inv.totalAmount), 0);
  const overdueInstallmentsAmount = overdueScheduledInstallments.reduce((sum, inst) => sum + inst.amount, 0);
  const totalOverdueAmount = overdueInvoicesAmount + overdueInstallmentsAmount;

  // Faturas pendentes vigentes (vencimento futuro)
  const pendingInvoices = client.invoices.filter(
    (inv) => inv.status === "PENDING" && new Date(inv.dueDate) >= now
  );

  // Fatura ativa em aberto: a em atraso mais antiga, ou a pendente futura mais próxima.
  // Se não houver fatura aberta, activeInvoice será null (NUNCA fallback para faturas pagas)
  const openInvoice = overdueInvoices[0] || pendingInvoices[0] || null;

  // Verificação estrita de liquidação de faturas e parcelas até a data corrente
  const hasUnsettledPastOrCurrent =
    client.invoices.some(
      (inv) => (inv.status === "PENDING" || inv.status === "OVERDUE") && new Date(inv.dueDate) <= now
    ) ||
    allInstallments.some(
      (inst) => (inst.status === "SCHEDULED" || inst.status === "BILLED") && new Date(inst.scheduledDate) <= now
    );

  const hasAnyTransactions = client.invoices.length > 0 || allInstallments.length > 0;
  const allPaid = hasAnyTransactions && !hasUnsettledPastOrCurrent && !isOverdue;

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
      features = "5 e-mails, 5 chamados básicos (SLA 24h)";
      slaHoursLabel = "24h";
    } else if (val === 300) {
      planName = "Development";
      monthlyQuota = 12;
      emailBoxes = "15 caixas de e-mail";
      features = "15 e-mails, 10 chamados básicos e 2 intermediários (SLA 24h a 72h)";
      slaHoursLabel = "24h a 72h";
    } else if (val === 700) {
      planName = "Advanced";
      monthlyQuota = 30;
      emailBoxes = "30+ caixas de e-mail";
      features = "30+ e-mails, 25 chamados básicos, 5 intermediários e 1 landing page inclusa (SLA 7 dias)";
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

  const docId =
    client.autentiqueDocId ||
    client.projects.flatMap((p) => p.contracts).find((c) => c.autentiqueDocId)?.autentiqueDocId ||
    null;

  let autentiqueContract: {
    docId: string | null;
    name: string;
    signed: boolean;
    signUrl: string | null;
    downloadUrl: string | null;
  } | null = null;

  if (docId) {
    const autoDoc = await getAutentiqueDocument(docId);
    autentiqueContract = {
      docId,
      name: autoDoc?.name || "Termo de Sustentação & Prestação de Serviços Digitais",
      signed: autoDoc?.signed ?? false,
      signUrl: autoDoc?.signUrl || `https://autentique.com.br/documentos/${docId}`,
      downloadUrl: autoDoc?.downloadUrl || `https://autentique.com.br/documentos/${docId}`,
    };
  }

  return {
    client: {
      id: client.id,
      fullName: client.fullName,
      email: client.email,
      secondaryEmail: client.secondaryEmail,
      phone: client.phone,
      document: client.document,
      address: client.address,
      avatarUrl: client.avatarUrl,
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
    autentiqueContract,
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
      slaPausedAt: t.slaPausedAt ? t.slaPausedAt.toISOString() : null,
      reopenReason: t.reopenReason || null,
      createdAt: t.createdAt.toISOString(),
      isOverdue: t.status !== "RESOLVED" && t.status !== "CANCELLED" && new Date(t.slaDueAt) < now,
      projectName: t.project.name,
      attachments: t.attachments.map((a) => ({
        id: a.id,
        fileName: a.fileName,
        fileUrl: a.fileUrl,
      })),
      comments: (t.comments || []).map((c) => ({
        id: c.id,
        message: c.message,
        authorName: c.authorName,
        isAdmin: c.isAdmin,
        attachments: c.attachments || [],
        createdAt: c.createdAt.toISOString(),
      })),
    })),
    activeInvoice: openInvoice
      ? {
          id: openInvoice.id,
          invoiceNumber: openInvoice.invoiceNumber,
          dueDate: openInvoice.dueDate.toISOString(),
          totalAmount: Number(openInvoice.totalAmount),
          pixCopyPaste: openInvoice.pixCopyPaste,
          pixQrCode: openInvoice.pixQrCode,
          gatewayInvoiceUrl: openInvoice.gatewayInvoiceUrl,
          status:
            openInvoice.status === "OVERDUE" ||
            (openInvoice.status === "PENDING" && new Date(openInvoice.dueDate) < now)
              ? "OVERDUE"
              : openInvoice.status,
          items: openInvoice.items.map((i) => ({
            id: i.id,
            description: i.description,
            amount: Number(i.amount),
          })),
        }
      : null,
    billingSummary: {
      isOverdue,
      totalOverdueAmount,
      allPaid,
      overdueInvoicesCount: overdueInvoices.length,
      overdueInstallmentsCount: overdueScheduledInstallments.length,
      hasOverdueInstallmentsWithoutInvoice: overdueScheduledInstallments.length > 0,
    },
    upcomingInstallments: allInstallments
      .filter((inst) => inst.status === "SCHEDULED" && new Date(inst.scheduledDate) >= now)
      .sort((a, b) => new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime())
      .map((inst) => ({
        id: inst.id,
        installmentNumber: inst.installmentNumber,
        amount: inst.amount,
        scheduledDate: inst.scheduledDate.toISOString(),
        description: inst.description,
        projectName: inst.projectName,
        status: inst.status,
      })),
    invoicesHistory: client.invoices.map((inv) => {
      const isInvOverdue =
        inv.status === "OVERDUE" || (inv.status === "PENDING" && new Date(inv.dueDate) < now);
      return {
        id: inv.id,
        invoiceNumber: inv.invoiceNumber,
        dueDate: inv.dueDate.toISOString(),
        totalAmount: Number(inv.totalAmount),
        status: isInvOverdue ? "OVERDUE" : inv.status,
        paidAt: inv.paidAt ? inv.paidAt.toISOString() : null,
        receiptUrl: inv.receiptUrl || null,
        gatewayInvoiceUrl: inv.gatewayInvoiceUrl || null,
      };
    }),
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

  const isAdmin = user.app_metadata?.role === "ADMIN" || user.email === "contato@mindsite.com.br";
  const authorName = isAdmin
    ? "Danilo (MindSite)"
    : user.user_metadata?.full_name || user.email?.split("@")[0] || "Cliente";

  await prisma.ticketComment.create({
    data: {
      ticketId,
      message: comment.trim(),
      authorName,
      isAdmin,
    },
  });

  await prisma.ticket.update({
    where: { id: ticketId },
    data: {
      updatedAt: new Date(),
      status: ticket.status === "WAITING_CLIENT" ? "OPEN" : ticket.status,
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
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Erro ao registrar chamado.";
    return { success: false, error: message };
  }
}

// 1. Geração de Signed URL segura com validade temporária (60 minutos)
export async function getAttachmentSignedUrlAction(attachmentIdOrUrl: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Usuário não autenticado." };
  }

  try {
    let filePath = attachmentIdOrUrl;

    // Localiza registro do anexo no banco caso seja passado o ID ou a URL
    const attachment = await prisma.ticketAttachment.findFirst({
      where: {
        OR: [{ id: attachmentIdOrUrl }, { fileUrl: attachmentIdOrUrl }],
      },
      include: {
        ticket: true,
      },
    });

    if (attachment) {
      const isAdmin =
        user.app_metadata?.role === "ADMIN" ||
        user.user_metadata?.role === "ADMIN" ||
        user.email === "contato@mindsite.com.br";
      if (!isAdmin && attachment.ticket.userId !== user.id) {
        return { success: false, error: "Acesso não autorizado a este anexo." };
      }
      filePath = attachment.fileUrl;
    }

    // Normaliza o caminho caso venha com URL pública estática antiga do Supabase
    if (filePath.includes("ticket-attachments/")) {
      filePath = filePath.split("ticket-attachments/")[1];
    } else if (filePath.startsWith("http://") || filePath.startsWith("https://")) {
      const urlObj = new URL(filePath);
      const segments = urlObj.pathname.split("/").filter(Boolean);
      const bucketIdx = segments.indexOf("ticket-attachments");
      if (bucketIdx !== -1 && bucketIdx < segments.length - 1) {
        filePath = segments.slice(bucketIdx + 1).join("/");
      } else {
        filePath = segments.slice(-2).join("/");
      }
    }

    if (filePath.includes("?")) {
      filePath = filePath.split("?")[0];
    }

    // Garante a existência do bucket privado no Supabase
    try {
      await supabaseAdmin.storage.createBucket("ticket-attachments", { public: false });
    } catch {
      // Ignora caso bucket já exista
    }

    // Gera Signed URL com validade de 60 minutos (3600 segundos)
    const { data: signedData, error: signedError } = await supabaseAdmin.storage
      .from("ticket-attachments")
      .createSignedUrl(filePath, 3600);

    if (signedError || !signedData?.signedUrl) {
      console.error("Erro ao gerar Signed URL do anexo:", signedError);
      return {
        success: false,
        error: signedError?.message || "Arquivo não encontrado no armazenamento seguro.",
      };
    }

    return { success: true, signedUrl: signedData.signedUrl };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Erro interno ao processar anexo.";
    console.error("Exceção ao gerar Signed URL:", message);
    return { success: false, error: message };
  }
}

// 2. Upload de anexo sob demanda (apenas ao Salvar o chamado)
export async function uploadTicketAttachmentAction(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Usuário não autenticado." };
  }

  const file = formData.get("file") as File;
  if (!file) {
    return { success: false, error: "Nenhum arquivo enviado." };
  }

  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileExt = file.name.split(".").pop() || "bin";
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `${user.id}/${fileName}`;

    try {
      await supabaseAdmin.storage.createBucket("ticket-attachments", { public: false });
    } catch {
      // Ignora caso bucket já exista
    }

    const { error: uploadError } = await supabaseAdmin.storage
      .from("ticket-attachments")
      .upload(filePath, buffer, {
        contentType: file.type || "application/octet-stream",
        upsert: true,
      });

    if (uploadError) {
      console.error("Erro no upload do anexo:", uploadError);
      return { success: false, error: uploadError.message };
    }

    return {
      success: true,
      fileName: file.name,
      fileUrl: filePath,
      fileSize: file.size,
      mimeType: file.type,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Erro desconhecido no upload do anexo.";
    return { success: false, error: message };
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

  const selectedInstallmentsList: Array<{ id: string; amount: number; scheduledDate: Date }> = [];

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
        selectedInstallmentsList.push({
          id: inst.id,
          amount: val,
          scheduledDate: inst.scheduledDate,
        });
      });
    });
  });

  if (totalAmount <= 0) {
    return { success: false, error: "Nenhum valor selecionado para cobrança." };
  }

  const invoiceNumber = `INV-${Date.now().toString().slice(-6)}`;

  // Herança Obrigatória de Vencimento: A Invoice gerada para uma parcela de contrato
  // NUNCA deve inventar uma data de vencimento aleatória (ex: +3 dias).
  // Ela DEVE herdar exatamente a data acordada: dueDate: installment.scheduledDate
  let dueDate = new Date();
  if (selectedInstallmentsList.length > 0) {
    selectedInstallmentsList.sort((a, b) => a.scheduledDate.getTime() - b.scheduledDate.getTime());
    dueDate = selectedInstallmentsList[0].scheduledDate;
  } else if (payload.includeCurrentInvoice && client.invoices[0]) {
    dueDate = client.invoices[0].dueDate;
  }

  const isOverdue = dueDate <= new Date();
  const initialStatus: InvoiceStatus = isOverdue ? "OVERDUE" : "PENDING";

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

  // 4. Salva a fatura no Prisma com status calculado (OVERDUE se vencimento <= hoje, senão PENDING)
  const createdInvoice = await prisma.invoice.create({
    data: {
      invoiceNumber,
      dueDate,
      totalAmount,
      status: initialStatus,
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

  // Vincula as parcelas à nova fatura e ao item correspondente com status BILLED
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
  revalidatePath("/admin/dashboard");
  revalidatePath("/admin/clients");
  return {
    success: true,
    invoiceId: createdInvoice.id,
    checkoutUrl: checkoutUrl,
    orderNsu: invoiceNumber,
  };
}

export async function updateClientProfileAction(data: {
  fullName?: string;
  phone?: string;
  address?: string;
  secondaryEmail?: string;
  avatarUrl?: string;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Não autenticado." };
  }

  try {
    const updated = await prisma.user.update({
      where: { id: user.id },
      data: {
        ...(data.fullName !== undefined ? { fullName: data.fullName } : {}),
        ...(data.phone !== undefined ? { phone: data.phone } : {}),
        ...(data.address !== undefined ? { address: data.address } : {}),
        ...(data.secondaryEmail !== undefined ? { secondaryEmail: data.secondaryEmail } : {}),
        ...(data.avatarUrl !== undefined ? { avatarUrl: data.avatarUrl } : {}),
      },
    });

    // Auditoria LGPD
    await logAudit(user.id, "PROFILE_EDIT", {
      fields: Object.keys(data),
      timestamp: new Date().toISOString(),
    });

    revalidatePath("/portal/dashboard");
    revalidatePath("/portal/perfil");
    return { success: true, user: updated };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Erro ao salvar perfil.";
    console.error("Erro ao atualizar perfil:", message);
    return { success: false, error: message };
  }
}

export async function completeFirstLoginAction(options?: { passwordChanged?: boolean }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Não autenticado." };
  }

  try {
    const adminClient = createAdminClient();
    await adminClient.auth.admin.updateUserById(user.id, {
      user_metadata: {
        ...user.user_metadata,
        first_login: false,
      },
    });

    if (options?.passwordChanged) {
      await logAudit(user.id, "PASSWORD_CHANGE", {
        reason: "FIRST_LOGIN",
        timestamp: new Date().toISOString(),
      });
    }

    revalidatePath("/portal/dashboard");
    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Erro ao concluir primeiro login.";
    console.error("Erro ao atualizar first_login:", message);
    return { success: false, error: message };
  }
}

export async function logPasswordChangeAuditAction() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { success: false };

  await logAudit(user.id, "PASSWORD_CHANGE", {
    reason: "PROFILE_CHANGE",
    timestamp: new Date().toISOString(),
  });

  return { success: true };
}

export async function getClientProfileData() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Não autenticado.");
  }

  const client = await prisma.user.findUnique({
    where: { id: user.id },
  });

  if (!client) {
    throw new Error("Cliente não encontrado.");
  }

  return {
    id: client.id,
    fullName: client.fullName || "",
    email: client.email,
    secondaryEmail: client.secondaryEmail || "",
    phone: client.phone || "",
    address: client.address || "",
    document: client.document || "",
    avatarUrl: client.avatarUrl || "",
    companyName: client.companyName || "",
  };
}
