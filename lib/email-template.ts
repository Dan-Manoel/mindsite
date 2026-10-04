export interface ContactEmailData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  submittedAt?: Date;
  source?: string;
}

/**
 * Formats a phone number into a direct WhatsApp link
 */
function getWhatsAppLink(phone: string): string | null {
  const digits = phone.replace(/\D/g, "");
  if (!digits) return null;
  // If no country code provided, default to Brazil (55)
  const fullNumber = digits.length <= 11 ? `55${digits}` : digits;
  return `https://wa.me/${fullNumber}`;
}

/**
 * Formats a date in Brazilian Portuguese format and São Paulo timezone
 */
function formatSubmissionDate(date?: Date): string {
  const d = date || new Date();
  try {
    return new Intl.DateTimeFormat("pt-BR", {
      dateStyle: "full",
      timeStyle: "short",
      timeZone: "America/Sao_Paulo",
    }).format(d);
  } catch {
    return d.toLocaleString("pt-BR");
  }
}

/**
 * Escapes HTML characters to prevent XSS / broken markup in email
 */
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Generates an HTML email adhering to Mindsite's dark, high-end agency design system:
 * - Background: #0a0a0c & #141416
 * - Accent: #002bba & #3660ff
 * - Typography: Manrope & JetBrains Mono
 * - Clean badges, metadata grid, message block, and action CTAs.
 */
