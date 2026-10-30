export type InvoiceReminderStage =
  | "ABANDONED_3H"
  | "UPCOMING_5D"
  | "DUE_TODAY"
  | "OVERDUE_1D"
  | "OVERDUE_3D";

export interface InvoiceReminderItem {
  description: string;
  amount: number;
}

export interface InvoiceReminderProps {
  clientName: string;
  invoiceNumber: string;
  dueDate: string; // Ex: "28/10/2026"
  totalAmount: number;
  items: InvoiceReminderItem[];
  paymentUrl: string;
  pixCopyPaste?: string | null;
  stage: InvoiceReminderStage;
  mindsitePhone?: string;
}

interface StageMetadata {
  badgeText: string;
  badgeColor: string;
  badgeBg: string;
  badgeBorder: string;
  heading: string;
  messageText: string;
  dueBoxAccent: string;
  subjectPrefix: string;
}

function getStageMetadata(
  stage: InvoiceReminderStage,
  clientName: string,
  invoiceNumber: string
): StageMetadata {
  switch (stage) {
    case "ABANDONED_3H":
      return {
        badgeText: "FATURA DISPONÍVEL",
        badgeColor: "#002bba",
        badgeBg: "rgba(0, 43, 186, 0.08)",
        badgeBorder: "rgba(0, 43, 186, 0.25)",
        heading: "Fatura Disponível para Pagamento",
        messageText: `Olá, <strong style="color: #0f0f0f;">${clientName}</strong>. Identificamos que a sua fatura #${invoiceNumber} foi gerada para liquidação e aguarda confirmação de pagamento. Para sua comodidade e continuidade dos serviços, você pode liquidá-la diretamente via Pix Copia e Cola ou Cartão de Crédito pelo link seguro abaixo.`,
        dueBoxAccent: "#002bba",
        subjectPrefix: "Lembrete: Fatura Disponível",
      };
    case "UPCOMING_5D":
      return {
        badgeText: "LEMBRETE DE VENCIMENTO",
        badgeColor: "#002bba",
        badgeBg: "rgba(0, 43, 186, 0.08)",
        badgeBorder: "rgba(0, 43, 186, 0.25)",
        heading: "Lembrete de Vencimento",
        messageText: `Olá, <strong style="color: #0f0f0f;">${clientName}</strong>. Gostaríamos de lembrar que sua fatura vence em 5 dias. Para sua comodidade e continuidade dos serviços de sustentação, você já pode realizar a liquidação antecipada via Cartão de Crédito ou Pix.`,
        dueBoxAccent: "#002bba",
        subjectPrefix: "Lembrete de Vencimento",
      };
    case "DUE_TODAY":
      return {
        badgeText: "VENCIMENTO HOJE",
        badgeColor: "#d97706",
        badgeBg: "rgba(217, 119, 6, 0.10)",
        badgeBorder: "rgba(217, 119, 6, 0.30)",
        heading: "Sua Fatura Vence Hoje",
        messageText: `Olá, <strong style="color: #0f0f0f;">${clientName}</strong>. Lembramos que a sua fatura vence na data de hoje. Efetue a liquidação direta para manter seus serviços operando com total tranquilidade e evitar qualquer pausa nos atendimentos.`,
        dueBoxAccent: "#d97706",
        subjectPrefix: "Vence Hoje",
      };
    case "OVERDUE_1D":
      return {
        badgeText: "FATURA VENCIDA",
        badgeColor: "#dc2626",
        badgeBg: "rgba(220, 38, 38, 0.10)",
        badgeBorder: "rgba(220, 38, 38, 0.30)",
        heading: "Aviso de Fatura Vencida",
        messageText: `Olá, <strong style="color: #0f0f0f;">${clientName}</strong>. Identificamos que o pagamento da fatura #${invoiceNumber} não foi confirmado até o vencimento no dia anterior. Solicitamos a regularização para evitar a incidência de encargos ou bloqueio de novas demandas.`,
        dueBoxAccent: "#dc2626",
        subjectPrefix: "Fatura Vencida",
      };
    case "OVERDUE_3D":
      return {
        badgeText: "AVISO DE SUSPENSÃO",
        badgeColor: "#991b1b",
        badgeBg: "rgba(153, 27, 27, 0.12)",
        badgeBorder: "rgba(153, 27, 27, 0.35)",
        heading: "Aviso de Suspensão de Serviços",
        messageText: `Olá, <strong style="color: #0f0f0f;">${clientName}</strong>. Constatamos uma pendência financeira em aberto há mais de 3 dias. Comunicamos o <strong style="color: #991b1b;">risco iminente de congelamento dos SLAs de sustentação</strong>, suporte técnico prioritário e serviços em nuvem. Regularize agora para restabelecer a normalidade.`,
        dueBoxAccent: "#991b1b",
        subjectPrefix: "URGENTE: Risco de Suspensão",
      };
  }
}

