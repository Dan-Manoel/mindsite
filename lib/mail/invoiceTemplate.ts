export function renderInvoiceEmailHtml(params: {
  clientName: string;
  invoiceNumber: string;
  totalAmount: number;
  dueDate: string;
  items: Array<{ description: string; amount: number }>;
  paymentUrl: string;
  pixCopyPaste?: string;
}) {
  const itemsHtml = params.items
    .map(
      (item) => `
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #262626; color: #d4d4d4; font-size: 13px; font-family: monospace;">${item.description}</td>
        <td style="padding: 12px 0; border-bottom: 1px solid #262626; color: #ffffff; font-size: 13px; font-family: monospace; text-align: right; font-weight: bold;">R$ ${item.amount.toFixed(2).replace(".", ",")}</td>
      </tr>`
    )
    .join("");

  return `
  <!DOCTYPE html>
  <html>
    <head><meta charset="utf-8" /></head>
    <body style="background-color: #0a0a0a; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 40px 15px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #141414; border: 1px solid #262626; border-radius: 6px; overflow: hidden;">
        <tr>
          <td style="padding: 30px; background-color: #171719; border-bottom: 1px solid #262626;">
            <table width="100%">
              <tr>
                <td>
                  <span style="font-family: monospace; font-size: 11px; letter-spacing: 2px; color: #3b82f6; font-weight: bold; text-transform: uppercase;">MindSite Agência Digital</span>
                  <h1 style="color: #ffffff; font-size: 24px; margin: 6px 0 0 0; font-weight: 700;">Nova Fatura Disponível</h1>
                </td>
                <td align="right" style="font-family: monospace; font-size: 13px; color: #a3a3a3;">
                  #${params.invoiceNumber}
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding: 30px;">
            <p style="color: #d4d4d4; font-size: 14px; margin: 0 0 20px 0;">Olá, <strong>${params.clientName}</strong>.</p>
            <p style="color: #a3a3a3; font-size: 13px; margin: 0 0 24px 0; line-height: 1.5;">Uma nova fatura foi emitida para o seu ambiente. Confira os detalhes e escolha liquidar via Pix ou Cartão de Crédito.</p>
            
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
              <thead>
                <tr>
                  <th align="left" style="padding-bottom: 8px; color: #737373; font-size: 11px; font-family: monospace; text-transform: uppercase;">Serviço / Descrição</th>
                  <th align="right" style="padding-bottom: 8px; color: #737373; font-size: 11px; font-family: monospace; text-transform: uppercase;">Valor</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
                <tr>
                  <td style="padding: 16px 0; color: #ffffff; font-size: 15px; font-weight: bold;">Total Consolidado</td>
                  <td align="right" style="padding: 16px 0; color: #3b82f6; font-size: 20px; font-family: monospace; font-weight: bold;">R$ ${params.totalAmount.toFixed(2).replace(".", ",")}</td>
                </tr>
              </tbody>
            </table>

            <div style="background-color: #1c1c1f; border: 1px solid #2e2e33; padding: 14px 18px; border-radius: 4px; margin-bottom: 28px;">
              <span style="color: #a3a3a3; font-size: 12px; display: block; font-family: monospace;">Vencimento: <strong style="color: #ffffff;">${params.dueDate}</strong></span>
            </div>

            <div style="text-align: center; margin-bottom: 30px;">
              <a href="${params.paymentUrl}" target="_blank" style="background-color: #002bba; color: #ffffff; padding: 14px 32px; font-family: monospace; font-size: 14px; font-weight: bold; text-decoration: none; border-radius: 3px; display: inline-block; text-transform: uppercase; letter-spacing: 1px;">
                Pagar com Cartão ou Pix →
              </a>
            </div>

            ${
              params.pixCopyPaste
                ? `
            <div style="border-top: 1px dashed #262626; padding-top: 20px;">
              <span style="color: #737373; font-size: 11px; font-family: monospace; text-transform: uppercase; display: block; margin-bottom: 6px;">Código Pix Copia e Cola:</span>
              <div style="background-color: #0f0f0f; border: 1px solid #262626; padding: 10px; font-family: monospace; font-size: 11px; color: #a3a3a3; word-break: break-all;">
                ${params.pixCopyPaste}
              </div>
            </div>`
                : ""
            }
          </td>
        </tr>
        <tr>
          <td style="padding: 20px 30px; background-color: #0f0f0f; border-top: 1px solid #262626; text-align: center;">
            <p style="color: #525252; font-size: 11px; margin: 0; font-family: monospace;">MindSite Agência Digital — CNPJ 19.725.535/0001-58<br />São Paulo / SP — contato@mindsite.com.br</p>
          </td>
        </tr>
      </table>
    </body>
  </html>`;
}
