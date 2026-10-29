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
  transaction_id?: string;
  invoice_slug?: string;
  slug?: string;
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
    slug?: string;
    [key: string]: unknown;
  };
  data?: {
    order_nsu?: string;
    transaction_nsu?: string;
    transaction_id?: string;
    invoice_slug?: string;
    slug?: string;
    receipt_url?: string;
    amount?: number;
    paid_amount?: number;
    capture_method?: string;
    payment_method?: string;
    status?: string;
    id?: string;
    [key: string]: unknown;
  };
}

export async function POST(req: NextRequest) {
  const timestamp = new Date().toISOString();
  console.info(`[InfinitePay Webhook] [${timestamp}] Nova requisição recebida.`);

  try {
    let body: WebhookPayload;
    try {
      body = (await req.json()) as WebhookPayload;
    } catch {
      console.error(`[InfinitePay Webhook] [${timestamp}] Falha ao decodificar JSON do body.`);
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    // Telemetria bruta estruturada para auditoria nos Runtime Logs da Vercel
    console.info("[InfinitePay Webhook RAW Body]:", JSON.stringify(body));

    // 1. Filtragem de eventos preliminares ou não faturáveis
    const eventName = (body.event || body.event_type || body.type || "").toLowerCase();
    const ignoredEvents = ["payment.created", "charge.pending", "order.created", "invoice.created"];
    if (ignoredEvents.includes(eventName)) {
      console.info(`[InfinitePay Webhook] [${timestamp}] Evento preliminar ignorado: ${eventName}`);
      return NextResponse.json({ received: true, ignored: true }, { status: 200 });
    }

    // 2. Extração unificada e tolerante a falhas dos identificadores
    const orderNsu =
      body.order_nsu ||
      body.data?.order_nsu ||
      body.invoice_number ||
      body.invoiceNumber ||
      body.metadata?.invoiceNumber ||
      body.metadata?.orderNsu ||
      body.order_id;

    const slug =
      body.invoice_slug ||
      body.slug ||
      body.data?.invoice_slug ||
      body.data?.slug ||
      body.metadata?.slug;

    const transactionId =
      body.transaction_nsu ||
      body.data?.transaction_nsu ||
      body.transaction_id ||
      body.data?.transaction_id ||
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

    const captureMethod = (
      body.capture_method ||
      body.payment_method ||
      body.data?.capture_method ||
      body.data?.payment_method ||
      "pix"
    ).toLowerCase();

    // Validação de identificador mínimo para busca relacional
    if (!orderNsu && !slug && !transactionId) {
      console.warn(`[InfinitePay Webhook] [${timestamp}] Rejeitado: Nenhum identificador presente no payload.`);
      return NextResponse.json({ error: "Missing identifying parameters (order_nsu, slug, transaction_nsu)" }, { status: 400 });
    }

    // 3. Montagem da query relacional flexível no PostgreSQL
    const orConditions: Array<Record<string, unknown>> = [];

    if (orderNsu) {
      orConditions.push({ invoiceNumber: orderNsu });
      orConditions.push({ gatewayPaymentId: orderNsu });
      orConditions.push({ id: orderNsu });
    }

    if (slug) {
      orConditions.push({ gatewayInvoiceUrl: { contains: slug } });
    }

    if (transactionId) {
      orConditions.push({ gatewayPaymentId: transactionId });
    }

    const invoice = await prisma.invoice.findFirst({
      where: {
        OR: orConditions,
      },
      include: {
        user: true,
        items: { include: { installment: true } },
      },
    });

    if (!invoice) {
      console.warn(
        `[InfinitePay Webhook] [${timestamp}] Fatura não localizada. Params buscados: orderNsu=${orderNsu}, slug=${slug}, transactionId=${transactionId}`
      );
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    // 4. Idempotência: Se já foi baixada anteriormente, encerra com 200 OK imediato
    if (invoice.status === "PAID") {
      console.info(`[InfinitePay Webhook] [${timestamp}] Fatura #${invoice.invoiceNumber} já liquidada anteriormente.`);
      return NextResponse.json({ received: true, alreadyPaid: true }, { status: 200 });
    }

    const isPixPayment = captureMethod === "pix";

    // 5. Transação Atômica de Liquidação Financeira
    await prisma.$transaction([
      // A) Atualiza o status da Invoice para PAID
      prisma.invoice.update({
        where: { id: invoice.id },
        data: {
          status: "PAID",
          paidAt: new Date(),
          receiptUrl: receiptUrl || invoice.receiptUrl,
          paymentMethod: isPixPayment ? "PIX" : "CREDIT_CARD",
          gatewayPaymentId: transactionId || slug || invoice.gatewayPaymentId,
        },
      }),
      // B) Atualiza todas as parcelas de implantação vinculadas aos itens da fatura para PAID
      prisma.contractInstallment.updateMany({
        where: {
          invoiceItemId: { in: invoice.items.map((it) => it.id) },
        },
        data: { status: "PAID" },
      }),
    ]);

    // C) Incrementa o saldo quitado (paidAmount) nos contratos impactados
    for (const item of invoice.items) {
      if (item.installment?.contractId) {
        await prisma.contract.update({
          where: { id: item.installment.contractId },
          data: { paidAmount: { increment: item.amount } },
        });
      }
    }

    console.info(`[InfinitePay Webhook] [${timestamp}] Baixa atômica homologada para a fatura #${invoice.invoiceNumber}.`);

    // 6. Purga de cache do Next.js App Router para atualização instantânea da UI
    try {
      revalidatePath("/admin");
      revalidatePath("/admin/dashboard");
      revalidatePath("/portal");
      revalidatePath("/portal/dashboard");
      revalidatePath("/admin/clients");
    } catch (revalErr) {
      console.warn(`[InfinitePay Webhook] [${timestamp}] Aviso na revalidação de caminhos:`, revalErr);
    }

    // 7. Disparo do Recibo Fiscal / Transacional via Resend
    if (invoice.user?.email) {
      try {
        const valorExibicao =
          rawAmount > 0
            ? (rawAmount > 1000 ? rawAmount / 100 : rawAmount).toFixed(2).replace(".", ",")
            : Number(invoice.totalAmount).toFixed(2).replace(".", ",");

        await resend.emails.send({
          from: "MindSite Financeiro <financeiro@mindsite.com.br>",
          to: invoice.user.email,
          bcc: ["contato@mindsite.com.br", "financeiro@mindsite.com.br"],
          subject: `Confirmação de Pagamento — Fatura ${invoice.invoiceNumber}`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: auto; padding: 28px; border: 1px solid #e5e5e5; border-radius: 4px; background-color: #ffffff;">
              <div style="margin-bottom: 20px;">
                <span style="display: inline-block; padding: 4px 10px; background-color: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 4px; font-family: monospace; font-size: 11px; text-transform: uppercase; color: #10b981; font-weight: 700;">
                  [ PAGAMENTO CONFIRMADO ]
                </span>
              </div>
              <h2 style="color: #002bba; margin: 0 0 12px 0; font-size: 20px;">Pagamento Liquidado com Sucesso!</h2>
              <p style="color: #4b5563; line-height: 1.6; font-size: 14px;">Olá, <strong>${invoice.user.fullName || "Cliente"}</strong>.</p>
              <p style="color: #4b5563; line-height: 1.6; font-size: 14px;">Confirmamos o recebimento e a liquidação da sua fatura <strong>#${invoice.invoiceNumber}</strong>.</p>
              <div style="background-color: #f9f7f7; border: 1px solid #e5e5e5; border-radius: 4px; padding: 16px; margin: 20px 0;">
                <p style="margin: 0 0 8px 0; font-size: 13px; color: #0f0f0f;"><strong>Valor Liquidado:</strong> R$ ${valorExibicao}</p>
                <p style="margin: 0 0 8px 0; font-size: 13px; color: #0f0f0f;"><strong>Método de Pagamento:</strong> ${isPixPayment ? "Pix" : "Cartão de Crédito"}</p>
                <p style="margin: 0; font-size: 13px; color: #0f0f0f;"><strong>Data e Hora:</strong> ${new Date().toLocaleDateString("pt-BR", { timeZone: "America/Sao_Paulo" })} às ${new Date().toLocaleTimeString("pt-BR", { timeZone: "America/Sao_Paulo" })}</p>
              </div>
              ${
                receiptUrl
                  ? `<p style="margin: 24px 0;"><a href="${receiptUrl}" target="_blank" style="background:#002bba; color:#ffffff; padding:12px 20px; text-decoration:none; border-radius:4px; font-weight:700; font-size:13px; display:inline-block;">Acessar Comprovante Oficial ↗</a></p>`
                  : ""
              }
              <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 24px 0;" />
              <p style="font-size: 11px; color: #6b7280; margin: 0;">MindSite Agência Digital — CNPJ 19.725.535/0001-58 | Suporte: contato@mindsite.com.br</p>
            </div>
          `,
        });
        console.info(`[InfinitePay Webhook] [${timestamp}] Recibo fiscal enviado com sucesso para ${invoice.user.email}.`);
      } catch (mailErr: unknown) {
        console.error(`[InfinitePay Webhook] [${timestamp}] Erro ao enviar e-mail de confirmação:`, mailErr);
      }
    }

    return NextResponse.json({ success: true, invoiceNumber: invoice.invoiceNumber }, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Erro desconhecido";
    console.error(`[InfinitePay Webhook] [${timestamp}] Erro interno fatal:`, message);
    return NextResponse.json({ error: message, received: false }, { status: 500 });
  }
}