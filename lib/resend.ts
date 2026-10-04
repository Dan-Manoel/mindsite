import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;

if (!apiKey && process.env.NODE_ENV !== "production") {
  console.warn(
    "[Mindsite] AVISO: RESEND_API_KEY não configurada no ambiente. Verifique o arquivo .env.local",
  );
}

export const resend = new Resend(apiKey || "");
