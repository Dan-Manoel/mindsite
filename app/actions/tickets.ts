"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { reopenTicketSchema, resolveTicketSchema } from "./tickets.schema";
import { sendTicketNotificationEmail } from "@/lib/mail/ticketNotificationTemplate";

const PRIVATE_BUCKET = "ticket-attachments";

async function ensureBucketExists() {
  try {
    await supabaseAdmin.storage.createBucket(PRIVATE_BUCKET, { public: false });
  } catch {
    // Bucket já existe
  }
}

/**
 * Adicionar Resposta / Comentário em um Chamado Técnico com suporte a múltiplos anexos
 */
export async function addTicketReplyAction(formData: FormData) {
  try {
    const ticketId = formData.get("ticketId") as string;
    const message = ((formData.get("message") as string) || "").trim();

    if (!ticketId) {
      return { success: false, error: "ID do chamado não fornecido." };
    }

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { success: false, error: "Usuário não autenticado." };
    }

    // Buscar chamado e dados do usuário/projeto
    const ticket = await prisma.ticket.findUnique({
      where: { id: ticketId },
      include: {
        user: true,
        project: true,
      },
    });

    if (!ticket) {
      return { success: false, error: "Chamado técnico não encontrado." };
    }

    const isAdmin =
      user.app_metadata?.role === "ADMIN" ||
      user.user_metadata?.role === "ADMIN" ||
      user.email === "contato@mindsite.com.br";

    if (!isAdmin && ticket.userId !== user.id) {
      return { success: false, error: "Acesso não autorizado a este chamado." };
    }

    // Processar múltiplos anexos enviados no FormData
    await ensureBucketExists();
    const rawFiles = formData.getAll("files");
    const attachmentPaths: string[] = [];

    for (const item of rawFiles) {
      if (item instanceof File && item.size > 0) {
        const cleanName = item.name.replace(/[^a-zA-Z0-9._-]/g, "_");
        const uniqueName = `${Date.now()}_${Math.random().toString(36).substring(7)}_${cleanName}`;
        const storagePath = `tickets/${ticketId}/replies/${uniqueName}`;

        const buffer = Buffer.from(await item.arrayBuffer());
        const { error: uploadError } = await supabaseAdmin.storage
          .from(PRIVATE_BUCKET)
          .upload(storagePath, buffer, {
            contentType: item.type || "application/octet-stream",
            upsert: true,
          });

        if (uploadError) {
          console.error("Erro no upload do anexo da resposta:", uploadError);
        } else {
          attachmentPaths.push(storagePath);
          // Grava também na tabela de anexos gerais do ticket para consistência
          try {
            await prisma.ticketAttachment.create({
              data: {
                fileName: item.name,
                fileUrl: storagePath,
                fileSize: item.size,
                mimeType: item.type || "application/octet-stream",
                ticketId,
              },
            });
          } catch (attErr) {
            console.warn("Erro ao registrar TicketAttachment:", attErr);
          }
        }
      }
    }

    if (!message && attachmentPaths.length === 0) {
      return { success: false, error: "A mensagem ou pelo menos um anexo deve ser fornecido." };
    }

    const authorName = isAdmin
      ? "MindSite Tech Support"
      : user.user_metadata?.full_name || ticket.user.fullName || "Cliente";

    const comment = await prisma.ticketComment.create({
      data: {
        message: message || (attachmentPaths.length > 0 ? "📎 Anexo(s) enviado(s)." : ""),
        authorName,
        isAdmin,
        attachments: attachmentPaths,
        ticketId,
      },
    });

    // Se o chamado estiver em WAITING_CLIENT e for o cliente respondendo, atualiza status para IN_PROGRESS
    if (!isAdmin && ticket.status === "WAITING_CLIENT") {
      let pausedSeconds = 0;
      if (ticket.slaPausedAt) {
        pausedSeconds = Math.max(0, Math.floor((Date.now() - new Date(ticket.slaPausedAt).getTime()) / 1000));
      }
      const newDueAt = new Date(new Date(ticket.slaDueAt).getTime() + pausedSeconds * 1000);

      await prisma.ticket.update({
        where: { id: ticketId },
        data: {
          status: "IN_PROGRESS",
          slaPausedAt: null,
          slaTotalPausedSeconds: ticket.slaTotalPausedSeconds + pausedSeconds,
          slaDueAt: newDueAt,
        },
      });
    }

    // Se postado por Admin, dispara notificação de NOVA_MENSAGEM para o cliente em background
    if (isAdmin && ticket.user.email) {
      sendTicketNotificationEmail({
        to: ticket.user.email,
        clientName: ticket.user.fullName || ticket.user.companyName || "Cliente",
        ticketNumber: ticket.ticketNumber,
        ticketTitle: ticket.title,
        messageSnippet: message || (attachmentPaths.length > 0 ? "A equipe anexou novos arquivos à sua demanda." : "Nova resposta postada pela equipe técnica."),
        actionUrl: "https://mindsite.com.br/portal/chamados",
        type: "NOVA_MENSAGEM",
      }).catch((mailErr) => {
        console.error("Falha ao despachar notificação de nova mensagem:", mailErr);
      });
    }

    revalidatePath("/portal/chamados");
    revalidatePath("/admin/chamados");
    revalidatePath("/portal/dashboard");
    revalidatePath("/admin/dashboard");

    return { success: true, commentId: comment.id, attachments: attachmentPaths };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Erro desconhecido ao adicionar resposta.";
    console.error("Erro addTicketReplyAction:", message);
    return { success: false, error: message };
  }
}

