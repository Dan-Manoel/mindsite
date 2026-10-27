export function renderWelcomeEmailHtml(params: {
    clientName: string;
    loginUrl: string;
    userEmail: string;
    temporaryPassword?: string;
    projectName: string;
    planName: string;
    planBenefits: string[];
    contractSignUrl?: string;
}) {
    const benefitsList = params.planBenefits
        .map((b) => `<li style="padding: 6px 0; color: #d4d4d4; font-size: 13px;">✓ ${b}</li>`)
        .join("");

    return `
  <!DOCTYPE html>
  <html>
    <head><meta charset="utf-8" /></head>
    <body style="background-color: #0f0f0f; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 40px 15px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #171719; border: 1px solid #313336; border-radius: 4px; overflow: hidden;">
        <tr>
          <td style="padding: 35px 30px; background-color: #0f0f0f; border-bottom: 1px solid #313336;">
            <span style="font-family: monospace; font-size: 11px; letter-spacing: 2px; color: #002bba; font-weight: bold; text-transform: uppercase;">MindSite Agência Digital</span>
            <h1 style="color: #ffffff; font-size: 26px; margin: 8px 0 0 0; font-weight: 700; letter-spacing: -0.5px;">Seu ambiente está ativo!</h1>
          </td>
        </tr>
        <tr>
          <td style="padding: 30px;">
            <p style="color: #ffffff; font-size: 15px; margin: 0 0 16px 0;">Olá, <strong>${params.clientName}</strong>.</p>
            <p style="color: #8e93a1; font-size: 14px; margin: 0 0 24px 0; line-height: 1.6;">
              Seja bem-vindo(a) à <strong>MindSite</strong>. A partir de agora, você tem acesso exclusivo à sua Área Logada, onde poderá acompanhar chamados técnicos com SLA em tempo real, gerenciar faturas e consultar seu projeto <strong>${params.projectName}</strong>.
            </p>

            <!-- Box Credenciais -->
            <div style="background-color: #0f0f0f; border: 1px solid #313336; padding: 20px; border-radius: 4px; margin-bottom: 24px;">
              <span style="color: #8e93a1; font-size: 11px; font-family: monospace; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 12px;">Suas Credenciais de Acesso:</span>
              <div style="font-family: monospace; font-size: 13px; color: #ffffff; margin-bottom: 6px;">
                <strong>URL:</strong> <a href="${params.loginUrl}" style="color: #819ffe; text-decoration: underline;">${params.loginUrl}</a>
              </div>
              <div style="font-family: monospace; font-size: 13px; color: #ffffff; margin-bottom: 6px;">
                <strong>Usuário (E-mail):</strong> ${params.userEmail}
              </div>
              ${params.temporaryPassword
            ? `<div style="font-family: monospace; font-size: 13px; color: #ffffff;">
                      <strong>Senha Provisória:</strong> <code style="background: #1f2124; padding: 2px 6px; border-radius: 3px; color: #819ffe;">${params.temporaryPassword}</code>
                    </div>`
            : ""
        }
              <p style="color: #8e93a1; font-size: 11px; margin: 12px 0 0 0; font-style: italic;">* No primeiro acesso, você poderá alterar sua senha pessoal.</p>
            </div>

            <!-- Box do Plano de Sustentação -->
            <div style="border-left: 3px solid #002bba; padding-left: 16px; margin-bottom: 28px;">
              <h3 style="color: #ffffff; font-size: 14px; margin: 0 0 8px 0; text-transform: uppercase; font-family: monospace;">Plano Contratado: ${params.planName}</h3>
              <ul style="list-style: none; padding: 0; margin: 0;">
                ${benefitsList}
              </ul>
            </div>

            <!-- Ação Contrato / Login -->
            <div style="text-align: center; margin-bottom: 24px;">
              <a href="${params.loginUrl}" target="_blank" style="background-color: #002bba; color: #ffffff; padding: 14px 28px; font-family: monospace; font-size: 13px; font-weight: bold; text-decoration: none; border-radius: 2px; display: inline-block; text-transform: uppercase; letter-spacing: 1px;">
                Acessar Portal do Cliente →
              </a>
            </div>

            ${params.contractSignUrl
            ? `
            <div style="background-color: rgba(0, 43, 186, 0.1); border: 1px solid rgba(0, 43, 186, 0.3); padding: 16px; border-radius: 4px; text-align: center;">
              <span style="color: #819ffe; font-size: 12px; font-weight: bold; display: block; margin-bottom: 8px;">CONTRATO DIGITAL DISPONÍVEL</span>
              <p style="color: #d4d4d4; font-size: 12px; margin: 0 0 12px 0;">Por favor, formalize a assinatura digital do seu termo de prestação de serviços:</p>
              <a href="${params.contractSignUrl}" target="_blank" style="color: #ffffff; font-family: monospace; font-size: 12px; text-decoration: underline; font-weight: bold;">
                Assinar Contrato na Autentique ✍️
              </a>
            </div>`
            : `<p style="color: #8e93a1; font-size: 12px; text-align: center; font-style: italic;">Seu contrato de prestação de serviços está em confecção e será disponibilizado diretamente no seu painel.</p>`
        }
          </td>
        </tr>
        <tr>
          <td style="padding: 20px 30px; background-color: #0f0f0f; border-top: 1px solid #313336; text-align: center;">
            <p style="color: #575960; font-size: 11px; margin: 0; font-family: monospace;">
              MindSite Agência Digital — CNPJ 19.725.535/0001-58<br />
              Dúvidas? Responda a este e-mail ou contate contato@mindsite.com.br
            </p>
          </td>
        </tr>
      </table>
    </body>
  </html>`;
}