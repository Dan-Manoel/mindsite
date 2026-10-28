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
        <td style="padding: 14px 16px; border-bottom: 1px solid #eeeae8; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 13px; line-height: 1.5; color: #1f2937;">
          ${item.description}
        </td>
        <td align="right" style="padding: 14px 16px; border-bottom: 1px solid #eeeae8; font-family: 'JetBrains Mono', Consolas, Monaco, monospace; font-size: 13px; font-weight: 700; color: #0f0f0f; white-space: nowrap;">
          R$ ${item.amount.toFixed(2).replace(".", ",")}
        </td>
      </tr>`
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Fatura Emitida — MindSite</title>
</head>
<body style="margin: 0; padding: 40px 16px; background-color: #eeeae8; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; color: #0f0f0f;">
  <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 620px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e2dedc; border-radius: 6px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06); overflow: hidden;">
    
    <!-- Header Institucional com Fundo Claro e Alto Contraste -->
    <tr>
      <td style="padding: 24px 32px; background-color: #f9f7f7; border-bottom: 2px solid #eeeae8;">
        <table width="100%" border="0" cellpadding="0" cellspacing="0">
          <tr>
            <td align="left" valign="middle">
              <a href="https://mindsite.com.br" target="_blank" style="text-decoration: none; display: inline-block;">
                <img src="https://mindsite.com.br/img/logo.webp" alt="MindSite" width="130" style="display: block; border: 0; outline: none; text-decoration: none; max-width: 130px; height: auto;" />
              </a>
            </td>
            <td align="right" valign="middle">
              <span style="display: inline-block; padding: 5px 12px; background-color: rgba(0, 43, 186, 0.08); border: 1px solid rgba(0, 43, 186, 0.25); border-radius: 4px; font-family: 'JetBrains Mono', Consolas, Monaco, monospace; font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; color: #002bba; font-weight: 700;">
                [ COBRANÇA EMITIDA ]
              </span>
              <div style="font-family: 'JetBrains Mono', Consolas, monospace; font-size: 11px; color: #6b7280; margin-top: 5px; font-weight: 600;">
                REF #${params.invoiceNumber}
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Headline e Apresentação -->
    <tr>
      <td style="padding: 36px 32px 24px 32px; background-color: #ffffff;">
        <h1 style="margin: 0 0 14px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 24px; line-height: 1.25; font-weight: 800; letter-spacing: -0.02em; color: #0f0f0f;">
          Fafura MindSite
        </h1>
        <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #4b5563;">
          Olá, <strong style="color: #0f0f0f;">${params.clientName}</strong>. Emitimos uma fatura referente a serviços de desenvolvimento, manutenção e ou infraestrutura digital. Confira abaixo a discriminação detalhada dos serviços e efetue a liquidação direta via Pix ou Cartão de Crédito.
        </p>
      </td>
    </tr>

    <!-- Tabela de Itens Faturados -->
    <tr>
      <td style="padding: 0 32px 28px 32px; background-color: #ffffff;">
        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="border: 1px solid #eeeae8; border-radius: 4px; overflow: hidden; background-color: #fdfcfb; margin-bottom: 24px;">
          <thead>
            <tr style="background-color: #f4f1f0;">
              <th align="left" style="padding: 12px 16px; border-bottom: 1px solid #eeeae8; font-family: 'JetBrains Mono', Consolas, monospace; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #4b5563;">
                DISCRIMINAÇÃO DO SERVIÇO
              </th>
              <th align="right" style="padding: 12px 16px; border-bottom: 1px solid #eeeae8; font-family: 'JetBrains Mono', Consolas, monospace; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #4b5563;">
                SUBTOTAL
              </th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
            <tr style="background-color: #f9f7f7;">
              <td style="padding: 16px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #0f0f0f;">
                TOTAL CONSOLIDADO
              </td>
              <td align="right" style="padding: 16px; font-family: 'JetBrains Mono', Consolas, monospace; font-size: 22px; font-weight: 800; color: #002bba;">
                R$ ${params.totalAmount.toFixed(2).replace(".", ",")}
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Box de Vencimento com Alerta Visual -->
        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: #f9f7f7; border: 1px solid #eeeae8; border-left: 4px solid #002bba; border-radius: 4px; margin-bottom: 28px;">
          <tr>
            <td style="padding: 14px 18px;">
              <table width="100%" border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="left" style="font-family: 'JetBrains Mono', Consolas, monospace; font-size: 11px; text-transform: uppercase; color: #6b7280; font-weight: 600; letter-spacing: 0.05em;">
                    DATA DE VENCIMENTO
                  </td>
                  <td align="right" style="font-family: 'JetBrains Mono', Consolas, monospace; font-size: 14px; font-weight: 800; color: #dc2626;">
                    ${params.dueDate}
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        <!-- Botão Principal de Liquidação InfinitePay -->
        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
          <tr>
            <td align="center">
              <a href="${params.paymentUrl}" target="_blank" rel="noopener noreferrer" style="display: block; width: 100%; box-sizing: border-box; background-color: #002bba; color: #ffffff; padding: 16px 24px; font-family: 'JetBrains Mono', Consolas, monospace; font-size: 14px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; text-decoration: none; border-radius: 4px; text-align: center; box-shadow: 0 4px 14px rgba(0, 43, 186, 0.25);">
                Pagar com Cartão ou Pix &nbsp;→
              </a>
            </td>
          </tr>
        </table>

        <!-- Bloco Pix Copia e Cola (quando disponível) -->
        ${
          params.pixCopyPaste
            ? `
        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: #f9f7f7; border: 1px dashed #d1d5db; border-radius: 4px; margin-bottom: 24px;">
          <tr>
            <td style="padding: 16px;">
              <span style="display: block; font-family: 'JetBrains Mono', Consolas, monospace; font-size: 11px; font-weight: 700; text-transform: uppercase; color: #374151; letter-spacing: 0.08em; margin-bottom: 8px;">
                CÓDIGO PIX COPIA E COLA:
              </span>
              <div style="background-color: #ffffff; border: 1px solid #e5e7eb; padding: 12px; font-family: 'JetBrains Mono', Consolas, monospace; font-size: 11px; line-height: 1.4; color: #1f2937; word-break: break-all; border-radius: 3px;">
                ${params.pixCopyPaste}
              </div>
            </td>
          </tr>
        </table>`
            : ""
        }

        <!-- Seção de Links Úteis e Portal do Cliente -->
        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="border-top: 1px solid #eeeae8; padding-top: 24px; margin-top: 8px;">
          <tr>
            <td>
              <span style="display: block; font-family: 'JetBrains Mono', Consolas, monospace; font-size: 11px; font-weight: 700; text-transform: uppercase; color: #002bba; letter-spacing: 0.05em; margin-bottom: 12px;">
                LINKS ÚTEIS E ATALHOS RÁPIDOS
              </span>
              <table width="100%" border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding: 4px 0;">
                    <a href="https://mindsite.com.br/portal" target="_blank" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 13px; font-weight: 600; color: #002bba; text-decoration: underline;">
                      → Acessar Área do Cliente / Portal
                    </a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 4px 0;">
                    <a href="https://mindsite.com.br" target="_blank" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 13px; font-weight: 600; color: #002bba; text-decoration: underline;">
                      → Conhecer nossos Serviços / Visitar Site Oficial
                    </a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 6px 0 0 0; font-size: 12px; color: #6b7280; line-height: 1.5;">
                    Dúvidas ou Suporte? <a href="https://mindsite.com.br/portal" target="_blank" style="color: #002bba; font-weight: 600; text-decoration: underline;">Abra um chamado no portal</a> ou responda diretamente a este e-mail (<a href="mailto:contato@mindsite.com.br" style="color: #002bba; text-decoration: underline;">contato@mindsite.com.br</a>).
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
      <td style="padding: 24px 32px; background-color: #f9f7f7; border-top: 1px solid #eeeae8; text-align: center;">
        <p style="margin: 0 0 4px 0; font-family: 'JetBrains Mono', Consolas, monospace; font-size: 11px; font-weight: 600; color: #4b5563; text-transform: uppercase; letter-spacing: 0.05em;">
          MindSite Agência Digital — CNPJ 19.725.535/0001-58
        </p>
        <p style="margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 11px; color: #6b7280;">
          Infraestrutura, Desenvolvimento Web e Soluções Digitais de Alta Performance
        </p>
      </td>
    </tr>

  </table>
</body>
</html>
`;
}