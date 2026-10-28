export interface AdminInvoiceOverdueProps {
  clientName: string;
  document?: string | null;
  projectName: string;
  invoiceId?: string;
  invoiceNumber: string;
  totalAmount?: number;
  amount?: number;
  dueDate: string; // DD/MM/AAAA
  daysOverdue: number;
  clientEmail: string;
  clientPhone?: string | null;
  adminInvoiceUrl?: string;
}

export function getAdminInvoiceOverdueSubject(params: {
  clientName: string;
  projectName: string;
  totalAmount?: number;
  amount?: number;
}): string {
  const finalAmount = params.totalAmount ?? params.amount ?? 0;
  const amountStr = Number(finalAmount).toFixed(2).replace(".", ",");
  return `🚨 [ALERTA DE INADIMPLÊNCIA] Fatura Vencida: ${params.clientName} - ${params.projectName} (R$ ${amountStr})`;
}

export function renderAdminInvoiceOverdueEmailHtml(params: AdminInvoiceOverdueProps): string {
  const finalAmount = params.totalAmount ?? params.amount ?? 0;
  const formattedAmount = `R$ ${Number(finalAmount).toFixed(2).replace(".", ",")}`;
  const adminUrl = params.adminInvoiceUrl || "https://mindsite.com.br/admin";

  // Formatação do telefone e link WhatsApp do cliente
  const rawPhone = params.clientPhone || "";
  const phoneDigits = rawPhone.replace(/\D/g, "");
  const phoneClean = phoneDigits.startsWith("55") ? phoneDigits.slice(2) : phoneDigits;
  const whatsappUrl = phoneClean
    ? `https://wa.me/55${phoneClean}?text=${encodeURIComponent(
      `Olá ${params.clientName}, identificamos uma pendência financeira referente à fatura #${params.invoiceNumber} no valor de ${formattedAmount}, vencida em ${params.dueDate}. Segue link para regularização:`
    )}`
    : null;

  const daysOverdueText =
    params.daysOverdue <= 1
      ? "1 dia em atraso"
      : `${params.daysOverdue} dias em atraso`;

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Alerta de Inadimplência — MindSite Interno</title>
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
<body style="margin: 0; padding: 40px 16px; background-color: #0a0a0c; font-family: 'JetBrains Mono', Consolas, Monaco, monospace; -webkit-font-smoothing: antialiased; color: #eeeae8;">
  <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 640px; margin: 0 auto; background-color: #111114; border: 1px solid #1f1f24; border-radius: 8px; overflow: hidden; box-shadow: 0 12px 40px rgba(0, 0, 0, 0.6);">
    
    <!-- Header Alerta Interno Dark -->
    <tr>
      <td style="padding: 24px 32px; background-color: #0d0d10; border-bottom: 1px solid #1f1f24;">
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
              <span style="display: inline-block; font-family: 'JetBrains Mono', monospace, sans-serif; font-size: 11px; font-weight: 700; color: #ef4444; background-color: rgba(220, 38, 38, 0.15); border: 1px solid rgba(220, 38, 38, 0.4); padding: 6px 12px; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.05em; white-space: nowrap;">
                ALERTA DIRETORIA
              </span>
              <div style="font-family: 'JetBrains Mono', monospace, sans-serif; font-size: 11px; color: #71717a; margin-top: 6px; letter-spacing: 0.02em;">
                REF #${params.invoiceNumber}
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Headline e Destaque de Valor -->
    <tr>
      <td style="padding: 32px 32px 20px 32px; background-color: #111114;">
        <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #ef4444; margin-bottom: 8px; font-weight: 700;">
          FATURA VENCIDA NÃO LIQUIDADA
        </div>
        <h1 style="margin: 0 0 16px 0; font-family: 'Manrope', -apple-system, BlinkMacSystemFont, sans-serif; font-size: 22px; line-height: 1.3; font-weight: 800; color: #ffffff;">
          ${params.clientName}
        </h1>
        <p style="margin: 0; font-size: 13px; line-height: 1.6; color: #a1a1aa;">
          O sistema automático de régua de cobrança detectou o vencimento da fatura <strong>#${params.invoiceNumber}</strong> sem baixa registrada no gateway de pagamento.
        </p>
      </td>
    </tr>

    <!-- Card de Dados Estruturados -->
    <tr>
      <td style="padding: 0 32px 24px 32px; background-color: #111114;">
        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: #0d0d10; border: 1px solid #1f1f24; border-radius: 6px; overflow: hidden; margin-bottom: 24px;">
          
          <!-- Cliente / Razão Social -->
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid #1f1f24; font-size: 11px; color: #71717a; text-transform: uppercase; width: 38%;">
              Cliente / Razão Social:
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid #1f1f24; font-size: 12px; color: #ffffff; font-weight: 700;">
              ${params.clientName} ${params.document ? `<span style="color: #819ffe; font-weight: normal; margin-left: 6px;">(${params.document})</span>` : ""}
            </td>
          </tr>

          <!-- Projeto Vinculado -->
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid #1f1f24; font-size: 11px; color: #71717a; text-transform: uppercase;">
              Projeto Vinculado:
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid #1f1f24; font-size: 12px; color: #819ffe; font-weight: 700;">
              ${params.projectName}
            </td>
          </tr>

          <!-- Fatura ID & Número -->
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid #1f1f24; font-size: 11px; color: #71717a; text-transform: uppercase;">
              Fatura / Número:
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid #1f1f24; font-size: 12px; color: #ffffff; font-weight: 700;">
              #${params.invoiceNumber} <span style="font-size: 10px; color: #52525b; margin-left: 6px;">ID: ${params.invoiceId}</span>
            </td>
          </tr>

          <!-- Valor em Atraso -->
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid #1f1f24; font-size: 11px; color: #71717a; text-transform: uppercase;">
              Valor em Atraso:
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid #1f1f24; font-size: 15px; color: #ef4444; font-weight: 800;">
              ${formattedAmount}
            </td>
          </tr>

          <!-- Data de Vencimento com cálculo visual de atraso -->
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid #1f1f24; font-size: 11px; color: #71717a; text-transform: uppercase;">
              Data de Vencimento:
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid #1f1f24; font-size: 12px; color: #ffffff;">
              <strong style="color: #f87171;">${params.dueDate}</strong>
              <span style="display: inline-block; margin-left: 8px; padding: 2px 8px; background-color: rgba(239, 68, 68, 0.2); border: 1px solid rgba(239, 68, 68, 0.4); border-radius: 3px; font-size: 10px; color: #fca5a5; font-weight: 700;">
                ${daysOverdueText}
              </span>
            </td>
          </tr>

          <!-- E-mail de Contato -->
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid #1f1f24; font-size: 11px; color: #71717a; text-transform: uppercase;">
              E-mail de Contato:
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid #1f1f24; font-size: 12px;">
              <a href="mailto:${params.clientEmail}" style="color: #819ffe; text-decoration: underline;">
                ${params.clientEmail}
              </a>
            </td>
          </tr>

          <!-- Telefone com Link tel: -->
          <tr>
            <td style="padding: 12px 16px; font-size: 11px; color: #71717a; text-transform: uppercase;">
              Telefone / Contato:
            </td>
            <td style="padding: 12px 16px; font-size: 12px;">
              ${rawPhone
      ? `<a href="tel:${phoneDigits}" style="color: #819ffe; text-decoration: underline;">${rawPhone}</a>`
      : `<span style="color: #71717a;">Não informado</span>`
    }
            </td>
          </tr>
        </table>

        <!-- Ação Direta de Cobrança (Botão Verde para WhatsApp) -->
        ${whatsappUrl
      ? `
        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="margin-bottom: 14px;">
          <tr>
            <td align="center">
              <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" style="display: block; width: 100%; box-sizing: border-box; background-color: #22c55e; color: #0a0a0c; padding: 14px 20px; font-size: 12px; font-weight: 800; letter-spacing: 0.05em; text-transform: uppercase; text-decoration: none; border-radius: 6px; text-align: center; box-shadow: 0 4px 16px rgba(34, 197, 94, 0.25);">
                💬 COBRAR DIRETAMENTE VIA WHATSAPP &nbsp;→
              </a>
            </td>
          </tr>
        </table>`
      : ""
    }

        <!-- Atalho do Painel Admin (Botão Secundário) -->
        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
          <tr>
            <td align="center">
              <a href="${adminUrl}" target="_blank" rel="noopener noreferrer" style="display: block; width: 100%; box-sizing: border-box; background-color: #1f1f24; border: 1px solid #2e2e36; color: #ffffff; padding: 12px 20px; font-size: 12px; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; text-decoration: none; border-radius: 6px; text-align: center;">
                ⚙️ ACESSAR FATURA NO PAINEL ADMINISTRATIVO &nbsp;→
              </a>
            </td>
          </tr>
        </table>

        <!-- Rodapé do Alerta -->
        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="border-top: 1px solid #1f1f24; padding-top: 16px;">
          <tr>
            <td style="font-size: 10px; color: #71717a; line-height: 1.5; text-align: center;">
              Disparo automatizado pelo motor da MindSite às 08:00 BRT (11:00 UTC).<br />
              Para suspender o SLA de desenvolvimento ou bloquear credenciais, acesse o painel master.
            </td>
          </tr>
        </table>

      </td>
    </tr>

  </table>
</body>
</html>
`;
}