export function generateContactEmailHtml(data: ContactEmailData): string {
  const safeName = escapeHtml(data.name);
  const safeEmail = escapeHtml(data.email);
  const safeCompany = data.company ? escapeHtml(data.company) : null;
  const safePhone = data.phone ? escapeHtml(data.phone) : null;
  const safeMessage = escapeHtml(data.message).replace(/\n/g, "<br />");
  const formattedDate = formatSubmissionDate(data.submittedAt);
  const whatsappUrl = data.phone ? getWhatsAppLink(data.phone) : null;
  const mailtoReply = `mailto:${encodeURIComponent(data.email)}?subject=Re:%20Contato%20Mindsite%20-%20${encodeURIComponent(data.name)}`;

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Novo Lead • Mindsite</title>
  <style>
    /* Reset styles */
    body, table, td, p, a, li, blockquote {
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }
    table, td {
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    }
    img {
      -ms-interpolation-mode: bicubic;
      border: 0;
      outline: none;
      text-decoration: none;
    }
    body {
      margin: 0;
      padding: 0;
      width: 100% !important;
      background-color: #09090b;
      font-family: 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #ffffff;
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #09090b; font-family: 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #09090b; padding: 40px 16px;">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 620px; background-color: #121214; border: 1px solid #222226; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);">
          
          <!-- Top Accent Line -->
          <tr>
            <td height="4" style="background: linear-gradient(90deg, #002bba 0%, #3660ff 100%);"></td>
          </tr>

          <!-- Header Section -->
          <tr>
            <td style="padding: 36px 36px 24px 36px; border-bottom: 1px solid #1c1c20;">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <!-- Brand Label -->
                    <span style="font-family: 'JetBrains Mono', monospace, sans-serif; font-size: 13px; font-weight: 700; letter-spacing: 3px; color: #ffffff; text-transform: uppercase;">
                      MINDSITE
                    </span>
                    <span style="display: inline-block; margin-left: 10px; background-color: rgba(0, 43, 186, 0.2); border: 1px solid rgba(0, 43, 186, 0.6); color: #819ffe; font-family: 'JetBrains Mono', monospace; font-size: 10px; font-weight: 600; padding: 3px 10px; border-radius: 999px; text-transform: uppercase; letter-spacing: 1px; vertical-align: middle;">
                      Novo Lead
                    </span>
                  </td>
                  <td align="right">
                    <span style="font-family: 'JetBrains Mono', monospace; font-size: 11px; color: #6e7180;">
                      ${formattedDate}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td colspan="2" style="padding-top: 20px;">
                    <h1 style="margin: 0; font-size: 24px; font-weight: 700; color: #ffffff; line-height: 1.3; letter-spacing: -0.5px;">
                      Novo formulário de interesse recebido
                    </h1>
                    <p style="margin: 8px 0 0 0; font-size: 14px; color: #8e93a1; line-height: 1.5;">
                      Um cliente em potencial enviou uma proposta através do site da Mindsite.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Lead Info Grid -->
          <tr>
            <td style="padding: 28px 36px;">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #17171a; border: 1px solid #26262b; border-radius: 12px; overflow: hidden;">
                <!-- Lead Name -->
                <tr>
                  <td width="30%" style="padding: 14px 20px; font-family: 'JetBrains Mono', monospace; font-size: 12px; color: #8e93a1; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid #202024;">
                    Nome
                  </td>
                  <td width="70%" style="padding: 14px 20px; font-size: 15px; font-weight: 600; color: #ffffff; border-bottom: 1px solid #202024;">
                    ${safeName}
                  </td>
                </tr>

                <!-- Lead Email -->
                <tr>
                  <td style="padding: 14px 20px; font-family: 'JetBrains Mono', monospace; font-size: 12px; color: #8e93a1; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid #202024;">
                    E-mail
                  </td>
                  <td style="padding: 14px 20px; font-size: 15px; color: #819ffe; font-weight: 500; border-bottom: 1px solid #202024;">
                    <a href="mailto:${safeEmail}" style="color: #819ffe; text-decoration: none;">
                      ${safeEmail}
                    </a>
                  </td>
                </tr>

                <!-- Lead Company -->
                <tr>
                  <td style="padding: 14px 20px; font-family: 'JetBrains Mono', monospace; font-size: 12px; color: #8e93a1; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid #202024;">
                    Empresa
                  </td>
                  <td style="padding: 14px 20px; font-size: 15px; color: #ffffff; border-bottom: 1px solid #202024;">
                    ${safeCompany || '<span style="color: #575960;">Não informada</span>'}
                  </td>
                </tr>

                <!-- Lead Phone -->
                <tr>
                  <td style="padding: 14px 20px; font-family: 'JetBrains Mono', monospace; font-size: 12px; color: #8e93a1; text-transform: uppercase; letter-spacing: 1px;">
                    Telefone
                  </td>
                  <td style="padding: 14px 20px; font-size: 15px; color: #ffffff;">
                    ${safePhone ? `<a href="tel:${safePhone}" style="color: #ffffff; text-decoration: none;">${safePhone}</a>` : '<span style="color: #575960;">Não informado</span>'}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Message Section -->
          <tr>
            <td style="padding: 0 36px 30px 36px;">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="padding-bottom: 10px;">
                    <span style="font-family: 'JetBrains Mono', monospace; font-size: 11px; font-weight: 700; color: #8e93a1; text-transform: uppercase; letter-spacing: 1.5px;">
                      Mensagem do Cliente
                    </span>
                  </td>
                </tr>
                <tr>
                  <td style="background-color: #17171a; border-left: 3px solid #002bba; border-top: 1px solid #26262b; border-right: 1px solid #26262b; border-bottom: 1px solid #26262b; border-radius: 0 12px 12px 0; padding: 22px; font-size: 15px; line-height: 1.7; color: #e4e4e7;">
                    ${safeMessage}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Quick Action Buttons -->
          <tr>
            <td style="padding: 0 36px 36px 36px;">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center">
                    <table role="presentation" border="0" cellspacing="0" cellpadding="0" style="margin: 0 auto;">
                      <tr>
                        <!-- Responder Email -->
                        <td align="center" style="border-radius: 8px; background-color: #002bba;">
                          <a href="${mailtoReply}" target="_blank" style="display: inline-block; padding: 13px 26px; font-size: 14px; font-weight: 700; color: #ffffff; text-decoration: none; border-radius: 8px; font-family: 'Manrope', sans-serif;">
                            Responder por E-mail &rarr;
                          </a>
                        </td>
                        ${
                          whatsappUrl
                            ? `
                        <td width="14"></td>
                        <!-- WhatsApp Direct -->
                        <td align="center" style="border-radius: 8px; background-color: #1f2124; border: 1px solid #313336;">
                          <a href="${whatsappUrl}" target="_blank" style="display: inline-block; padding: 13px 22px; font-size: 14px; font-weight: 600; color: #25d366; text-decoration: none; border-radius: 8px; font-family: 'Manrope', sans-serif;">
                            Chamar no WhatsApp
                          </a>
                        </td>`
                            : ""
                        }
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer Section -->
          <tr>
            <td style="padding: 24px 36px; background-color: #0d0d0f; border-top: 1px solid #1c1c20;">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center">
                    <p style="margin: 0; font-size: 12px; color: #6e7180; line-height: 1.6;">
                      <strong style="color: #8e93a1;">Mindsite | Agência Digital</strong><br />
                      São Paulo • Nova York • <a href="https://www.mindsite.com.br" style="color: #819ffe; text-decoration: none;">mindsite.com.br</a>
                    </p>
                    <p style="margin: 10px 0 0 0; font-size: 11px; color: #43454d; font-family: 'JetBrains Mono', monospace;">
                      Disparado com segurança via Resend API • Mindsite Ecosystem
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * Generates a clean plain-text version for email readers without HTML support
 */
export function generateContactEmailText(data: ContactEmailData): string {
  const formattedDate = formatSubmissionDate(data.submittedAt);
  return `========================================
MINDSITE - NOVO FORMULÁRIO DE INTERESSE
========================================
Data: ${formattedDate}

DADOS DO LEAD:
- Nome: ${data.name}
- E-mail: ${data.email}
- Empresa: ${data.company || "Não informada"}
- Telefone: ${data.phone || "Não informado"}

MENSAGEM DO PROJETO:
${data.message}

========================================
Mindsite | Agência Digital
https://www.mindsite.com.br
Enviado com segurança via Resend API
========================================`;
}
