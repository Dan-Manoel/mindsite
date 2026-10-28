import { formatLocalDate } from "@/lib/utils";

export interface NewProjectInstallmentItem {
  installmentNumber: number;
  scheduledDate: string;
  amount: number;
  description?: string | null;
}

export interface NewProjectEmailProps {
  clientName: string;
  projectName: string;
  domain?: string | null;
  description?: string | null;
  setupAmount: number;
  installments: NewProjectInstallmentItem[];
  sustainabilityPlan: string;
  sustainabilityAmount?: number;
  sustainabilityStartDate?: string | null;
  portalUrl?: string;
}

export function renderNewProjectNotificationEmailHtml(params: NewProjectEmailProps): string {
  const portalUrl = params.portalUrl || "https://mindsite.com.br/portal";

  // Montagem da tabela de parcelas de implantação
  const installmentsHtml =
    params.installments && params.installments.length > 0
      ? params.installments
        .map((inst) => {
          const dateStr = formatLocalDate(inst.scheduledDate);
          const desc = inst.description || `Parcela 0${inst.installmentNumber}`;
          return `
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid #e5e5e5; font-family: 'Manrope', -apple-system, BlinkMacSystemFont, sans-serif; font-size: 13px; color: #1f2937;">
                <strong>#${inst.installmentNumber}</strong> — ${desc}
              </td>
              <td align="center" style="padding: 12px 16px; border-bottom: 1px solid #e5e5e5; font-family: 'JetBrains Mono', Consolas, monospace; font-size: 13px; color: #4b5563;">
                ${dateStr}
              </td>
              <td align="right" style="padding: 12px 16px; border-bottom: 1px solid #e5e5e5; font-family: 'JetBrains Mono', Consolas, monospace; font-size: 13px; font-weight: 700; color: #0f0f0f; white-space: nowrap;">
                R$ ${Number(inst.amount).toFixed(2).replace(".", ",")}
              </td>
            </tr>`;
        })
        .join("")
      : `
        <tr>
          <td colspan="3" style="padding: 14px 16px; text-align: center; color: #6b7280; font-size: 13px;">
            Condição comercial negociada à vista ou sob demanda.
          </td>
        </tr>`;

  // Detalhes do Plano de Sustentação
  let sustPlanLabel = "Não Contratado";
  if (params.sustainabilityPlan === "ESSENTIAL") sustPlanLabel = "Plano Essential";
  else if (params.sustainabilityPlan === "DEVELOPMENT") sustPlanLabel = "Plano Development";
  else if (params.sustainabilityPlan === "ADVANCED") sustPlanLabel = "Plano Advanced";
  else if (params.sustainabilityPlan === "CUSTOM") sustPlanLabel = "Plano Customizado";
  else if (params.sustainabilityPlan && params.sustainabilityPlan !== "NONE") sustPlanLabel = params.sustainabilityPlan;

  const sustAmountFormatted =
    params.sustainabilityAmount && params.sustainabilityAmount > 0
      ? `R$ ${Number(params.sustainabilityAmount).toFixed(2).replace(".", ",")}/mês`
      : params.sustainabilityPlan === "DEVELOPMENT"
        ? "R$ 300,00/mês"
        : params.sustainabilityPlan === "ADVANCED"
          ? "R$ 700,00/mês"
          : params.sustainabilityPlan === "ESSENTIAL"
            ? "R$ 100,00/mês"
            : "Incluso / Sob Demanda";

  const sustStartDateFormatted = params.sustainabilityStartDate
    ? formatLocalDate(params.sustainabilityStartDate)
    : "Imediatamente após a entrega do projeto";

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Novo Projeto Cadastrado — MindSite</title>
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
<body style="margin: 0; padding: 40px 16px; background-color: #eeeae8; font-family: 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; color: #0f0f0f;">
  <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 620px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e5e5e5; border-radius: 6px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06); overflow: hidden;">
    
    <!-- Header Institucional com Fundo Claro e Badge -->
    <tr>
      <td style="padding: 24px 32px; background-color: #f9f7f7; border-bottom: 2px solid #e5e5e5;">
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
              <span style="display: inline-block; font-family: 'JetBrains Mono', monospace, sans-serif; font-size: 11px; font-weight: 700; color: #002bba; background-color: rgba(0, 43, 186, 0.08); border: 1px solid rgba(0, 43, 186, 0.25); padding: 6px 12px; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.05em; white-space: nowrap;">
                NOVO PROJETO CADASTRADO
              </span>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Saudação e Destaque do Projeto -->
    <tr>
      <td style="padding: 32px 32px 20px 32px; background-color: #ffffff;">
        <h1 style="margin: 0 0 12px 0; font-family: 'Manrope', -apple-system, BlinkMacSystemFont, sans-serif; font-size: 22px; line-height: 1.3; font-weight: 800; color: #0f0f0f;">
          Novo Projeto Oficializado no Ecossistema MindSite
        </h1>
        <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #4b5563;">
          Olá, <strong style="color: #0f0f0f;">${params.clientName}</strong>. Registramos oficialmente o seu novo projeto em nossa infraestrutura SaaS. Abaixo estão discriminados o escopo acordado, a estrutura de parcelamento do setup e as diretrizes do plano de sustentação técnica contratado.
        </p>
      </td>
    </tr>

    <!-- Card com Detalhes do Projeto -->
    <tr>
      <td style="padding: 0 32px 24px 32px; background-color: #ffffff;">
        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: #f9f7f7; border: 1px solid #e5e5e5; border-radius: 6px; padding: 18px 20px;">
          <tr>
            <td>
              <div style="font-family: 'JetBrains Mono', Consolas, monospace; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #002bba; margin-bottom: 6px;">
                IDENTIFICAÇÃO DO PROJETO
              </div>
              <div style="font-family: 'Manrope', sans-serif; font-size: 18px; font-weight: 800; color: #0f0f0f; margin-bottom: 4px;">
                ${params.projectName}
              </div>
              ${params.domain
      ? `<div style="font-family: 'JetBrains Mono', Consolas, monospace; font-size: 12px; color: #6b7280; margin-bottom: 12px;">
                      Domínio Oficial: <a href="https://${params.domain.replace(/^https?:\/\//, "")}" target="_blank" style="color: #002bba; text-decoration: none; font-weight: 600;">${params.domain}</a>
                    </div>`
      : ""
    }
              ${params.description
      ? `<div style="font-size: 13px; line-height: 1.5; color: #4b5563; border-top: 1px solid #e5e5e5; padding-top: 12px; margin-top: 8px;">
                      <strong style="color: #0f0f0f;">Escopo & Entregas:</strong> ${params.description}
                    </div>`
      : ""
    }
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Condições de Setup & Cronograma de Parcelas -->
    <tr>
      <td style="padding: 0 32px 24px 32px; background-color: #ffffff;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 12px;">
          <h2 style="margin: 0; font-family: 'Manrope', sans-serif; font-size: 15px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; color: #0f0f0f;">
            Condições Comerciais de Setup & Implantação
          </h2>
          <span style="font-family: 'JetBrains Mono', monospace; font-size: 14px; font-weight: 700; color: #002bba;">
            Total: R$ ${Number(params.setupAmount).toFixed(2).replace(".", ",")}
          </span>
        </div>

        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="border: 1px solid #e5e5e5; border-radius: 4px; overflow: hidden; background-color: #ffffff;">
          <thead>
            <tr style="background-color: #f4f1f0;">
              <th align="left" style="padding: 10px 16px; border-bottom: 1px solid #e5e5e5; font-family: 'JetBrains Mono', Consolas, monospace; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #4b5563;">
                PARCELA / DISCRIMINAÇÃO
              </th>
              <th align="center" style="padding: 10px 16px; border-bottom: 1px solid #e5e5e5; font-family: 'JetBrains Mono', Consolas, monospace; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #4b5563;">
                VENCIMENTO
              </th>
              <th align="right" style="padding: 10px 16px; border-bottom: 1px solid #e5e5e5; font-family: 'JetBrains Mono', Consolas, monospace; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #4b5563;">
                VALOR
              </th>
            </tr>
          </thead>
          <tbody>
            ${installmentsHtml}
          </tbody>
        </table>
      </td>
    </tr>

    <!-- Plano de Sustentação Contratado -->
    <tr>
      <td style="padding: 0 32px 28px 32px; background-color: #ffffff;">
        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="border: 1px solid #e5e5e5; border-radius: 6px; background-color: #f9f7f7; padding: 18px 20px;">
          <tr>
            <td>
              <div style="font-family: 'JetBrains Mono', Consolas, monospace; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #002bba; margin-bottom: 6px;">
                PLANO DE SUSTENTAÇÃO & EVOLUÇÃO CONTÍNUA
              </div>
              <div style="font-family: 'Manrope', sans-serif; font-size: 16px; font-weight: 800; color: #0f0f0f; margin-bottom: 6px;">
                ${sustPlanLabel} — <span style="color: #002bba;">${sustAmountFormatted}</span>
              </div>
              <div style="font-size: 12px; color: #4b5563; line-height: 1.5;">
                <strong>Início da Vigência Mensal:</strong> ${sustStartDateFormatted}
              </div>
              <div style="font-size: 12px; color: #6b7280; line-height: 1.5; margin-top: 4px;">
                Inclui monitoramento de integridade, atualizações de segurança de dependências, backups em nuvem e suporte técnico prioritário através de abertura de chamados no portal.
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Botão de Ação CTA -->
    <tr>
      <td align="center" style="padding: 0 32px 36px 32px; background-color: #ffffff;">
        <a href="${portalUrl}" target="_blank" style="display: inline-block; width: 100%; box-sizing: border-box; background-color: #002bba; color: #ffffff; text-align: center; padding: 16px 24px; font-family: 'Manrope', -apple-system, sans-serif; font-size: 14px; font-weight: 800; letter-spacing: 0.04em; text-transform: uppercase; text-decoration: none; border-radius: 4px; box-shadow: 0 4px 12px rgba(0, 43, 186, 0.25);">
          ACESSAR ÁREA DO CLIENTE →
        </a>
      </td>
    </tr>

    <!-- Rodapé Corporativo -->
    <tr>
      <td style="padding: 24px 32px; background-color: #f9f7f7; border-top: 1px solid #e5e5e5; font-size: 12px; line-height: 1.6; color: #6b7280;">
        <table width="100%" border="0" cellpadding="0" cellspacing="0">
          <tr>
            <td align="left">
              <strong style="color: #0f0f0f;">MindSite Agência Digital</strong><br />
              Tecnologia, Design & Infraestrutura em Alta Performance.<br />
              Dúvidas ou alinhamentos de escopo: <a href="mailto:contato@mindsite.com.br" style="color: #002bba; text-decoration: none; font-weight: 600;">contato@mindsite.com.br</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>

  </table>
</body>
</html>`;
}