/**
 * Atualizar Status do Chamado para AGUARDANDO_CLIENTE (Pausa de SLA, upload de evidências e notificação)
 */
export async function setTicketAwaitingClientAction(input: FormData | { ticketId: string; message?: string }) {
  try {
    let ticketId = "";
    let message = "";
    let rawFiles: unknown[] = [];

    if (input instanceof FormData) {
      ticketId = (input.get("ticketId") as string) || "";
      message = ((input.get("message") as string) || "").trim();
      rawFiles = input.getAll("files");
    } else {
      ticketId = input.ticketId || "";
      message = (input.message || "").trim();
    }

    const parsed = resolveTicketSchema.safeParse({ ticketId, message });
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0]?.message || "Dados inválidos." };
    }

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { success: false, error: "Usuário não autenticado." };
    }

    const isAdmin =
      user.app_metadata?.role === "ADMIN" ||
      user.user_metadata?.role === "ADMIN" ||
      user.email === "contato@mindsite.com.br";

    if (!isAdmin) {
      return { success: false, error: "Apenas administradores podem marcar como aguardando validação do cliente." };
    }

    const ticket = await prisma.ticket.findUnique({
      where: { id: ticketId },
      include: { user: true },
    });

    if (!ticket) {
      return { success: false, error: "Chamado não encontrado." };
    }

    // Processamento de anexos e evidências de resolução no Storage
    await ensureBucketExists();
    const attachmentPaths: string[] = [];
    const emailAttachments: Array<{ filename: string; content: Buffer }> = [];

    for (const item of rawFiles) {
      if (item instanceof File && item.size > 0) {
        const cleanName = item.name.replace(/[^a-zA-Z0-9._-]/g, "_");
        const uniqueName = `${Date.now()}_${Math.random().toString(36).substring(7)}_${cleanName}`;
        const storagePath = `tickets/${ticketId}/resolution/${uniqueName}`;

        const buffer = Buffer.from(await item.arrayBuffer());
        const { error: uploadError } = await supabaseAdmin.storage
          .from(PRIVATE_BUCKET)
          .upload(storagePath, buffer, {
            contentType: item.type || "application/octet-stream",
            upsert: true,
          });

        if (!uploadError) {
          attachmentPaths.push(storagePath);
          emailAttachments.push({
            filename: item.name,
            content: buffer,
          });

          try {
            await prisma.ticketAttachment.create({
              data: {
                fileName: item.name,
                fileUrl: storagePath,
                fileSize: item.size,
                mimeType: item.type || "application/octet-stream",
                ticketId,
              },
            });
          } catch {
            // Ignora erro secundário
          }
        } else {
          console.error("Erro no upload do anexo de resolução:", uploadError);
        }
      }
    }

    const now = new Date();

    const updated = await prisma.ticket.update({
      where: { id: ticketId },
      data: {
        status: "WAITING_CLIENT",
        slaPausedAt: now,
        resolvedAt: now,
      },
    });

    // Cria TicketComment com autor "Equipe MindSite" e array de anexos
    await prisma.ticketComment.create({
      data: {
        message: `⏳ Resolução Disponível para Validação:\n\n${message}`,
        authorName: "Equipe MindSite",
        isAdmin: true,
        attachments: attachmentPaths,
        ticketId,
      },
    });

    // Dispara e-mail via Resend para o cliente com attachments no payload
    if (ticket.user.email) {
      await sendTicketNotificationEmail({
        to: ticket.user.email,
        clientName: ticket.user.fullName || ticket.user.companyName || "Cliente",
        ticketNumber: ticket.ticketNumber,
        ticketTitle: ticket.title,
        messageSnippet: message,
        actionUrl: `${process.env.NEXT_PUBLIC_APP_URL || "https://mindsite.com.br"}/portal/dashboard`,
        type: "AGUARDANDO_CLIENTE",
        subject: `[Chamado #${ticket.ticketNumber}] Resolução Disponível para Validação`,
        attachments: emailAttachments.length > 0 ? emailAttachments : undefined,
      }).catch((mailErr) => {
        console.error("Erro ao enviar e-mail de aguardando cliente:", mailErr);
      });
    }

    revalidatePath("/admin/chamados");
    revalidatePath("/portal/dashboard");
    revalidatePath("/admin/dashboard");
    revalidatePath("/portal/chamados");

    return { success: true, ticket: updated };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Erro ao alterar status para aguardando cliente.";
    return { success: false, error: msg };
  }
}

