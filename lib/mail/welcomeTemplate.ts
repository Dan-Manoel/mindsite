export interface WelcomeEmailProps {
  clientName: string;
  loginUrl: string;
  userEmail: string;
  temporaryPassword?: string;
  projectName: string;
  planName: string;
  planBenefits: string[];
  contractSignUrl?: string;
}

export function renderWelcomeEmailHtml(params: WelcomeEmailProps): string {
  const benefitsList = params.planBenefits
    .map(
      (benefit) => `
      <tr>
        <td style="padding: 6px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 13px; line-height: 1.5; color: #a1a1aa;">
          <span style="color: #002bba; font-family: 'JetBrains Mono', monospace; font-weight: 700; margin-right: 8px;">✓</span>
          ${benefit}
        </td>
      </tr>`
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Acesso à sua Infraestrutura — MindSite</title>
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
<body style="margin: 0; padding: 48px 16px; background-color: #0a0a0c; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #111114; border: 1px solid #222227; border-radius: 2px;">
    
    <!-- Topbar / Header Responsivo -->
    <tr>
      <td style="padding: 24px 32px; border-bottom: 1px solid #1f1f24;">
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
              <span style="display: inline-block; font-family: 'JetBrains Mono', monospace, sans-serif; font-size: 11px; font-weight: 700; color: #819ffe; background-color: rgba(0, 43, 186, 0.2); border: 1px solid rgba(129, 159, 254, 0.35); padding: 6px 12px; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.05em; white-space: nowrap;">
                AMBIENTE ATIVADO
              </span>
              <div style="font-family: 'JetBrains Mono', monospace, sans-serif; font-size: 11px; color: #71717a; margin-top: 6px; letter-spacing: 0.02em;">
                MINDSITE // SAAS
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Headline Hero -->
    <tr>
      <td style="padding: 40px 32px 28px 32px;">
        <h1 style="margin: 0 0 16px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 28px; line-height: 1.15; font-weight: 700; letter-spacing: -0.03em; color: #ffffff;">
          Sua infraestrutura digital está pronta para operar.
        </h1>
        <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #a1a1aa;">
          Olá, <strong style="color: #ffffff;">${params.clientName}</strong>. Criamos seu ambiente dedicado para acompanhamento de chamados técnicos, métricas de SLA e gestão do projeto <strong style="color: #ffffff;">${params.projectName}</strong>.
        </p>
      </td>
    </tr>

    <!-- Box de Credenciais (Terminal Style) -->
    <tr>
      <td style="padding: 0 32px 32px 32px;">
        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: #070709; border: 1px solid #222227; border-left: 3px solid #002bba;">
          <tr>
            <td style="padding: 20px;">
              <span style="display: block; font-family: 'JetBrains Mono', monospace, Consolas; font-size: 10px; letter-spacing: 0.15em; text-transform: uppercase; color: #71717a; margin-bottom: 14px;">
                // Credenciais de Autenticação
              </span>
              <table width="100%" border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding: 4px 0; font-family: 'JetBrains Mono', monospace, Consolas; font-size: 12px; color: #71717a; width: 85px;">PORTAL:</td>
                  <td style="padding: 4px 0; font-family: 'JetBrains Mono', monospace, Consolas; font-size: 12px; color: #e4e4e7;">
                    <a href="${params.loginUrl}" target="_blank" style="color: #3b82f6; text-decoration: none;">${params.loginUrl}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 4px 0; font-family: 'JetBrains Mono', monospace, Consolas; font-size: 12px; color: #71717a;">LOGIN:</td>
                  <td style="padding: 4px 0; font-family: 'JetBrains Mono', monospace, Consolas; font-size: 12px; color: #ffffff; font-weight: 600;">${params.userEmail}</td>
                </tr>
                ${
                  params.temporaryPassword
                    ? `
                <tr>
                  <td style="padding: 4px 0; font-family: 'JetBrains Mono', monospace, Consolas; font-size: 12px; color: #71717a;">CHAVE PROV:</td>
                  <td style="padding: 4px 0;">
                    <code style="font-family: 'JetBrains Mono', monospace, Consolas; font-size: 12px; background-color: #18181b; padding: 2px 6px; border: 1px solid #27272a; color: #60a5fa; border-radius: 2px;">${params.temporaryPassword}</code>
                  </td>
                </tr>`
                    : ""
                }
              </table>
              <span style="display: block; font-size: 11px; color: #71717a; margin-top: 14px; font-style: italic;">
                * No primeiro acesso, será solicitada a criação da sua senha definitiva.
              </span>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Detalhes do Plano Contratado -->
    <tr>
      <td style="padding: 0 32px 36px 32px;">
        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="border-top: 1px solid #1f1f24; padding-top: 24px;">
          <tr>
            <td>
              <span style="display: block; font-family: 'JetBrains Mono', monospace, Consolas; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: #e4e4e7; font-weight: 700; margin-bottom: 12px;">
                PLANO CONTRATADO: <span style="color: #002bba;">${params.planName}</span>
              </span>
              <table width="100%" border="0" cellpadding="0" cellspacing="0">
                ${benefitsList}
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- CTA Principal -->
    <tr>
      <td style="padding: 0 32px 36px 32px; text-align: center;">
        <table border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto; width: 100%;">
          <tr>
            <td align="center">
              <a href="${params.loginUrl}" target="_blank" style="display: block; width: 100%; box-sizing: border-box; background-color: #002bba; color: #ffffff; padding: 16px 24px; font-family: 'JetBrains Mono', monospace, Consolas; font-size: 13px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; text-decoration: none; border-radius: 2px; text-align: center;">
                Acessar Portal do Cliente &nbsp;→
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Bloco de Contrato Autentique (se houver) -->
    ${
      params.contractSignUrl
        ? `
    <tr>
      <td style="padding: 0 32px 36px 32px;">
        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: #0d1117; border: 1px solid #1e293b; padding: 18px 20px;">
          <tr>
            <td>
              <span style="display: block; font-family: 'JetBrains Mono', monospace, Consolas; font-size: 11px; font-weight: 700; text-transform: uppercase; color: #38bdf8; letter-spacing: 0.05em; margin-bottom: 6px;">
                Formalização Contratual
              </span>
              <p style="margin: 0 0 12px 0; font-size: 13px; line-height: 1.5; color: #94a3b8;">
                O termo de prestação de serviços e SLA está disponível para coleta da sua assinatura digital via Autentique.
              </p>
              <a href="${params.contractSignUrl}" target="_blank" style="font-family: 'JetBrains Mono', monospace, Consolas; font-size: 12px; font-weight: 700; color: #ffffff; text-decoration: underline;">
                Assinar Documento Digital →
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>`
        : `
    <tr>
      <td style="padding: 0 32px 32px 32px; text-align: center;">
        <span style="font-size: 12px; color: #71717a; font-style: italic;">
          O contrato de prestação de serviços será anexado à sua Área Logada após a homologação inicial.
        </span>
      </td>
    </tr>`
    }

    <!-- Footer Corporativo -->
    <tr>
      <td style="padding: 28px 32px; background-color: #070709; border-top: 1px solid #1f1f24; text-align: center;">
        <p style="margin: 0 0 6px 0; font-family: 'JetBrains Mono', monospace, Consolas; font-size: 11px; color: #52525b; text-transform: uppercase; letter-spacing: 0.05em;">
          MindSite Agência Digital — CNPJ 19.725.535/0001-58
        </p>
        <p style="margin: 0; font-family: 'JetBrains Mono', monospace, Consolas; font-size: 11px; color: #3f3f46;">
          Dúvidas operacionais? Responda a este e-mail ou utilize <a href="mailto:contato@mindsite.com.br" style="color: #71717a; text-decoration: underline;">contato@mindsite.com.br</a>
        </p>
      </td>
    </tr>

  </table>
</body>
</html>
`;
}
