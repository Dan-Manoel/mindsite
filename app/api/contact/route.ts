import { NextResponse } from "next/server";
import { resend } from "@/lib/resend";
import {
  generateContactEmailHtml,
  generateContactEmailText,
} from "@/lib/email-template";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { success: false, message: "Dados do formulário inválidos." },
        { status: 400 },
      );
    }

    const { name, email, phone, company, message, _gotcha } = body;

    // Honeypot spam protection
    if (_gotcha && String(_gotcha).trim().length > 0) {
      // Silently discard spam bots with 200 OK
      return NextResponse.json({
        success: true,
        message: "Mensagem recebida com sucesso.",
      });
    }

    // Validation
    const trimmedName = typeof name === "string" ? name.trim() : "";
    if (trimmedName.length < 2) {
      return NextResponse.json(
        { success: false, message: "Por favor, informe seu nome." },
        { status: 400 },
      );
    }

    const trimmedEmail = typeof email === "string" ? email.trim() : "";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
      return NextResponse.json(
        {
          success: false,
          message: "Por favor, informe um endereço de e-mail válido.",
        },
        { status: 400 },
      );
    }

    const trimmedMessage = typeof message === "string" ? message.trim() : "";
    if (trimmedMessage.length < 5) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Por favor, detalhe algumas informações sobre o seu projeto.",
        },
        { status: 400 },
      );
    }

    const recipient =
      process.env.CONTACT_RECIPIENT_EMAIL ||
      process.env.CONTACT_EMAIL_TO ||
      "ola@mindsite.com.br";

    const fromAddress =
      process.env.CONTACT_EMAIL_FROM || "Mindsite <onboarding@resend.dev>";

    const contactData = {
      name: trimmedName,
      email: trimmedEmail.toLowerCase(),
      phone:
        typeof phone === "string" && phone.trim() ? phone.trim() : undefined,
      company:
        typeof company === "string" && company.trim()
          ? company.trim()
          : undefined,
      message: trimmedMessage,
      submittedAt: new Date(),
      source: "Formulário de Contato / Interesse (mindsite.com.br)",
    };

    const subject = `[Novo Lead] ${contactData.name}${
      contactData.company ? ` - ${contactData.company}` : ""
    }`;

    const html = generateContactEmailHtml(contactData);
    const text = generateContactEmailText(contactData);

    // Send notification to Mindsite inbox
    const { data, error } = await resend.emails.send({
      from: fromAddress,
      to: recipient,
      replyTo: contactData.email,
      subject,
      html,
      text,
    });

    if (error) {
      console.error("[Mindsite /api/contact] Resend Error:", error);
      return NextResponse.json(
        {
          success: false,
          message:
            error.message ||
            "Não foi possível enviar a mensagem no momento. Tente novamente mais tarde.",
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      message:
        "Obrigado pelo seu contato! Recebemos sua mensagem e retornaremos em breve.",
      id: data?.id,
    });
  } catch (error: unknown) {
    console.error("[Mindsite /api/contact] Erro inesperado:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Ocorreu um erro no processamento. Tente novamente.",
      },
      { status: 500 },
    );
  }
}
