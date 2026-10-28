/**
 * Template de e-mail institucional para notificação de novos leads capturados
 * Identidade visual oficial MindSite (Dark Mode, Acentos #002bba, tipografia moderna).
 */

export interface LeadEmailPayload {
  name: string;
  company?: string | null;
  email: string;
  phone?: string | null;
  message: string;
  submittedAt?: Date | string;
}

/**
 * Escapa caracteres HTML para prevenir injeção de código em clientes de e-mail.
 */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (m) => map[m] || m);
}

/**
 * Gera o template HTML responsivo e limpo para notificação interna de novos leads.
 */
export function renderLeadEmailHtml(data: LeadEmailPayload): string {
  const safeName = escapeHtml(data.name.trim());
  const safeCompany = data.company && data.company.trim() ? escapeHtml(data.company.trim()) : "Não informada";
  const safeEmail = escapeHtml(data.email.trim().toLowerCase());
  const safePhone = data.phone && data.phone.trim() ? escapeHtml(data.phone.trim()) : "Não informado";
  const safeMessage = escapeHtml(data.message.trim()).replace(/\n/g, "<br />");

  const formattedDate = new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "America/Sao_Paulo",
  }).format(data.submittedAt ? new Date(data.submittedAt) : new Date());

  const mailtoReply = `mailto:${safeEmail}?subject=${encodeURIComponent(`Re: Contato MindSite - Projeto ${data.company || safeName}`)}`;

  return `<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Novo Lead Capturado - MindSite</title>
    <style>
      body {
        margin: 0;
        padding: 0;
        background-color: #0c0d10;
        font-family: 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        color: #d1d5db;
        -webkit-font-smoothing: antialiased;
      }
      table {
        border-spacing: 0;
      }
      td {
        padding: 0;
      }
      img {
        border: 0;
      }
      .code-font {
        font-family: 'JetBrains Mono', SFMono-Regular, Consolas, Monaco, monospace;
      }
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
      @media only screen and (max-width: 600px) {
        .email-card {
          width: 100% !important;
          border-radius: 0 !important;
        }
        .content-cell {
          padding: 24px 18px !important;
        }
        .field-label {
          display: block !important;
          width: 100% !important;
          padding-bottom: 4px !important;
        }
        .field-value {
          display: block !important;
          width: 100% !important;
          padding-left: 0 !important;
        }
      }
    </style>
  </head>
  <body style="background-color: #0c0d10; margin: 0; padding: 36px 12px; font-family: 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; -webkit-font-smoothing: antialiased;">
    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 620px; margin: 0 auto;">
      <!-- Main Card -->
      <tr>
        <td class="email-card" style="background-color: #14161b; border: 1px solid #282b33; border-radius: 8px; overflow: hidden; box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);">
          <!-- Card Header with Accent Border -->
          <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td style="background-color: #002bba; height: 3px; font-size: 1px; line-height: 1px;">&nbsp;</td>
            </tr>
            <tr>
              <td style="padding: 28px 32px 24px 32px; background: linear-gradient(180deg, #181a22 0%, #14161b 100%); border-bottom: 1px solid #242730;">
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" class="header-table" style="margin-bottom: 24px;">
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
                      <span style="display: inline-block; font-family: 'JetBrains Mono', monospace, sans-serif; font-size: 11px; font-weight: 700; color: #819ffe; background-color: rgba(0, 43, 186, 0.2); border: 1px solid rgba(129, 159, 254, 0.4); padding: 6px 12px; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.05em; white-space: nowrap;">
                        NOVO CONTATO COMERCIAL
                      </span>
                      <div style="font-family: 'JetBrains Mono', monospace, sans-serif; font-size: 11px; color: #6b7280; margin-top: 6px; letter-spacing: 0.02em;">
                        VITRINE WEB
                      </div>
                    </td>
                  </tr>
                </table>
                <h1 style="color: #ffffff; font-size: 24px; font-weight: 700; margin: 0 0 6px 0; letter-spacing: -0.5px; line-height: 1.3;">
                  ${safeName}
                </h1>
                <p style="color: #9ca3af; font-size: 13px; margin: 0; line-height: 1.5;">
                  Recebido em: <span style="color: #d1d5db;">${formattedDate}</span>
                </p>
              </td>
            </tr>

            <!-- Card Body -->
            <tr>
              <td class="content-cell" style="padding: 28px 32px;">
                <h2 class="code-font" style="font-family: 'JetBrains Mono', Consolas, monospace; color: #819ffe; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 1.5px; margin: 0 0 16px 0;">
                  // Detalhes do Lead
                </h2>

                <!-- Fields Table -->
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 24px; border: 1px solid #242730; border-radius: 6px; background-color: #0e1014; overflow: hidden;">
                  <tr>
                    <td class="field-label" width="34%" style="padding: 12px 16px; border-bottom: 1px solid #1f2229; color: #8c93a3; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                      Nome do Lead:
                    </td>
                    <td class="field-value" style="padding: 12px 16px; border-bottom: 1px solid #1f2229; color: #ffffff; font-size: 14px; font-weight: 600;">
                      ${safeName}
                    </td>
                  </tr>
                  <tr>
                    <td class="field-label" style="padding: 12px 16px; border-bottom: 1px solid #1f2229; color: #8c93a3; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                      Empresa:
                    </td>
                    <td class="field-value" style="padding: 12px 16px; border-bottom: 1px solid #1f2229; color: #ffffff; font-size: 14px;">
                      ${safeCompany}
                    </td>
                  </tr>
                  <tr>
                    <td class="field-label" style="padding: 12px 16px; border-bottom: 1px solid #1f2229; color: #8c93a3; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                      E-mail de Contato:
                    </td>
                    <td class="field-value" style="padding: 12px 16px; border-bottom: 1px solid #1f2229; color: #819ffe; font-size: 14px; font-family: 'JetBrains Mono', Consolas, monospace;">
                      <a href="${mailtoReply}" style="color: #819ffe; text-decoration: underline;">${safeEmail}</a>
                    </td>
                  </tr>
                  <tr>
                    <td class="field-label" style="padding: 12px 16px; color: #8c93a3; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                      Telefone:
                    </td>
                    <td class="field-value" style="padding: 12px 16px; color: #ffffff; font-size: 14px; font-family: 'JetBrains Mono', Consolas, monospace;">
                      ${
                        data.phone && data.phone.trim()
                          ? `<a href="tel:${data.phone.replace(/[^0-9+]/g, "")}" style="color: #ffffff; text-decoration: none;">${safePhone}</a>`
                          : safePhone
                      }
                    </td>
                  </tr>
                </table>

                <!-- Message Box -->
                <h2 class="code-font" style="font-family: 'JetBrains Mono', Consolas, monospace; color: #819ffe; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 1.5px; margin: 0 0 10px 0;">
                  // Descrição do Projeto / Mensagem
                </h2>
                <div style="background-color: #0b0c10; border-left: 3px solid #002bba; border-top: 1px solid #242730; border-right: 1px solid #242730; border-bottom: 1px solid #242730; border-radius: 4px; padding: 18px 20px; color: #e5e7eb; font-size: 14px; line-height: 1.6; margin-bottom: 28px; word-break: break-word;">
                  ${safeMessage}
                </div>

                <!-- Call to action button -->
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                    <td align="center" style="padding: 6px 0 12px 0;">
                      <a href="${mailtoReply}" target="_blank" style="display: inline-block; background-color: #002bba; color: #ffffff; padding: 13px 28px; font-family: 'JetBrains Mono', Consolas, monospace; font-size: 13px; font-weight: 700; text-decoration: none; border-radius: 4px; text-transform: uppercase; letter-spacing: 1px; box-shadow: 0 4px 14px rgba(0, 43, 186, 0.4);">
                        Responder ao Lead →
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding: 22px 32px; background-color: #0e1014; border-top: 1px solid #242730; text-align: center;">
                <p style="color: #6b7280; font-size: 11px; margin: 0 0 6px 0; font-family: 'JetBrains Mono', Consolas, monospace; line-height: 1.5;">
                  MindSite Agência Digital — CNPJ 19.725.535/0001-58<br />
                  Este e-mail é gerado automaticamente pelo formulário de contato do site.
                </p>
                <span style="display: inline-block; color: #4b5563; font-size: 10px; font-family: 'JetBrains Mono', Consolas, monospace;">
                  Disparado com segurança via Resend API • MindSite Ecosystem
                </span>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}
