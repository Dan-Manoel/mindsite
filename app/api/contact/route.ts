import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactLeadSchema } from "@/app/actions/contact";
import { renderLeadEmailHtml } from "@/lib/mail/leadTemplate";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      console.error("[Resend API Error]: RESEND_API_KEY is missing in runtime environment variables.");
      return NextResponse.json(
        { error: true, message: "Serviço de mensageria temporariamente indisponível no servidor." },
        { status: 500 }
      );
    }

    const body = await req.json().catch(() => ({}));

    // Validação estrita via Zod
    const validation = contactLeadSchema.safeParse(body);
    if (!validation.success) {
      const firstIssue = validation.error.issues[0];
      return NextResponse.json(
        { error: true, message: firstIssue ? firstIssue.message : "Campos inválidos." },
        { status: 400 }
      );
    }

    const { name, company, email, phone, message, _gotcha } = validation.data;

    // Proteção honeypot
    if (_gotcha && _gotcha.trim().length > 0) {
      return NextResponse.json({
        error: false,
        message: "Obrigado pela sua mensagem! Entraremos em contato o mais breve possível.",
      });
    }

    const resend = new Resend(apiKey);
    const recipient = process.env.CONTACT_RECIPIENT_EMAIL || "contato@mindsite.com.br";
    const fromSender = process.env.CONTACT_EMAIL_FROM || "MindSite - Vitrine <no-reply@mindsite.com.br>";
    const companyLabel = company && company.length > 0 ? company : "Sem Empresa";

    const html = renderLeadEmailHtml({
      name,
      company,
      email,
      phone,
      message,
      submittedAt: new Date(),
    });

    const { data, error } = await resend.emails.send({
      from: fromSender,
      to: [recipient],
      replyTo: email,
      subject: `Novo Lead Capturado: ${name} (${companyLabel})`,
      html,
    });

    if (error) {
      console.error("[Resend API Error]:", error);
      return NextResponse.json({ error: true, message: error.message }, { status: 400 });
    }

    return NextResponse.json({
      error: false,
      message: "Obrigado pela sua mensagem! Entraremos em contato o mais breve possível.",
      id: data?.id,
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Erro interno no servidor.";
    return NextResponse.json({ error: true, message: errorMsg }, { status: 500 });
  }
}