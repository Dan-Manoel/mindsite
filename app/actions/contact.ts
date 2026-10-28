"use server";

import { Resend } from "resend";
import { renderLeadEmailHtml } from "@/lib/mail/leadTemplate";
import {
  contactLeadSchema,
  type ContactLeadInput,
  type ContactActionResult,
} from "./contact.schema";

/**
 * Server Action para validação e disparo de e-mails para novos leads capturados via Resend.
 * Em conformidade estrita com o Next.js App Router ("use server" exporta apenas funções assíncronas).
 */
export async function sendContactLead(
  input: ContactLeadInput | FormData
): Promise<ContactActionResult> {
  try {
    // 1. Extração dos dados caso input seja FormData ou Objeto
    let rawData: Record<string, unknown>;

    if (input instanceof FormData) {
      rawData = {
        name: input.get("name"),
        company: input.get("company"),
        email: input.get("email"),
        phone: input.get("phone"),
        message: input.get("message"),
        _gotcha: input.get("_gotcha"),
      };
    } else {
      rawData = input;
    }

    // 2. Validação estrita via Zod
    const validation = contactLeadSchema.safeParse(rawData);
    if (!validation.success) {
      const firstIssue = validation.error.issues[0];
      const errorMessage = firstIssue ? firstIssue.message : "Por favor, verifique os campos preenchidos.";
      return {
        error: true,
        message: errorMessage,
      };
    }

    const { name, company, email, phone, message, _gotcha } = validation.data;

    // 3. Proteção Honeypot contra robôs de spam
    if (_gotcha && _gotcha.trim().length > 0) {
      console.warn("[Spam Protection] Submissão bloqueada pelo campo honeypot.");
      return {
        error: false,
        message: "Obrigado pela sua mensagem! Entraremos em contato o mais breve possível.",
      };
    }

    // 4. Verificação da API Key do Resend
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("❌ [Resend Action Error]: RESEND_API_KEY não configurada nas variáveis de ambiente.");
      return {
        error: true,
        message: "O serviço de e-mail está temporariamente indisponível no servidor. Entre em contato diretamente por contato@mindsite.com.br.",
      };
    }

    const resend = new Resend(apiKey);

    // 5. Definição dos parâmetros do e-mail
    const fromSender =
      process.env.CONTACT_EMAIL_FROM || "Mindsite <no-reply@mindsite.com.br>";
    const recipient = process.env.CONTACT_RECIPIENT_EMAIL || "contato@mindsite.com.br";
    const companyLabel = company && company.length > 0 ? company : "Sem Empresa";
    const subject = `Novo Lead Capturado: ${name} (${companyLabel})`;

    // 6. Geração do HTML com o template institucional MindSite
    const html = renderLeadEmailHtml({
      name,
      company,
      email,
      phone,
      message,
      submittedAt: new Date(),
    });

    // 7. Disparo seguro via Resend SDK
    const { data: resendData, error: resendError } = await resend.emails.send({
      from: fromSender,
      to: [recipient],
      replyTo: email,
      subject,
      html,
    });

    if (resendError) {
      console.error("❌ [Resend Dispatch Error]:", resendError);
      return {
        error: true,
        message: "Ocorreu um erro ao despachar o e-mail pelo servidor. Por favor, tente novamente.",
      };
    }

    console.log(`✅ [Lead Capturado com Sucesso] ID do e-mail: ${resendData?.id} | Lead: ${name} <${email}>`);

    return {
      error: false,
      message: "Obrigado pela sua mensagem! Entraremos em contato o mais breve possível.",
    };
  } catch (err: unknown) {
    const errorMsg =
      err instanceof Error ? err.message : "Erro inesperado ao processar o formulário.";
    console.error("❌ [Server Action Exception]:", err);
    return {
      error: true,
      message: errorMsg,
    };
  }
}
