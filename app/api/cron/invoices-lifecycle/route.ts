import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { resend } from "@/lib/resend";
import { createInfinitePayCheckoutLink } from "@/lib/payment/infinitepay";
import {
  renderInvoiceReminderEmailHtml,
  getInvoiceReminderSubject,
} from "@/lib/mail/invoiceReminderTemplate";
import {
  renderAdminInvoiceOverdueEmailHtml,
  getAdminInvoiceOverdueSubject,
} from "@/lib/mail/adminInvoiceOverdueTemplate";

const EMAIL_FROM =
  process.env.BILLING_EMAIL_FROM || "MindSite Financeiro <financeiro@mindsite.com.br>";
const REPLY_TO = "contato@mindsite.com.br";
const ADMIN_ALERT_EMAIL = "contato@mindsite.com.br";

/**
 * Obtém os componentes de data (ano, mês, dia) no fuso de Brasília (America/Sao_Paulo)
 */
function getBrasiliaDateParts(date: Date = new Date()): { year: number; month: number; day: number } {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Sao_Paulo",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }).formatToParts(date);

  const year = parseInt(parts.find((p) => p.type === "year")!.value, 10);
  const month = parseInt(parts.find((p) => p.type === "month")!.value, 10) - 1; // 0-indexed
  const day = parseInt(parts.find((p) => p.type === "day")!.value, 10);

  return { year, month, day };
}

/**
 * Calcula a janela de início e fim para um dia específico (com deslocamento em dias)
 * no fuso de Brasília, ampliando a margem para cobrir fuso UTC/BRT no banco.
 */
