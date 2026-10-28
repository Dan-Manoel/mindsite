import { resend } from "@/lib/resend";

export type TicketNotificationType = "NOVA_MENSAGEM" | "AGUARDANDO_CLIENTE";

export interface TicketNotificationEmailProps {
  clientName: string;
  ticketNumber: number;
  ticketTitle: string;
  messageSnippet: string;
  actionUrl?: string;
  type: TicketNotificationType;
}

export function renderTicketNotificationEmailHtml(params: TicketNotificationEmailProps): string {
  const portalUrl = params.actionUrl || "https://mindsite.com.br/portal/chamados";
  const isAwaiting = params.type === "AGUARDANDO_CLIENTE";

  const badgeText = isAwaiting ? "HOMOLOGAÇÃO" : "NOVA RESPOSTA TÉCNICA";
  const badgeColor = isAwaiting ? "#f59e0b" : "#819ffe";
  const badgeBg = isAwaiting ? "rgba(245, 158, 11, 0.12)" : "rgba(129, 159, 254, 0.12)";
  const badgeBorder = isAwaiting ? "rgba(245, 158, 11, 0.3)" : "rgba(129, 159, 254, 0.3)";

  const titleText = isAwaiting
    ? "Demanda Concluída — Aguardando Validação"
    : "Nova Interação no seu Chamado";

  const introText = isAwaiting
    ? `Olá, <strong>${params.clientName}</strong>. A equipe técnica da MindSite concluiu os ajustes do seu chamado <strong>#${params.ticketNumber}</strong> e disponibilizou para sua homologação.`
    : `Olá, <strong>${params.clientName}</strong>. A equipe técnica da MindSite enviou uma nova resposta na timeline do seu chamado <strong>#${params.ticketNumber}</strong>.`;

  const safeMessage = params.messageSnippet.replace(/\n/g, "<br />");

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${isAwaiting ? "Homologação de Chamado" : "Nova Resposta no Chamado"} — MindSite</title>
  <style>
    @media only screen and (max-width: 480px) {
      .header-table td {
        display: block !important;
        width: 100% !important;
        text-align: center !important;
      }
      .header-badge-cell {
        padding-top: 16px !important;
        text-align: center !important;
      }
      .header-logo-cell {
        text-align: center !important;
      }
      .header-logo-cell img {
        margin: 0 auto !important;
      }
    }
  </style>
</head>
<body style="margin: 0; padding: 40px 16px; background-color: #0a0a0c; font-family: 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; -webkit-font-smoothing: antialiased; color: #eeeae8;">
  <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 620px; margin: 0 auto; background-color: #111114; border: 1px solid #1f1f24; border-radius: 8px; overflow: hidden; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.45);">
    
    <!-- Topo / Header Institucional Dark -->
    <tr>
      <td style="padding: 28px 32px; background-color: #0d0d10; border-bottom: 1px solid #1f1f24;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" class="header-table" style="margin-bottom: 0;">
          <tr>
            <td class="header-logo-cell" align="left" valign="middle">
              <a href="https://mindsite.com.br" target="_blank" style="text-decoration: none; display: inline-block;">
                <img 
                  src="https://mindsite.com.br/img/logo-email.png" 
                  alt="MindSite" 
                  width="72" 
                  height="72" 
                  style="display: block; width: 72px; height: 72px; max-width: 72px; border: 0; outline: none;" 
                />
              </a>
            </td>
            <td class="header-badge-cell" align="right" valign="middle">
              <span style="display: inline-block; font-family: 'JetBrains Mono', monospace, sans-serif; font-size: 11px; font-weight: 700; color: ${badgeColor}; background-color: ${badgeBg}; border: 1px solid ${badgeBorder}; padding: 6px 12px; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.05em; white-space: nowrap;">
                ${badgeText}
              </span>
              <div style="font-family: 'JetBrains Mono', monospace, sans-serif; font-size: 11px; color: #8f9098; margin-top: 6px; letter-spacing: 0.02em;">
                REF #${params.ticketNumber}
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Headline e Apresentação -->
    <tr>
      <td style="padding: 36px 32px 24px 32px;">
        <h1 style="margin: 0 0 14px 0; font-family: 'Manrope', -apple-system, BlinkMacSystemFont, sans-serif; font-size: 22px; line-height: 1.3; font-weight: 800; letter-spacing: -0.02em; color: #f9f7f7;">
          ${titleText}
        </h1>
        <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #a1a1aa;">
          ${introText}
        </p>
      </td>
    </tr>

    <!-- Card de Conteúdo do Chamado -->
    <tr>
      <td style="padding: 0 32px 28px 32px;">
        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="border: 1px solid #1f1f24; border-radius: 6px; overflow: hidden; background-color: #0e0e11; margin-bottom: 24px;">
          <tr>
            <td style="padding: 14px 18px; border-bottom: 1px solid #1f1f24; width: 30%; font-family: 'JetBrains Mono', Consolas, monospace; font-size: 11px; font-weight: 700; text-transform: uppercase; color: #8f9098;">
              Título:
            </td>
            <td style="padding: 14px 18px; border-bottom: 1px solid #1f1f24; font-family: 'Manrope', sans-serif; font-size: 14px; font-weight: 700; color: #f9f7f7;">
              ${params.ticketTitle}
            </td>
          </tr>
          <tr>
            <td colspan="2" style="padding: 18px; background-color: #141418;">
              <span style="display: block; font-family: 'JetBrains Mono', Consolas, monospace; font-size: 11px; font-weight: 700; text-transform: uppercase; color: #8f9098; margin-bottom: 8px;">
                ${isAwaiting ? "Instruções de Resolução:" : "Conteúdo da Mensagem:"}
              </span>
              <div style="font-family: 'Manrope', sans-serif; font-size: 14px; line-height: 1.6; color: #eeeae8; background-color: #0b0b0e; border: 1px solid #1f1f24; border-left: 3px solid #002bba; padding: 14px 16px; border-radius: 4px;">
                ${safeMessage}
              </div>
            </td>
          </tr>
        </table>

        ${isAwaiting
      ? `
        <!-- Box Informativo de Prazo 72h SLA -->
        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: rgba(245, 158, 11, 0.08); border: 1px solid rgba(245, 158, 11, 0.25); border-radius: 6px; margin-bottom: 24px;">
          <tr>
            <td style="padding: 16px 20px;">
              <span style="display: block; font-family: 'JetBrains Mono', monospace; font-size: 11px; font-weight: 700; text-transform: uppercase; color: #f59e0b; margin-bottom: 6px;">
                ⚠️ PRAZO DE VALIDAÇÃO: 72 HORAS
              </span>
              <p style="margin: 0; font-size: 13px; line-height: 1.5; color: #d4d4d8;">
                Por favor, acesse o link abaixo e valide a solução. Caso não haja manifestação ou contestação em até <strong>72 horas</strong>, o chamado será considerado concluído e encerrado automaticamente pelo sistema de SLA.
              </p>
            </td>
          </tr>
        </table>
        `
      : ""
    }

        <!-- CTA Principal -->
        <table width="100%" border="0" cellpadding="0" cellspacing="0">
          <tr>
            <td align="center" style="padding-top: 10px;">
              <a href="${portalUrl}" target="_blank" style="display: inline-block; width: 100%; box-sizing: border-box; text-align: center; padding: 16px 28px; background-color: #002bba; color: #ffffff; text-decoration: none; font-family: 'Manrope', -apple-system, BlinkMacSystemFont, sans-serif; font-size: 15px; font-weight: 700; border-radius: 4px; letter-spacing: -0.01em; box-shadow: 0 4px 14px rgba(0, 43, 186, 0.4);">
                ${isAwaiting ? "Acessar Portal & Homologar Chamado →" : "Visualizar Chamado na Área Logada →"}
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Footer Institucional Dark -->
    <tr>
      <td style="padding: 24px 32px; background-color: #0b0b0e; border-top: 1px solid #1f1f24; text-align: center;">
        <p style="margin: 0 0 8px 0; font-size: 12px; color: #71717a; font-family: 'Manrope', sans-serif;">
          MindSite Soluções Digitais • Suporte Técnico e Sustentação de Aplicações
        </p>
        <p style="margin: 0; font-family: 'JetBrains Mono', Consolas, monospace; font-size: 10px; color: #52525b; text-transform: uppercase; letter-spacing: 0.05em;">
          Mensagem automática transacional • Disparada via Resend API
        </p>
      </td>
    </tr>

  </table>
</body>
</html>`;
}

export async function sendTicketNotificationEmail(params: {
  to: string;
  clientName: string;
  ticketNumber: number;
  ticketTitle: string;
  messageSnippet: string;
  actionUrl?: string;
  type: TicketNotificationType;
  subject?: string;
  attachments?: Array<{ filename: string; content: Buffer }>;
}) {
  if (!process.env.RESEND_API_KEY) {
    console.warn("[MindSite Mail] RESEND_API_KEY não configurada. Notificação não enviada.");
    return { success: false, error: "RESEND_API_KEY não configurada" };
  }

  const subject =
    params.subject ||
    `[Chamado #${params.ticketNumber}] ${params.ticketTitle} — ${params.type === "AGUARDANDO_CLIENTE"
      ? "Resolução Pendente de Aceite"
      : "Nova Resposta da Equipe Técnica"
    }`;

  const html = renderTicketNotificationEmailHtml(params);

  try {
    const { data, error } = await resend.emails.send({
      from: "MindSite <no-reply@mindsite.com.br>",
      to: params.to,
      subject,
      html,
      ...(params.attachments && params.attachments.length > 0 ? { attachments: params.attachments } : {}),
    });

    if (error) {
      console.error("[MindSite Mail] Erro ao disparar notificação via Resend:", error);
      return { success: false, error: error.message };
    }

    return { success: true, messageId: data?.id };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Erro desconhecido ao enviar e-mail";
    console.error("[MindSite Mail] Exceção ao enviar notificação:", msg);
    return { success: false, error: msg };
  }
}
