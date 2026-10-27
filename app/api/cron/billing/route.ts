import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";
import { createInfinitePayCheckoutLink } from "@/lib/payment/infinitepay";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET(req: NextRequest) {
    // Valida autenticidade do disparo do Cron
    const authHeader = req.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return NextResponse.json({ error: "Acesso não autorizado." }, { status: 401 });
    }

    const now = new Date();
    const adminAlertEmail = "contato@mindsite.com.br";

    try {
        // 1. Busca todas as faturas pendentes com seus itens e dados do cliente
        const pendingInvoices = await prisma.invoice.findMany({
            where: {
                status: { in: ["PENDING", "OVERDUE"] },
            },
            include: {
                user: true,
                items: true,
            },
        });

        for (const inv of pendingInvoices) {
            const dueDate = new Date(inv.dueDate);
            const diffTime = dueDate.getTime() - now.getTime();
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // > 0 futuro, < 0 passado

            // Assegura que a fatura possua um link ativo da InfinitePay
            let checkoutUrl = inv.gatewayInvoiceUrl;
            if (!checkoutUrl) {
                const linkRes = await createInfinitePayCheckoutLink({
                    orderNsu: inv.invoiceNumber,
                    amountInCents: Math.round(Number(inv.totalAmount) * 100),
                    items: inv.items.map((it) => ({
                        description: it.description,
                        price: Math.round(Number(it.amount) * 100),
                        quantity: 1,
                    })),
                    customer: {
                        name: inv.user.fullName || "Cliente",
                        email: inv.user.email,
                        phone: inv.user.phone || undefined,
                    },
                });

                if (linkRes.success && linkRes.url) {
                    checkoutUrl = linkRes.url;
                    await prisma.invoice.update({
                        where: { id: inv.id },
                        data: { gatewayInvoiceUrl: checkoutUrl },
                    });
                }
            }

            const clientName = inv.user.fullName || "Cliente";
            const valorFormatado = `R$ ${Number(inv.totalAmount).toFixed(2).replace(".", ",")}`;

            // A) 5 Dias Antes do Vencimento (D-5)
            if (diffDays <= 5 && diffDays > 0 && !inv.reminder5DaysSent) {
                await resend.emails.send({
                    from: "MindSite Financeiro <financeiro@mindsite.com.br>",
                    to: inv.user.email,
                    subject: `Lembrete de Pagamento: Sua fatura vence em ${diffDays} dias (${valorFormatado})`,
                    html: `
            <div style="font-family: sans-serif; padding: 20px;">
              <h2>Lembrete de Fatura Próxima</h2>
              <p>Olá, <strong>${clientName}</strong>.</p>
              <p>Sua fatura <strong>${inv.invoiceNumber}</strong> no valor de <strong>${valorFormatado}</strong> vence em ${dueDate.toLocaleDateString("pt-BR")}.</p>
              <p>Você pode liquidar diretamente via Pix ou Cartão pelo link abaixo:</p>
              <p><a href="${checkoutUrl}" style="background:#002bba; color:#fff; padding:12px 20px; text-decoration:none; border-radius:4px; display:inline-block; font-weight:bold;">Pagar com Pix ou Cartão</a></p>
            </div>
          `,
                });

                await prisma.invoice.update({
                    where: { id: inv.id },
                    data: { reminder5DaysSent: true },
                });
            }

            // B) Na Data do Vencimento (D0)
            if (diffDays === 0 && !inv.dueDaySent) {
                await resend.emails.send({
                    from: "MindSite Financeiro <financeiro@mindsite.com.br>",
                    to: inv.user.email,
                    subject: `Sua fatura MindSite vence HOJE (${valorFormatado})`,
                    html: `
            <div style="font-family: sans-serif; padding: 20px;">
              <h2 style="color: #002bba;">Vencimento Hoje</h2>
              <p>Olá, <strong>${clientName}</strong>.</p>
              <p>Informamos que a sua fatura <strong>${inv.invoiceNumber}</strong> no valor de <strong>${valorFormatado}</strong> vence na data de hoje.</p>
              <p><a href="${checkoutUrl}" style="background:#002bba; color:#fff; padding:12px 20px; text-decoration:none; border-radius:4px; display:inline-block; font-weight:bold;">Acessar Checkout (Pix ou Cartão)</a></p>
            </div>
          `,
                });

                await prisma.invoice.update({
                    where: { id: inv.id },
                    data: { dueDaySent: true },
                });
            }

            // C) 1 Dia Após o Vencimento (D+1) — Alerta de Vencido + Aviso ao Dono
            if (diffDays === -1 && !inv.overdue1DaySent) {
                // Marca fatura como atrasada
                await prisma.invoice.update({
                    where: { id: inv.id },
                    data: { status: "OVERDUE", overdue1DaySent: true },
                });

                // E-mail para o cliente
                await resend.emails.send({
                    from: "MindSite Financeiro <financeiro@mindsite.com.br>",
                    to: [inv.user.email, ...(inv.user.secondaryEmail ? [inv.user.secondaryEmail] : [])],
                    subject: `Aviso de Fatura Vencida — ${inv.invoiceNumber}`,
                    html: `
            <div style="font-family: sans-serif; padding: 20px; border-left: 4px solid #ef4444;">
              <h2 style="color: #ef4444;">Fatura em Atraso</h2>
              <p>Olá, <strong>${clientName}</strong>.</p>
              <p>Identificamos que o pagamento da fatura <strong>${inv.invoiceNumber}</strong> (${valorFormatado}) não foi registrado na data de ontem.</p>
              <p>Para manter os serviços de hospedagem e chamados técnicos ativos, efetue a regularização:</p>
              <p><a href="${checkoutUrl}" style="background:#ef4444; color:#fff; padding:12px 20px; text-decoration:none; border-radius:4px; display:inline-block; font-weight:bold;">Regularizar Fatura Agora</a></p>
            </div>
          `,
                });

                // E-mail para Danilo (Alerta Administrativo)
                await resend.emails.send({
                    from: "Alerta Financeiro MindSite <alertas@mindsite.com.br>",
                    to: adminAlertEmail,
                    subject: `⚠️ Inadimplência D+1: ${clientName} (${valorFormatado})`,
                    html: `
            <div style="font-family: sans-serif; padding: 20px;">
              <h3>Alerta de Pagamento Não Realizado</h3>
              <p>O cliente <strong>${clientName}</strong> (${inv.user.email}) não liquidou a fatura <strong>${inv.invoiceNumber}</strong> no vencimento.</p>
              <p><strong>Valor:</strong> ${valorFormatado}</p>
              <p><strong>Itens:</strong></p>
              <ul>${inv.items.map((i) => `<li>${i.description} — R$ ${Number(i.amount).toFixed(2)}</li>`).join("")}</ul>
            </div>
          `,
                });
            }

            // D) 2 Dias Após o Vencimento (D+2) — Cobrança Crítica
            if (diffDays <= -2 && !inv.critical2DaysSent) {
                await resend.emails.send({
                    from: "MindSite Cobrança <financeiro@mindsite.com.br>",
                    to: [inv.user.email, ...(inv.user.secondaryEmail ? [inv.user.secondaryEmail] : [])],
                    subject: `URGENTE: Regularização de Pendência Financeira — ${inv.invoiceNumber}`,
                    html: `
            <div style="font-family: sans-serif; padding: 20px; border-left: 4px solid #dc2626;">
              <h2 style="color: #dc2626;">Aviso Importante de Suspensão</h2>
              <p>Olá, <strong>${clientName}</strong>.</p>
              <p>A fatura <strong>${inv.invoiceNumber}</strong> no valor de <strong>${valorFormatado}</strong> permanece em aberto há mais de 48 horas.</p>
              <p>Evite a suspensão preventiva do seu ambiente e contas de e-mail regularizando o débito:</p>
              <p><a href="${checkoutUrl}" style="background:#dc2626; color:#fff; padding:12px 20px; text-decoration:none; border-radius:4px; display:inline-block; font-weight:bold;">Regularizar Débito Imediatamente</a></p>
            </div>
          `,
                });

                await prisma.invoice.update({
                    where: { id: inv.id },
                    data: { critical2DaysSent: true },
                });
            }
        }

        return NextResponse.json({ success: true, processed: pendingInvoices.length }, { status: 200 });
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Erro desconhecido";
        console.error("Erro na rotina de cobrança:", message);
        return NextResponse.json({ error: message }, { status: 500 });
    }
}