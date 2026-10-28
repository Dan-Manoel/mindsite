import { NextRequest, NextResponse } from "next/server";
import { renderLeadEmailHtml } from "@/src/lib/mail/leadTemplate";
import { renderWelcomeEmailHtml } from "@/src/lib/mail/welcomeTemplate";
import { renderInvoiceEmailHtml } from "@/src/lib/mail/invoiceTemplate";
import { renderInvoiceReminderEmailHtml } from "@/src/lib/mail/invoiceReminderTemplate";
import { renderAdminInvoiceOverdueEmailHtml } from "@/src/lib/mail/adminInvoiceOverdueTemplate";
import { renderTicketNotificationEmailHtml } from "@/src/lib/mail/ticketNotificationTemplate";

export async function GET(req: NextRequest) {
  // Bloqueio de segurança em produção (exceto com chave de dev)
  const isDev = process.env.NODE_ENV === "development";
  const authKey = req.nextUrl.searchParams.get("key");
  if (!isDev && authKey !== process.env.CRON_SECRET) {
    return new NextResponse("Acesso não autorizado.", { status: 403 });
  }

  const template = req.nextUrl.searchParams.get("template") || "catalog";

  switch (template) {
    case "lead":
      return new NextResponse(
        renderLeadEmailHtml({
          name: "Danilo Oliveira",
          company: "MindSite Corp",
          email: "moliveiradanilo@gmail.com",
          phone: "+55 11 94767-5814",
          message: "Precisamos de uma plataforma SaaS com Next.js 16 e automação bancária.",
          submittedAt: new Date(),
        }),
        { headers: { "Content-Type": "text/html; charset=utf-8" } }
      );

    case "welcome":
      return new NextResponse(
        renderWelcomeEmailHtml({
          clientName: "Danilo Manoel Soares de Oliveira",
          loginUrl: "https://mindsite.com.br/login",
          userEmail: "cliente@empresa.com.br",
          temporaryPassword: "Mnd@Sec2026!#",
          projectName: "Portal SaaS de Pagamentos",
          planName: "Development",
          planBenefits: [
            "Hospedagem de alta performance em Nuvem",
            "15 caixas de e-mail corporativo Titan",
            "Até 15 chamados técnicos com SLA prioritário",
            "Backups contínuos e monitoramento de segurança",
          ],
          contractSignUrl: "https://autentique.com.br/sign/mock-token",
        }),
        { headers: { "Content-Type": "text/html; charset=utf-8" } }
      );

    case "invoice-nova":
      return new NextResponse(
        renderInvoiceEmailHtml({
          clientName: "Danilo Oliveira",
          invoiceNumber: "INV-998704",
          totalAmount: 1500.0,
          dueDate: "05/11/2026",
          items: [
            { description: "Sustentação Mensal - Plano Development (Nov/2026)", amount: 300.0 },
            { description: "Parcela 02/03 - Implantação de Plataforma", amount: 1200.0 },
          ],
          paymentUrl: "https://infinitepay.io/pay/mock-link",
          pixCopyPaste: "00020126580014br.gov.bcb.pix0136123e4567-e89b-12d3-a456-42661417400052040000",
        }),
        { headers: { "Content-Type": "text/html; charset=utf-8" } }
      );

    case "reminder-5d":
      return new NextResponse(
        renderInvoiceReminderEmailHtml({
          stage: "UPCOMING_5D",
          clientName: "Danilo Oliveira",
          invoiceNumber: "INV-998704",
          totalAmount: 1500.0,
          dueDate: "05/11/2026",
          items: [{ description: "Sustentação Mensal - Plano Development", amount: 300.0 }],
          paymentUrl: "https://infinitepay.io/pay/mock-link",
        }),
        { headers: { "Content-Type": "text/html; charset=utf-8" } }
      );

    case "reminder-today":
      return new NextResponse(
        renderInvoiceReminderEmailHtml({
          stage: "DUE_TODAY",
          clientName: "Danilo Oliveira",
          invoiceNumber: "INV-998704",
          totalAmount: 1500.0,
          dueDate: "28/10/2026",
          items: [{ description: "Sustentação Mensal - Plano Development", amount: 300.0 }],
          paymentUrl: "https://infinitepay.io/pay/mock-link",
        }),
        { headers: { "Content-Type": "text/html; charset=utf-8" } }
      );

    case "reminder-overdue":
      return new NextResponse(
        renderInvoiceReminderEmailHtml({
          stage: "OVERDUE_1D",
          clientName: "Danilo Oliveira",
          invoiceNumber: "INV-998704",
          totalAmount: 1500.0,
          dueDate: "27/10/2026",
          items: [{ description: "Sustentação Mensal - Plano Development", amount: 300.0 }],
          paymentUrl: "https://infinitepay.io/pay/mock-link",
        }),
        { headers: { "Content-Type": "text/html; charset=utf-8" } }
      );

    case "admin-overdue":
      return new NextResponse(
        renderAdminInvoiceOverdueEmailHtml({
          clientName: "Danilo Manoel Soares de Oliveira",
          document: "19.725.535/0001-58",
          projectName: "Portal SaaS de Pagamentos",
          invoiceNumber: "INV-998704",
          amount: 1500.0,
          dueDate: "27/10/2026",
          daysOverdue: 1,
          clientEmail: "moliveiradanilo@gmail.com",
          clientPhone: "+5511947675814",
        }),
        { headers: { "Content-Type": "text/html; charset=utf-8" } }
      );

    case "ticket-notify":
      return new NextResponse(
        renderTicketNotificationEmailHtml({
          type: "AGUARDANDO_CLIENTE",
          clientName: "Danilo Oliveira",
          ticketNumber: 4,
          ticketTitle: "Ajuste na integração de checkout",
          messageSnippet: "Realizamos a atualização do endpoint da InfinitePay. Por favor, valide o fluxo de liquidação no painel.",
          actionUrl: "https://mindsite.com.br/portal/chamados",
        }),
        { headers: { "Content-Type": "text/html; charset=utf-8" } }
      );

    default:
      // Catálogo com links diretos para cada template
      return new NextResponse(
        `<!DOCTYPE html>
        <html lang="pt-BR">
        <head>
          <meta charset="utf-8">
          <title>MindSite Mail Previews</title>
          <style>
            body { font-family: -apple-system, monospace; background: #0a0a0c; color: #fff; padding: 40px; }
            h1 { color: #002bba; font-size: 24px; }
            ul { list-style: none; padding: 0; }
            li { margin: 12px 0; }
            a { color: #819ffe; text-decoration: none; font-size: 16px; border: 1px solid #1f1f24; padding: 8px 16px; display: inline-block; background: #111114; }
            a:hover { background: #002bba; color: #fff; }
          </style>
        </head>
        <body>
          <h1>[ MINDSITE // CATÁLOGO DE TEMPLATES TRANSACIONAIS ]</h1>
          <ul>
            <li><a href="?template=lead" target="_blank">1. Lead Capturado (Tema Dark)</a></li>
            <li><a href="?template=welcome" target="_blank">2. Boas-vindas ao Cliente (Tema Dark)</a></li>
            <li><a href="?template=invoice-nova" target="_blank">3. Nova Fatura Emitida (Tema Claro)</a></li>
            <li><a href="?template=reminder-5d" target="_blank">4. Cobrança: 5 Dias para Vencer (Tema Claro)</a></li>
            <li><a href="?template=reminder-today" target="_blank">5. Cobrança: Vence Hoje (Tema Claro)</a></li>
            <li><a href="?template=reminder-overdue" target="_blank">6. Cobrança: 1 Dia Vencido (Tema Claro)</a></li>
            <li><a href="?template=admin-overdue" target="_blank">7. Alerta de Inadimplência para Diretoria (Tema Dark)</a></li>
            <li><a href="?template=ticket-notify" target="_blank">8. Notificação de Chamado / SLA (Tema Dark)</a></li>
          </ul>
        </body>
        </html>`,
        { headers: { "Content-Type": "text/html; charset=utf-8" } }
      );
  }
}