/**
 * Aceitar Resolução pelo Cliente (Encerramento definitivo com feedback opcional)
 */
export async function acceptTicketResolutionAction(
  input: string | { ticketId: string; feedback?: string }
) {
  try {
    const ticketId = typeof input === "string" ? input : input.ticketId;
    const feedback = typeof input === "object" ? input.feedback?.trim() : undefined;

    if (!ticketId) {
      return { success: false, error: "ID do chamado não fornecido." };
    }

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { success: false, error: "Usuário não autenticado." };
    }

    const ticket = await prisma.ticket.findUnique({
      where: { id: ticketId },
      include: { user: true },
    });

    if (!ticket) {
      return { success: false, error: "Chamado não encontrado." };
    }

    const isAdmin =
      user.app_metadata?.role === "ADMIN" ||
      user.user_metadata?.role === "ADMIN" ||
      user.email === "contato@mindsite.com.br";

    if (!isAdmin && ticket.userId !== user.id) {
      return { success: false, error: "Acesso não autorizado a este chamado." };
    }

    const updated = await prisma.ticket.update({
      where: { id: ticketId },
      data: {
        status: "RESOLVED",
        resolvedAt: new Date(),
        slaPausedAt: null,
      },
    });

    const commentMessage = feedback
      ? `✅ Resolução aceita pelo cliente.\n\nAvaliação / Comentário: ${feedback}`
      : "✅ Resolução aceita e homologada pelo cliente. Chamado concluído com êxito.";

    await prisma.ticketComment.create({
      data: {
        message: commentMessage,
        authorName: user.user_metadata?.full_name || ticket.user.fullName || "Cliente",
        isAdmin: false,
        ticketId,
      },
    });

    revalidatePath("/portal/chamados");
    revalidatePath("/admin/chamados");
    revalidatePath("/portal/dashboard");
    revalidatePath("/admin/dashboard");

    return { success: true, ticket: updated };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Erro ao aceitar resolução.";
    return { success: false, error: msg };
  }
}

/**
 * Reabrir Chamado pelo Cliente (Com validação estrita Zod, postergação do SLA e anexos)
 */