export function renderInvoiceReminderEmailHtml(params: InvoiceReminderProps): string {
  const meta = getStageMetadata(params.stage, params.clientName, params.invoiceNumber);

  // Formata telefone MindSite para link WhatsApp (wa.me/55${phoneClean})
  const defaultPhone = "11999999999";
  const rawPhone =
    params.mindsitePhone ||
    process.env.NEXT_PUBLIC_MINDSITE_WHATSAPP ||
    process.env.MINDSITE_WHATSAPP ||
    defaultPhone;
  const digitsOnly = rawPhone.replace(/\D/g, "");
  const phoneClean = digitsOnly.startsWith("55") ? digitsOnly.slice(2) : digitsOnly;
  const whatsappUrl = `https://wa.me/55${phoneClean}?text=${encodeURIComponent(
    `Olá, sou cliente MindSite e gostaria de tratar sobre a fatura #${params.invoiceNumber}`
  )}`;

  const itemsHtml = params.items && params.items.length > 0
    ? params.items
      .map(
        (item) => `
      <tr>
        <td style="padding: 14px 16px; border-bottom: 1px solid #e5e5e5; font-family: 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 13px; line-height: 1.5; color: #1f2937;">
          ${item.description}
        </td>
        <td align="right" style="padding: 14px 16px; border-bottom: 1px solid #e5e5e5; font-family: 'JetBrains Mono', Consolas, Monaco, monospace; font-size: 13px; font-weight: 700; color: #0f0f0f; white-space: nowrap;">
          R$ ${item.amount.toFixed(2).replace(".", ",")}
        </td>
      </tr>`
      )
      .join("")
    : `
      <tr>
        <td style="padding: 14px 16px; border-bottom: 1px solid #e5e5e5; font-family: 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 13px; line-height: 1.5; color: #1f2937;">
          Serviços de Desenvolvimento e Infraestrutura Web
        </td>
        <td align="right" style="padding: 14px 16px; border-bottom: 1px solid #e5e5e5; font-family: 'JetBrains Mono', Consolas, Monaco, monospace; font-size: 13px; font-weight: 700; color: #0f0f0f; white-space: nowrap;">
          R$ ${params.totalAmount.toFixed(2).replace(".", ",")}
        </td>
      </tr>`;

  const totalFormatado = `R$ ${params.totalAmount.toFixed(2).replace(".", ",")}`;

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${meta.heading} — MindSite</title>
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
<body style="margin: 0; padding: 40px 16px; background-color: #f9f7f7; font-family: 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; color: #0f0f0f;">
  <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 620px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e5e5e5; border-radius: 8px; box-shadow: 0 4px 24px rgba(0, 0, 0, 0.05); overflow: hidden;">
    
    <!-- Topo com Logo MindSite e Tag do Estágio -->
    <tr>
      <td style="padding: 24px 32px; background-color: #ffffff; border-bottom: 1px solid #e5e5e5;">
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
              <span style="display: inline-block; font-family: 'JetBrains Mono', monospace, sans-serif; font-size: 11px; font-weight: 700; color: ${meta.badgeColor}; background-color: ${meta.badgeBg}; border: 1px solid ${meta.badgeBorder}; padding: 6px 12px; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.05em; white-space: nowrap;">
                ${meta.badgeText}
              </span>
              <div style="font-family: 'JetBrains Mono', monospace, sans-serif; font-size: 11px; color: #6b7280; margin-top: 6px; letter-spacing: 0.02em;">
                REF #${params.invoiceNumber}
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Headline e Apresentação do Estágio -->
    <tr>
      <td style="padding: 32px 32px 20px 32px; background-color: #ffffff;">
        <h1 style="margin: 0 0 14px 0; font-family: 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 22px; line-height: 1.3; font-weight: 800; letter-spacing: -0.02em; color: #0f0f0f;">
          ${meta.heading}
        </h1>
        <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #4b5563;">
          ${meta.messageText}
        </p>
      </td>
    </tr>

    <!-- Tabela com Discriminação de Serviços e Total Consolidado -->
    <tr>
      <td style="padding: 0 32px 24px 32px; background-color: #ffffff;">
        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="border: 1px solid #e5e5e5; border-radius: 6px; overflow: hidden; background-color: #ffffff; margin-bottom: 20px;">
          <thead>
            <tr style="background-color: #f9f7f7;">
              <th align="left" style="padding: 12px 16px; border-bottom: 1px solid #e5e5e5; font-family: 'JetBrains Mono', Consolas, monospace; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #6b7280;">
                DISCRIMINAÇÃO DO SERVIÇO
              </th>
              <th align="right" style="padding: 12px 16px; border-bottom: 1px solid #e5e5e5; font-family: 'JetBrains Mono', Consolas, monospace; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #6b7280;">
                SUBTOTAL
              </th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
            <tr style="background-color: #f9f7f7;">
              <td style="padding: 16px; font-family: 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 13px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; color: #0f0f0f;">
                VALOR TOTAL CONSOLIDADO
              </td>
              <td align="right" style="padding: 16px; font-family: 'JetBrains Mono', Consolas, monospace; font-size: 20px; font-weight: 800; color: #002bba;">
                ${totalFormatado}
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Box de Vencimento com a Data Formatada -->
        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: #f9f7f7; border: 1px solid #e5e5e5; border-left: 4px solid ${meta.dueBoxAccent}; border-radius: 4px; margin-bottom: 24px;">
          <tr>
            <td style="padding: 14px 18px;">
              <table width="100%" border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="left" style="font-family: 'JetBrains Mono', Consolas, monospace; font-size: 11px; text-transform: uppercase; color: #6b7280; font-weight: 700; letter-spacing: 0.05em;">
                    DATA DE VENCIMENTO
                  </td>
                  <td align="right" style="font-family: 'JetBrains Mono', Consolas, monospace; font-size: 14px; font-weight: 800; color: ${meta.badgeColor};">
                    ${params.dueDate}
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        <!-- Botão Primário em Destaque: PAGAR COM CARTÃO OU PIX -->
        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
          <tr>
            <td align="center">
              <a href="${params.paymentUrl}" target="_blank" rel="noopener noreferrer" style="display: block; width: 100%; box-sizing: border-box; background-color: #002bba; color: #ffffff; padding: 16px 24px; font-family: 'JetBrains Mono', Consolas, monospace; font-size: 13px; font-weight: 800; letter-spacing: 0.06em; text-transform: uppercase; text-decoration: none; border-radius: 6px; text-align: center; box-shadow: 0 4px 16px rgba(0, 43, 186, 0.25);">
                PAGAR COM CARTÃO OU PIX &nbsp;→
              </a>
            </td>
          </tr>
        </table>

        <!-- Código Pix Copia e Cola em Bloco Mono Destacado caso exista -->
        ${params.pixCopyPaste
      ? `
        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: #f9f7f7; border: 1px dashed #d1d5db; border-radius: 6px; margin-bottom: 24px;">
          <tr>
            <td style="padding: 16px;">
              <span style="display: block; font-family: 'JetBrains Mono', Consolas, monospace; font-size: 11px; font-weight: 700; text-transform: uppercase; color: #374151; letter-spacing: 0.08em; margin-bottom: 8px;">
                CÓDIGO PIX COPIA E COLA:
              </span>
              <div style="background-color: #ffffff; border: 1px solid #e5e7eb; padding: 12px; font-family: 'JetBrains Mono', Consolas, monospace; font-size: 11px; line-height: 1.4; color: #1f2937; word-break: break-all; border-radius: 4px;">
                ${params.pixCopyPaste}
              </div>
            </td>
          </tr>
        </table>`
      : ""
    }

        <!-- Seção de Links Úteis no Rodapé -->
        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="border-top: 1px solid #e5e5e5; padding-top: 20px; margin-top: 8px;">
          <tr>
            <td>
              <span style="display: block; font-family: 'JetBrains Mono', Consolas, monospace; font-size: 11px; font-weight: 700; text-transform: uppercase; color: #002bba; letter-spacing: 0.05em; margin-bottom: 10px;">
                LINKS ÚTEIS E ATENDIMENTO
              </span>
              <table width="100%" border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding: 4px 0;">
                    <a href="https://mindsite.com.br/portal" target="_blank" rel="noopener noreferrer" style="font-family: 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 13px; font-weight: 600; color: #002bba; text-decoration: underline;">
                      → Acessar Área do Cliente (Portal)
                    </a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 4px 0;">
                    <a href="https://mindsite.com.br" target="_blank" rel="noopener noreferrer" style="font-family: 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 13px; font-weight: 600; color: #002bba; text-decoration: underline;">
                      → Visitar Site Oficial da MindSite
                    </a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 4px 0;">
                    <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" style="font-family: 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 13px; font-weight: 600; color: #16a34a; text-decoration: underline;">
                      → Falar com Financeiro via WhatsApp
                    </a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0 0 0; font-size: 12px; color: #6b7280; line-height: 1.5;">
                    Dúvidas ou auxílio? Responda a este e-mail (<a href="mailto:contato@mindsite.com.br" style="color: #002bba; text-decoration: underline;">contato@mindsite.com.br</a>) ou utilize os atalhos acima.
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

      </td>
    </tr>

    <!-- Rodapé Corporativo -->
    <tr>
      <td style="padding: 24px 32px; background-color: #f9f7f7; border-top: 1px solid #e5e5e5; text-align: center;">
        <p style="margin: 0 0 4px 0; font-family: 'JetBrains Mono', Consolas, monospace; font-size: 11px; font-weight: 600; color: #4b5563; text-transform: uppercase; letter-spacing: 0.05em;">
          MindSite Agência Digital — CNPJ 19.725.535/0001-58
        </p>
        <p style="margin: 0; font-family: 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 11px; color: #6b7280;">
          Infraestrutura em Nuvem, Engenharia de Software e Sustentação Digital
        </p>
      </td>
    </tr>

  </table>
</body>
</html>
`;
}

export function getInvoiceReminderSubject(
  stage: InvoiceReminderStage,
  invoiceNumber: string,
  totalAmount: number
): string {
  const valorFormatado = `R$ ${totalAmount.toFixed(2).replace(".", ",")}`;
  switch (stage) {
    case "ABANDONED_3H":
      return `Lembrete: Fatura #${invoiceNumber} disponível para pagamento — MindSite`;
    case "UPCOMING_5D":
      return `Lembrete de Vencimento: Fatura #${invoiceNumber} vence em 5 dias (${valorFormatado})`;
    case "DUE_TODAY":
      return `Sua fatura MindSite #${invoiceNumber} vence HOJE (${valorFormatado})`;
    case "OVERDUE_1D":
      return `Aviso de Fatura Vencida: Fatura #${invoiceNumber} (${valorFormatado})`;
    case "OVERDUE_3D":
      return `URGENTE: Risco de Suspensão de Serviços — Fatura #${invoiceNumber} (${valorFormatado})`;
  }
}
