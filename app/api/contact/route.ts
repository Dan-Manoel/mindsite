import { NextResponse } from "next/server";
import { Resend } from "resend";

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

    const resend = new Resend(apiKey);
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: true, message: "Campos obrigatórios ausentes." },
        { status: 400 }
      );
    }

    const recipient = process.env.CONTACT_RECIPIENT_EMAIL || "ola@mindsite.com.br";

    const { error } = await resend.emails.send({
      from: "MindSite Leads <contato@mindsite.com.br>",
      to: [recipient],
      replyTo: email,
      subject: `[Lead MindSite] ${name}`,
      text: `Nome: ${name}\nE-mail: ${email}\nMensagem: ${message}`,
    });

    if (error) {
      return NextResponse.json({ error: true, message: error.message }, { status: 400 });
    }

    return NextResponse.json({ error: false, message: "Mensagem enviada com sucesso!" });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Erro interno no servidor.";
    return NextResponse.json({ error: true, message: errorMsg }, { status: 500 });
  }
}