function getBrasiliaDayRange(offsetDays: number, baseDate: Date = new Date()) {
  const { year, month, day } = getBrasiliaDateParts(baseDate);

  // Início do dia em Brasília (00:00:00 BRT = 03:00:00 UTC)
  // Expandimos a janela de consulta para assegurar compatibilidade com datas salvas em UTC puro
  const targetMidnightUtc = Date.UTC(year, month, day + offsetDays, 0, 0, 0, 0);
  const queryStart = new Date(targetMidnightUtc - 4 * 60 * 60 * 1000);
  const queryEnd = new Date(targetMidnightUtc + 27 * 60 * 60 * 1000);

  const targetDateForDisplay = new Date(Date.UTC(year, month, day + offsetDays, 12, 0, 0));
  const dateFormatted = new Intl.DateTimeFormat("pt-BR", {
    timeZone: "America/Sao_Paulo",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(targetDateForDisplay);

  return {
    queryStart,
    queryEnd,
    dateFormatted,
  };
}

/**
 * Formata data no padrão brasileiro DD/MM/AAAA no fuso de Brasília
 */
function formatBrDate(date: Date): string {
  return new Intl.DateTimeFormat("pt-BR", {
    timeZone: "America/Sao_Paulo",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(date));
}

/**
 * Garante link de checkout ativo para a fatura
 */
async function ensureInvoiceCheckoutUrl(inv: {
  id: string;
  invoiceNumber: string;
  totalAmount: unknown;
  gatewayInvoiceUrl: string | null;
  items: Array<{ description: string; amount: unknown }>;
  user: { fullName: string | null; companyName: string | null; email: string; phone: string | null };
}): Promise<string> {
  if (inv.gatewayInvoiceUrl) {
    return inv.gatewayInvoiceUrl;
  }

  try {
    const linkRes = await createInfinitePayCheckoutLink({
      orderNsu: inv.invoiceNumber,
      amountInCents: Math.round(Number(inv.totalAmount) * 100),
      items: inv.items.map((it) => ({
        description: it.description,
        price: Math.round(Number(it.amount) * 100),
        quantity: 1,
      })),
      customer: {
        name: inv.user.fullName || inv.user.companyName || "Cliente",
        email: inv.user.email,
        phone: inv.user.phone || undefined,
      },
    });

    if (linkRes.success && linkRes.url) {
      await prisma.invoice.update({
        where: { id: inv.id },
        data: { gatewayInvoiceUrl: linkRes.url },
      });
      return linkRes.url;
    }
  } catch (err) {
    console.warn(`[Cron Lifecycle] Erro ao gerar link InfinitePay para fatura ${inv.invoiceNumber}:`, err);
  }

  return `${process.env.NEXT_PUBLIC_APP_URL || "https://mindsite.com.br"}/portal`;
}

export async function GET(req: NextRequest) {
  // 1. Validação de segurança via CRON_SECRET
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Acesso não autorizado." }, { status: 401 });
  }

  const now = new Date();
  const results = {
    upcoming5D: 0,
    dueToday: 0,
    overdue1D: 0,
    adminAlerts: 0,
    criticalOverdue3D: 0,
    errors: [] as string[],
  };

  try {
    // Janelas de datas com timezone America/Sao_Paulo
    const range5D = getBrasiliaDayRange(5, now);
    const rangeToday = getBrasiliaDayRange(0, now);
    const rangeYesterday = getBrasiliaDayRange(-1, now);
    const range3DaysAgo = getBrasiliaDayRange(-3, now);

    // =========================================================================
    // BUSCA 1 (5 dias antes): status PENDING onde dueDate == NOW + 5 dias e reminderSentAt == null
    // =========================================================================
    const upcomingInvoices = await prisma.invoice.findMany({
      where: {
        status: { in: ["PENDING"] },
        dueDate: {
          gte: range5D.queryStart,
          lte: range5D.queryEnd,
        },
        reminderSentAt: null,
      },
      include: {
        user: { include: { projects: true } },
        items: true,
      },
    });

    for (const inv of upcomingInvoices) {
      try {
        const checkoutUrl = await ensureInvoiceCheckoutUrl(inv);
        const clientName = inv.user.fullName || inv.user.companyName || "Cliente";
        const totalAmount = Number(inv.totalAmount);
        const dueDateFormatted = formatBrDate(inv.dueDate);

        const emailHtml = renderInvoiceReminderEmailHtml({
          clientName,
          invoiceNumber: inv.invoiceNumber,
          dueDate: dueDateFormatted,
          totalAmount,
          items: inv.items.map((i) => ({ description: i.description, amount: Number(i.amount) })),
          paymentUrl: checkoutUrl,
          pixCopyPaste: inv.pixCopyPaste,
          stage: "UPCOMING_5D",
        });

        const recipients = [inv.user.email];
        if (inv.user.secondaryEmail && inv.user.secondaryEmail !== inv.user.email) {
          recipients.push(inv.user.secondaryEmail);
        }

        await resend.emails.send({
          from: EMAIL_FROM,
          replyTo: REPLY_TO,
          to: recipients,
          subject: getInvoiceReminderSubject("UPCOMING_5D", inv.invoiceNumber, totalAmount),
          html: emailHtml,
        });

        await prisma.invoice.update({
          where: { id: inv.id },
          data: {
            reminderSentAt: new Date(),
            reminder5DaysSent: true,
          },
        });

        results.upcoming5D++;
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        results.errors.push(`Erro UPCOMING_5D fatura #${inv.invoiceNumber}: ${msg}`);
      }
    }

    // =========================================================================
    // BUSCA 2 (Vence hoje): status PENDING onde dueDate == TODAY e dueTodaySentAt == null
    // =========================================================================
    const dueTodayInvoices = await prisma.invoice.findMany({
      where: {
        status: { in: ["PENDING"] },
        dueDate: {
          gte: rangeToday.queryStart,
          lte: rangeToday.queryEnd,
        },
        dueTodaySentAt: null,
      },
      include: {
        user: { include: { projects: true } },
        items: true,
      },
    });

    for (const inv of dueTodayInvoices) {
      try {
        const checkoutUrl = await ensureInvoiceCheckoutUrl(inv);
        const clientName = inv.user.fullName || inv.user.companyName || "Cliente";
        const totalAmount = Number(inv.totalAmount);
        const dueDateFormatted = formatBrDate(inv.dueDate);

        const emailHtml = renderInvoiceReminderEmailHtml({
          clientName,
          invoiceNumber: inv.invoiceNumber,
          dueDate: dueDateFormatted,
          totalAmount,
          items: inv.items.map((i) => ({ description: i.description, amount: Number(i.amount) })),
          paymentUrl: checkoutUrl,
          pixCopyPaste: inv.pixCopyPaste,
          stage: "DUE_TODAY",
        });

        const recipients = [inv.user.email];
        if (inv.user.secondaryEmail && inv.user.secondaryEmail !== inv.user.email) {
          recipients.push(inv.user.secondaryEmail);
        }

        await resend.emails.send({
          from: EMAIL_FROM,
          replyTo: REPLY_TO,
          to: recipients,
          subject: getInvoiceReminderSubject("DUE_TODAY", inv.invoiceNumber, totalAmount),
          html: emailHtml,
        });

        await prisma.invoice.update({
          where: { id: inv.id },
          data: {
            dueTodaySentAt: new Date(),
            dueDaySent: true,
          },
        });

        results.dueToday++;
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        results.errors.push(`Erro DUE_TODAY fatura #${inv.invoiceNumber}: ${msg}`);
      }
    }

    // =========================================================================
    // BUSCA 3 (1 dia vencida): onde dueDate == YESTERDAY e overdueSentAt == null
    // Atualiza status para OVERDUE, despacha e-mail para o cliente e alerta dark para admin
    // =========================================================================
    const overdue1DInvoices = await prisma.invoice.findMany({
      where: {
        status: { in: ["PENDING", "OVERDUE"] },
        dueDate: {
          gte: rangeYesterday.queryStart,
          lte: rangeYesterday.queryEnd,
        },
        overdueSentAt: null,
      },
      include: {
        user: { include: { projects: true } },
        items: true,
      },
    });

    for (const inv of overdue1DInvoices) {
      try {
        const checkoutUrl = await ensureInvoiceCheckoutUrl(inv);
        const clientName = inv.user.fullName || inv.user.companyName || "Cliente";
        const totalAmount = Number(inv.totalAmount);
        const dueDateFormatted = formatBrDate(inv.dueDate);
        const projectName =
          inv.user.projects[0]?.name ||
          inv.items[0]?.description ||
          "Plataforma Web MindSite";

        // 1. E-mail de cobrança para o cliente (Tema Claro)
        const clientEmailHtml = renderInvoiceReminderEmailHtml({
          clientName,
          invoiceNumber: inv.invoiceNumber,
          dueDate: dueDateFormatted,
          totalAmount,
          items: inv.items.map((i) => ({ description: i.description, amount: Number(i.amount) })),
          paymentUrl: checkoutUrl,
          pixCopyPaste: inv.pixCopyPaste,
          stage: "OVERDUE_1D",
        });

        const recipients = [inv.user.email];
        if (inv.user.secondaryEmail && inv.user.secondaryEmail !== inv.user.email) {
          recipients.push(inv.user.secondaryEmail);
        }

        await resend.emails.send({
          from: EMAIL_FROM,
          replyTo: REPLY_TO,
          to: recipients,
          subject: getInvoiceReminderSubject("OVERDUE_1D", inv.invoiceNumber, totalAmount),
          html: clientEmailHtml,
        });

        // 2. Alerta interno administrativo para contato@mindsite.com.br (Tema Dark)
        const adminEmailHtml = renderAdminInvoiceOverdueEmailHtml({
          clientName,
          document: inv.user.document,
          projectName,
          invoiceId: inv.id,
          invoiceNumber: inv.invoiceNumber,
          totalAmount,
          dueDate: dueDateFormatted,
          daysOverdue: 1,
          clientEmail: inv.user.email,
          clientPhone: inv.user.phone,
          adminInvoiceUrl: `${process.env.NEXT_PUBLIC_APP_URL || "https://mindsite.com.br"}/admin`,
        });

        await resend.emails.send({
          from: EMAIL_FROM,
          replyTo: REPLY_TO,
          to: ADMIN_ALERT_EMAIL,
          subject: getAdminInvoiceOverdueSubject({
            clientName,
            projectName,
            totalAmount,
          }),
          html: adminEmailHtml,
        });

        // 3. Atualiza status no banco e timestamps de auditoria
        await prisma.invoice.update({
          where: { id: inv.id },
          data: {
            status: "OVERDUE",
            overdueSentAt: new Date(),
            overdue1DaySent: true,
            adminAlertSentAt: new Date(),
          },
        });

        results.overdue1D++;
        results.adminAlerts++;
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        results.errors.push(`Erro OVERDUE_1D fatura #${inv.invoiceNumber}: ${msg}`);
      }
    }

    // =========================================================================
    // BUSCA 4 (3+ dias vencida): dueDate <= NOW - 3 dias, status OVERDUE e criticalOverdueSentAt == null
    // =========================================================================
    const criticalOverdueInvoices = await prisma.invoice.findMany({
      where: {
        status: { in: ["OVERDUE", "PENDING"] },
        dueDate: {
          lte: range3DaysAgo.queryEnd,
        },
        criticalOverdueSentAt: null,
      },
      include: {
        user: { include: { projects: true } },
        items: true,
      },
    });

    for (const inv of criticalOverdueInvoices) {
      try {
        const checkoutUrl = await ensureInvoiceCheckoutUrl(inv);
        const clientName = inv.user.fullName || inv.user.companyName || "Cliente";
        const totalAmount = Number(inv.totalAmount);
        const dueDateFormatted = formatBrDate(inv.dueDate);

        const emailHtml = renderInvoiceReminderEmailHtml({
          clientName,
          invoiceNumber: inv.invoiceNumber,
          dueDate: dueDateFormatted,
          totalAmount,
          items: inv.items.map((i) => ({ description: i.description, amount: Number(i.amount) })),
          paymentUrl: checkoutUrl,
          pixCopyPaste: inv.pixCopyPaste,
          stage: "OVERDUE_3D",
        });

        const recipients = [inv.user.email];
        if (inv.user.secondaryEmail && inv.user.secondaryEmail !== inv.user.email) {
          recipients.push(inv.user.secondaryEmail);
        }

        await resend.emails.send({
          from: EMAIL_FROM,
          replyTo: REPLY_TO,
          to: recipients,
          subject: getInvoiceReminderSubject("OVERDUE_3D", inv.invoiceNumber, totalAmount),
          html: emailHtml,
        });

        await prisma.invoice.update({
          where: { id: inv.id },
          data: {
            status: "OVERDUE",
            criticalOverdueSentAt: new Date(),
            critical2DaysSent: true,
          },
        });

        results.criticalOverdue3D++;
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        results.errors.push(`Erro OVERDUE_3D fatura #${inv.invoiceNumber}: ${msg}`);
      }
    }

    return NextResponse.json(
      {
        success: true,
        summary: results,
      },
      { status: 200 }
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erro desconhecido";
    console.error("[Cron Invoices Lifecycle] Erro geral na execução:", message);
    return NextResponse.json({ error: message, details: results }, { status: 500 });
  }
}
