export interface TicketNotificationEmailProps {
  clientName: string;
  ticketNumber: number;
  ticketTitle: string;
  category: "BASIC" | "INTERMEDIATE" | "ADVANCED";
  slaHours: number;
  slaDueAt: string;
  description: string;
  projectName: string;
  portalUrl?: string;
}

export function renderTicketNotificationEmailHtml(params: TicketNotificationEmailProps): string {
  const portalLink = params.portalUrl || "https://mindsite.com.br/portal";

  const categoryLabels = {
    BASIC: "BÁSICO (SLA: 24h)",
    INTERMEDIATE: "INTERMEDIÁRIO (SLA: 72h)",
    ADVANCED: "AVANÇADO (SLA: 7 dias / 168h)",
  };

  const safeCategory = categoryLabels[params.category] || params.category;
  const safeDescription = params.description.replace(/\n/g, "<br />");

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Novo Chamado Aberto — MindSite</title>
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
                [ CHAMADO REGISTRADO ]
              </span>
              <div style="font-family: 'JetBrains Mono', Consolas, monospace; font-size: 11px; color: #6b7280; margin-top: 5px; font-weight: 600;">
                TICKET #${params.ticketNumber}
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
          Abertura de Chamado Técnico
        </h1>
        <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #4b5563;">
          Olá, <strong style="color: #0f0f0f;">${params.clientName}</strong>. A equipe técnica da <strong>MindSite</strong> registrou um novo chamado de manutenção/ajuste para o seu projeto <strong style="color: #0f0f0f;">${params.projectName}</strong>. Acompanhe a demanda e o prazo de entrega diretamente pela sua Área Logada.
        </p>
      </td>
    </tr>

    <!-- Detalhes do Chamado -->
    <tr>
      <td style="padding: 0 32px 28px 32px; background-color: #ffffff;">
        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="border: 1px solid #eeeae8; border-radius: 4px; overflow: hidden; background-color: #fdfcfb; margin-bottom: 24px;">
          <tr>
            <td style="padding: 14px 16px; border-bottom: 1px solid #eeeae8; width: 35%; font-family: 'JetBrains Mono', Consolas, monospace; font-size: 11px; font-weight: 700; text-transform: uppercase; color: #6b7280;">
              Título da Demanda:
            </td>
            <td style="padding: 14px 16px; border-bottom: 1px solid #eeeae8; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 14px; font-weight: 700; color: #0f0f0f;">
              ${params.ticketTitle}
            </td>
          </tr>
          <tr>
            <td style="padding: 14px 16px; border-bottom: 1px solid #eeeae8; font-family: 'JetBrains Mono', Consolas, monospace; font-size: 11px; font-weight: 700; text-transform: uppercase; color: #6b7280;">
              Complexidade / SLA:
            </td>
            <td style="padding: 14px 16px; border-bottom: 1px solid #eeeae8; font-family: 'JetBrains Mono', Consolas, monospace; font-size: 13px; font-weight: 700; color: #002bba;">
              ${safeCategory}
            </td>
          </tr>
          <tr>
            <td style="padding: 14px 16px; border-bottom: 1px solid #eeeae8; font-family: 'JetBrains Mono', Consolas, monospace; font-size: 11px; font-weight: 700; text-transform: uppercase; color: #6b7280;">
              Prazo Estimado de SLA:
            </td>
            <td style="padding: 14px 16px; border-bottom: 1px solid #eeeae8; font-family: 'JetBrains Mono', Consolas, monospace; font-size: 13px; font-weight: 700; color: #dc2626;">
              ${params.slaDueAt} (${params.slaHours}h úteis)
            </td>
          </tr>
          <tr>
            <td colspan="2" style="padding: 16px; background-color: #f9f7f7;">
              <span style="display: block; font-family: 'JetBrains Mono', Consolas, monospace; font-size: 11px; font-weight: 700; text-transform: uppercase; color: #6b7280; margin-bottom: 8px;">
                Descrição Detalhada do Chamado:
              </span>
              <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 13px; line-height: 1.6; color: #1f2937; background-color: #ffffff; padding: 12px 14px; border: 1px solid #eeeae8; border-radius: 4px;">
                ${safeDescription}
              </div>
            </td>
          </tr>
        </table>

        <!-- Botão Principal de Acesso ao Portal -->
        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
          <tr>
            <td align="center">
              <a href="${portalLink}" target="_blank" rel="noopener noreferrer" style="display: block; width: 100%; box-sizing: border-box; background-color: #002bba; color: #ffffff; padding: 16px 24px; font-family: 'JetBrains Mono', Consolas, monospace; font-size: 14px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; text-decoration: none; border-radius: 4px; text-align: center; box-shadow: 0 4px 14px rgba(0, 43, 186, 0.25);">
                Acessar Portal do Cliente &nbsp;→
              </a>
            </td>
          </tr>
        </table>

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
                    <a href="${portalLink}" target="_blank" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 13px; font-weight: 600; color: #002bba; text-decoration: underline;">
                      → Acompanhar Chamados no Portal do Cliente
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
                    Dúvidas ou atualizações? Você pode responder e anexar arquivos diretamente neste chamado pela sua Área Logada ou contatar <a href="mailto:contato@mindsite.com.br" style="color: #002bba; font-weight: 600; text-decoration: underline;">contato@mindsite.com.br</a>.
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
