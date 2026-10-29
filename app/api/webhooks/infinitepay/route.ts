import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";
import { revalidatePath } from "next/cache";

const resend = new Resend(process.env.RESEND_API_KEY);

interface WebhookPayload {
  event?: string;
  event_type?: string;
  type?: string;
  status?: string;
  order_nsu?: string;
  transaction_nsu?: string;
  receipt_url?: string;
  paid_amount?: number;
  amount?: number;
  capture_method?: string;
  payment_method?: string;
  order_id?: string;
  invoice_number?: string;
  invoiceNumber?: string;
  id?: string;
  metadata?: {
    invoiceNumber?: string;
    orderNsu?: string;
    [key: string]: unknown;
  };
  data?: {
    order_nsu?: string;
    transaction_nsu?: string;
    receipt_url?: string;
    amount?: number;
    paid_amount?: number;
    capture_method?: string;
    status?: string;
    id?: string;
    [key: string]: unknown;
  };
}

export async function POST(req: NextRequest) {
  const timestamp = new Date().toISOString();
  console.log(`[InfinitePay Webhook] [${timestamp}] Nova requisição recebida.`);

  // 1. Verificação de Assinatura / Token Secreto (se configurado nas variáveis de ambiente)
  const webhookSecret = process.env.INFINITE_WEBHOOK_SECRET;
  if (webhookSecret) {
    const headerSecret =
      req.headers.get("x-webhook-secret") ||
      req.headers.get("x-infinite-secret") ||
      req.headers.get("authorization")?.replace("Bearer ", "");

    if (headerSecret !== webhookSecret) {
      console.warn(`[InfinitePay Webhook] [${timestamp}] Falha de autenticação: segredo do webhook inválido.`);
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  try {
    let body: WebhookPayload;
    try {
      body = (await req.json()) as WebhookPayload;
    } catch {
      console.error(`[InfinitePay Webhook] [${timestamp}] Falha ao decodificar corpo JSON da requisição.`);
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    // Telemetria estruturada no console para auditoria nos Runtime Logs da Vercel
    console.info("[InfinitePay Webhook] Payload:", JSON.stringify(body));

    // 2. Extração unificada de campos conforme documentação oficial da InfinitePay
    const eventName = (body.event || body.event_type || body.type || "").toLowerCase();
    const ignoredEvents = ["payment.created", "charge.pending", "order.created", "invoice.created"];
    if (ignoredEvents.includes(eventName)) {
      console.info(`[InfinitePay Webhook] [${timestamp}] Evento preliminar ignorado: ${eventName}`);
      return NextResponse.json({ received: true, ignored: true }, { status: 200 });
    }

    const orderNsu =
      body.order_nsu ||
      body.data?.order_nsu ||
      body.invoice_number ||
      body.invoiceNumber ||
      body.metadata?.invoiceNumber ||
      body.metadata?.orderNsu ||
      body.order_id;

    const transactionNsu =
      body.transaction_nsu ||
      body.data?.transaction_nsu ||
      body.id ||
      body.data?.id;

    const receiptUrl =
      body.receipt_url ||
      body.data?.receipt_url ||
      null;

    const rawAmount =
      body.paid_amount ??
      body.amount ??
      body.data?.paid_amount ??
      body.data?.amount ??
      0;

    const captureMethod =
      body.capture_method ||
      body.payment_method ||
      body.data?.capture_method;

    if (!orderNsu) {
      return NextResponse.json({ error: "Missing order_nsu" }, { status: 400 });
    }

    // 3. Localização da fatura no banco via Prisma
    const invoice = await prisma.invoice.findFirst({
      where: {
        OR: [
          { invoiceNumber: orderNsu },
          { id: orderNsu },
          { gatewayPaymentId: orderNsu },
        ],
      },
      include: {
        user: true,
        items: { include: { installment: true } },
      },
    });

    if (!invoice) {
      console.warn(`[InfinitePay Webhook] Fatura não localizada para order_nsu: ${orderNsu}`);
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    // Idempotência: se já foi baixada anteriormente, encerra com sucesso
    if (invoice.status === "PAID") {
      return NextResponse.json({ received: true, alreadyPaid: true }, { status: 200 });
    }

    const isPixPayment = String(captureMethod || "pix").toLowerCase() === "pix";

    // 4. Transação Atômica e Idempotente no Prisma
    await prisma.$transaction([
      // 1. Atualiza a fatura para PAID
      prisma.invoice.update({
        where: { id: invoice.id },
        data: {
          status: "PAID",
          paidAt: new Date(),
          receiptUrl: receiptUrl || invoice.receiptUrl,
          paymentMethod: isPixPayment ? "PIX" : "CREDIT_CARD",
          gatewayPaymentId: transactionNsu || invoice.gatewayPaymentId,
        },
      }),
      // 2. Atualiza parcelas vinculadas para PAID
      prisma.contractInstallment.updateMany({
        where: {
          invoiceItemId: { in: invoice.items.map((it) => it.id) },
        },
        data: { status: "PAID" },
      }),
    ]);

    // 3. Atualiza valor pago nos contratos
    for (const item of invoice.items) {
      if (item.installment?.contractId) {
        await prisma.contract.update({
          where: { id: item.installment.contractId },
          data: { paidAmount: { increment: item.amount } },
        });
      }
    }

    console.info(`[InfinitePay Webhook] [${timestamp}] Baixa atômica realizada com sucesso para a fatura #${invoice.invoiceNumber}.`);

    try {
      revalidatePath("/admin");
      revalidatePath("/admin/dashboard");
      revalidatePath("/portal/dashboard");
    } catch (revalErr) {
      console.warn(`[InfinitePay Webhook] Erro ao revalidar caminhos:`, revalErr);
    }

    // 5. Disparo de Recibo de Pagamento por E-mail
    try {
      const valorExibicao = rawAmount > 0
        ? (rawAmount > 1000 ? rawAmount / 100 : rawAmount).toFixed(2).replace(".", ",")
        : Number(invoice.totalAmount).toFixed(2).replace(".", ",");

      await resend.emails.send({
        from: "MindSite Financeiro <financeiro@mindsite.com.br>",
        to: invoice.user.email,
        bcc: ["contato@mindsite.com.br", "financeiro@mindsite.com.br"],
        subject: `Confirmação de Pagamento — Fatura ${invoice.invoiceNumber}`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: auto; padding: 24px; border: 1px solid #e5e5e5; border-radius: 6px; background-color: #ffffff;">
            <div style="margin-bottom: 20px;">
              <span style="display: inline-block; padding: 4px 10px; background-color: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 4px; font-family: monospace; font-size: 11px; text-transform: uppercase; color: #10b981; font-weight: 700;">
                [ PAGAMENTO CONFIRMADO ]
              </span>
            </div>
            <h2 style="color: #002bba; margin: 0 0 12px 0;">Pagamento Liquidado com Sucesso!</h2>
            <p style="color: #4b5563; line-height: 1.6;">Olá, <strong>${invoice.user.fullName || "Cliente"}</strong>.</p>
            <p style="color: #4b5563; line-height: 1.6;">Confirmamos o recebimento e a liquidação da sua fatura <strong>#${invoice.invoiceNumber}</strong>.</p>
            <div style="background-color: #f9f7f7; border: 1px solid #e5e5e5; border-radius: 4px; padding: 16px; margin: 20px 0;">
              <p style="margin: 0 0 8px 0; font-size: 14px; color: #0f0f0f;"><strong>Valor Pago:</strong> R$ ${valorExibicao}</p>
              <p style="margin: 0 0 8px 0; font-size: 14px; color: #0f0f0f;"><strong>Método de Pagamento:</strong> ${isPixPayment ? "Pix" : "Cartão de Crédito"}</p>
              <p style="margin: 0; font-size: 14px; color: #0f0f0f;"><strong>Data da Baixa:</strong> ${new Date().toLocaleDateString("pt-BR", { timeZone: "America/Sao_Paulo" })} às ${new Date().toLocaleTimeString("pt-BR", { timeZone: "America/Sao_Paulo" })}</p>
            </div>
            ${receiptUrl ? `<p style="margin: 24px 0;"><a href="${receiptUrl}" target="_blank" style="background:#002bba; color:#ffffff; padding:12px 20px; text-decoration:none; border-radius:4px; font-weight: 700; display:inline-block;">Acessar Comprovante Oficial</a></p>` : ""}
            <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 24px 0;" />
            <p style="font-size: 12px; color: #6b7280; margin: 0;">MindSite Agência Digital — CNPJ 19.725.535/0001-58 | Suporte: contato@mindsite.com.br</p>
          </div>
        `,
      });
      console.info(`[InfinitePay Webhook] [${timestamp}] Recibo enviado para ${invoice.user.email}.`);
    } catch (mailErr: unknown) {
      console.error(`[InfinitePay Webhook] [${timestamp}] Falha no envio do e-mail de recibo:`, mailErr);
    }

    // 6. Revalidação de cache nas rotas do Portal e do Admin
    revalidatePath("/portal");
    revalidatePath("/portal/dashboard");
    revalidatePath("/admin");
    revalidatePath("/admin/dashboard");
    revalidatePath("/admin/clients");

    console.info(`[InfinitePay Webhook] [${timestamp}] Processamento finalizado com sucesso.`);
    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Erro desconhecido";
    console.error(`[InfinitePay Webhook] [${timestamp}] Erro interno:`, message);
    return NextResponse.json({ error: message, received: false }, { status: 500 });
  }
}