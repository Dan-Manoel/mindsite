export interface InvoiceItem {
  description: string;
  amount: number;
}

export interface InvoiceEmailProps {
  clientName: string;
  invoiceNumber: string;
  totalAmount: number;
  dueDate: string;
  items: InvoiceItem[];
  paymentUrl: string;
  pixCopyPaste?: string;
}

export function renderInvoiceEmailHtml(params: InvoiceEmailProps): string {
  const itemsHtml = params.items
    .map(
      (item) => `
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #1f1f24; font-size: 13px; line-height: 1.5; color: #d4d4d8;">
          ${item.description}
        </td>
        <td align="right" style="padding: 12px 0; border-bottom: 1px solid #1f1f24; font-family: 'JetBrains Mono', monospace, Consolas; font-size: 13px; font-weight: 600; color: #ffffff;">
          R$ ${item.amount.toFixed(2).replace(".", ",")}
        </td>
      </tr>`
    )
    .join("");

  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Fatura Emitida — MindSite</title>
</head>
<body style="margin: 0; padding: 48px 16px; background-color: #0a0a0c; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #111114; border: 1px solid #222227; border-radius: 2px;">
    
    <!-- Topbar -->
    <tr>
      <td style="padding: 24px 32px; border-bottom: 1px solid #1f1f24;">
        <table width="100%" border="0" cellpadding="0" cellspacing="0">
          <tr>
            <td align="left">
              <span style="font-family: 'JetBrains Mono', monospace, Consolas; font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: #002bba; font-weight: 700;">
                [ COBRANÇA EMITIDA ]
              </span>
            </td>
            <td align="right">
              <span style="font-family: 'JetBrains Mono', monospace, Consolas; font-size: 12px; font-weight: 600; color: #a1a1aa;">
                REF #${params.invoiceNumber}
              </span>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Headline e Apresentação -->
    <tr>
      <td style="padding: 40px 32px 24px 32px;">
        <h1 style="margin: 0 0 16px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 28px; line-height: 1.15; font-weight: 700; letter-spacing: -0.03em; color: #ffffff;">
          Demonstrativo de Fatura e Liquidação
        </h1>
        <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #a1a1aa;">
          Olá, <strong style="color: #ffffff;">${params.clientName}</strong>. A fatura referente ao ciclo de sustentação da sua infraestrutura está disponível para liquidação direta via Pix ou Cartão de Crédito.
        </p>
      </td>
    </tr>

    <!-- Tabela de Itens Faturados -->
    <tr>
      <td style="padding: 16px 32px 32px 32px;">
        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
          <thead>
            <tr>
              <th align="left" style="padding-bottom: 10px; border-bottom: 1px solid #27272a; font-family: 'JetBrains Mono', monospace, Consolas; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #71717a;">
                DISCRIMINAÇÃO DO SERVIÇO
              </th>
              <th align="right" style="padding-bottom: 10px; border-bottom: 1px solid #27272a; font-family: 'JetBrains Mono', monospace, Consolas; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #71717a;">
                SUBTOTAL
              </th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
            <tr>
              <td style="padding: 20px 0 8px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #ffffff;">
                TOTAL CONSOLIDADO
              </td>
              <td align="right" style="padding: 20px 0 8px 0; font-family: 'JetBrains Mono', monospace, Consolas; font-size: 24px; font-weight: 700; color: #ffffff;">
                R$ ${params.totalAmount.toFixed(2).replace(".", ",")}
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Box de Vencimento -->
        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: #070709; border: 1px solid #222227; margin-bottom: 28px;">
          <tr>
            <td style="padding: 14px 18px;">
              <table width="100%" border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="left" style="font-family: 'JetBrains Mono', monospace, Consolas; font-size: 11px; text-transform: uppercase; color: #71717a; letter-spacing: 0.05em;">
                    VENCIMENTO DA FATURA
                  </td>
                  <td align="right" style="font-family: 'JetBrains Mono', monospace, Consolas; font-size: 13px; font-weight: 700; color: #ef4444;">
                    ${params.dueDate}
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        <!-- Botão de Abertura do Checkout InfinitePay -->
        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="margin-bottom: 28px;">
          <tr>
            <td align="center">
              <a href="${params.paymentUrl}" target="_blank" rel="noopener noreferrer" style="display: block; width: 100%; box-sizing: border-box; background-color: #002bba; color: #ffffff; padding: 16px 24px; font-family: 'JetBrains Mono', monospace, Consolas; font-size: 13px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; text-decoration: none; border-radius: 2px; text-align: center;">
                Pagar com Cartão ou Pix &nbsp;→
              </a>
            </td>
          </tr>
        </table>

        <!-- Bloco Pix Copia e Cola (Opcional) -->
        ${
          params.pixCopyPaste
            ? `
        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="border-top: 1px dashed #27272a; padding-top: 20px;">
          <tr>
            <td>
              <span style="display: block; font-family: 'JetBrains Mono', monospace, Consolas; font-size: 10px; font-weight: 700; text-transform: uppercase; color: #71717a; letter-spacing: 0.1em; margin-bottom: 8px;">
                CÓDIGO PIX COPIA E COLA
              </span>
              <div style="background-color: #070709; border: 1px solid #1f1f24; padding: 12px; font-family: 'JetBrains Mono', monospace, Consolas; font-size: 11px; line-height: 1.4; color: #94a3b8; word-break: break-all; border-radius: 2px;">
                ${params.pixCopyPaste}
              </div>
            </td>
          </tr>
        </table>`
            : ""
        }
      </td>
    </tr>

    <!-- Footer Corporativo -->
    <tr>
      <td style="padding: 28px 32px; background-color: #070709; border-top: 1px solid #1f1f24; text-align: center;">
        <p style="margin: 0 0 6px 0; font-family: 'JetBrains Mono', monospace, Consolas; font-size: 11px; color: #52525b; text-transform: uppercase; letter-spacing: 0.05em;">
          MindSite Agência Digital — CNPJ 19.725.535/0001-58
        </p>
        <p style="margin: 0; font-family: 'JetBrains Mono', monospace, Consolas; font-size: 11px; color: #3f3f46;">
          Dúvidas sobre faturamento? Contate <a href="mailto:contato@mindsite.com.br" style="color: #71717a; text-decoration: underline;">contato@mindsite.com.br</a>
        </p>
      </td>
    </tr>

  </table>
</body>
</html>
`;
}