export async function reopenTicketAction(formData: FormData) {
  try {
    const ticketId = formData.get("ticketId") as string;
    const reason = ((formData.get("reason") as string) || "").trim();

    const parsed = reopenTicketSchema.safeParse({ ticketId, reason });
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0]?.message || "Dados inválidos." };
    }

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { success: false, error: "Usuário não autenticado." };
    }

    const ticket = await prisma.ticket.findUnique({
      where: { id: ticketId },
      include: { user: true },
    });

    if (!ticket) {
      return { success: false, error: "Chamado não encontrado." };
    }

    const isAdmin =
      user.app_metadata?.role === "ADMIN" ||
      user.user_metadata?.role === "ADMIN" ||
      user.email === "contato@mindsite.com.br";

    if (!isAdmin && ticket.userId !== user.id) {
      return { success: false, error: "Acesso não autorizado a este chamado." };
    }

    // Calcular tempo em que o chamado ficou pausado
    let pausedSeconds = 0;
    if (ticket.slaPausedAt) {
      pausedSeconds = Math.max(0, Math.floor((Date.now() - new Date(ticket.slaPausedAt).getTime()) / 1000));
    }

    const newTotalPaused = ticket.slaTotalPausedSeconds + pausedSeconds;
    const newDueAt = new Date(new Date(ticket.slaDueAt).getTime() + pausedSeconds * 1000);

    // Processar anexos opcionais da reabertura
    await ensureBucketExists();
    const rawFiles = formData.getAll("files");
    const attachmentPaths: string[] = [];

    for (const item of rawFiles) {
      if (item instanceof File && item.size > 0) {
        const cleanName = item.name.replace(/[^a-zA-Z0-9._-]/g, "_");
        const uniqueName = `${Date.now()}_${Math.random().toString(36).substring(7)}_${cleanName}`;
        const storagePath = `tickets/${ticketId}/reopen/${uniqueName}`;

        const buffer = Buffer.from(await item.arrayBuffer());
        const { error: uploadError } = await supabaseAdmin.storage
          .from(PRIVATE_BUCKET)
          .upload(storagePath, buffer, {
            contentType: item.type || "application/octet-stream",
            upsert: true,
          });

        if (!uploadError) {
          attachmentPaths.push(storagePath);
          try {
            await prisma.ticketAttachment.create({
              data: {
                fileName: item.name,
                fileUrl: storagePath,
                fileSize: item.size,
                mimeType: item.type || "application/octet-stream",
                ticketId,
              },
            });
          } catch {
            // Ignora erro secundário
          }
        }
      }
    }

    const updated = await prisma.ticket.update({
      where: { id: ticketId },
      data: {
        status: "IN_PROGRESS",
        slaPausedAt: null,
        slaTotalPausedSeconds: newTotalPaused,
        slaDueAt: newDueAt,
        reopenReason: reason,
        resolvedAt: null,
      },
    });

    // Registrar no histórico/timeline do chamado
    await prisma.ticketComment.create({
      data: {
        message: `🔄 Chamado Reaberto pelo Cliente:\n\n${reason}`,
        authorName: user.user_metadata?.full_name || ticket.user.fullName || "Cliente",
        isAdmin: false,
        attachments: attachmentPaths,
        ticketId,
      },
    });

    revalidatePath("/portal/chamados");
    revalidatePath("/admin/chamados");
    revalidatePath("/portal/dashboard");
    revalidatePath("/admin/dashboard");

    return { success: true, ticket: updated };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Erro ao reabrir chamado.";
    return { success: false, error: msg };
  }
}

/**
 * Obter Signed URL temporária (60 minutos) para visualizar ou baixar um anexo
 */
export async function getAttachmentSignedUrlAction(attachmentIdOrPath: string) {
  try {
    if (!attachmentIdOrPath) {
      return { success: false, error: "Identificador do anexo não fornecido." };
    }

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { success: false, error: "Usuário não autenticado." };
    }

    let filePath = attachmentIdOrPath;

    // Se for UUID, busca o registro do anexo no banco para checar autorização
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(attachmentIdOrPath);
    if (isUuid) {
      const attachment = await prisma.ticketAttachment.findUnique({
        where: { id: attachmentIdOrPath },
        include: { ticket: true },
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
    }

    // Normalização de path
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

    await ensureBucketExists();

    const { data: signedData, error: signedError } = await supabaseAdmin.storage
      .from(PRIVATE_BUCKET)
      .createSignedUrl(filePath, 3600);

    if (signedError || !signedData?.signedUrl) {
      return {
        success: false,
        error: signedError?.message || "Arquivo não encontrado no bucket seguro.",
      };
    }

    return {
      success: true,
      signedUrl: signedData.signedUrl,
      filePath,
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Erro ao gerar link do anexo.";
    return { success: false, error: msg };
  }
}
