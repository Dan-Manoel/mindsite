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
    console.log(`[InfinitePay Webhook] [${timestamp}] Payload decodificado:`, JSON.stringify(body, null, 2));

    // 2. Extração unificada de campos (compatível com múltiplos esquemas InfinitePay v1/v2/Pix/Cartão)
    const eventName = (body.event || body.event_type || body.type || "").toLowerCase();
    const statusField = (body.status || body.data?.status || "").toLowerCase();

    // Verificação de eventos informativos que não demandam liquidação imediata
    const ignoredEvents = ["payment.created", "charge.pending", "order.created", "invoice.created"];
    if (ignoredEvents.includes(eventName)) {
      console.log(`[InfinitePay Webhook] [${timestamp}] Evento preliminar ignorado: ${eventName}`);
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

    const captureMethod = (
      body.capture_method ||
      body.payment_method ||
      body.data?.capture_method ||
      "pix"
    ).toLowerCase();

    console.log(`[InfinitePay Webhook] [${timestamp}] Identificadores extraídos:`, {
      orderNsu,
      transactionNsu,
      eventName,
      statusField,
      rawAmount,
      captureMethod,
    });

    if (!orderNsu && !transactionNsu) {
      console.warn(`[InfinitePay Webhook] [${timestamp}] Requisição sem identificador (order_nsu ou transaction_nsu).`);
      return NextResponse.json({ error: "Identificador da fatura não informado" }, { status: 400 });
    }

    // 3. Localização da fatura no banco via Prisma
    let invoice = null;

    if (orderNsu) {
      invoice = await prisma.invoice.findFirst({
        where: {
          OR: [
            { invoiceNumber: orderNsu },
            { gatewayPaymentId: orderNsu },
            { id: orderNsu },
          ],
        },
        include: {
          user: true,
          items: {
            include: {
              installment: true,
            },
          },
        },
      });
    }

    if (!invoice && transactionNsu) {
      invoice = await prisma.invoice.findFirst({
        where: {
          OR: [
            { gatewayPaymentId: transactionNsu },
            { invoiceNumber: transactionNsu },
          ],
        },
        include: {
          user: true,
          items: {
            include: {
              installment: true,
            },
          },
        },
      });
    }

    if (!invoice) {
      console.warn(`[InfinitePay Webhook] [${timestamp}] Fatura não localizada para orderNsu="${orderNsu}" e transactionNsu="${transactionNsu}".`);
      return NextResponse.json({ error: "Fatura não localizada", received: true }, { status: 404 });
    }

    console.log(`[InfinitePay Webhook] [${timestamp}] Fatura encontrada: #${invoice.invoiceNumber} (ID: ${invoice.id}, Status Atual: ${invoice.status})`);

    // Idempotência: se já foi baixada anteriormente, encerra com sucesso
    if (invoice.status === "PAID") {
      console.log(`[InfinitePay Webhook] [${timestamp}] Fatura #${invoice.invoiceNumber} já estava com status PAID. Operação idempotente concluída.`);
      return NextResponse.json({ received: true, message: "Fatura já liquidada" }, { status: 200 });
    }

    // 4. Execução de Baixa Atômica no Banco de Dados
    await prisma.$transaction(async (tx) => {
      // Atualiza a Fatura
      await tx.invoice.update({
        where: { id: invoice.id },
        data: {
          status: "PAID",
          paidAt: new Date(),
          receiptUrl: receiptUrl || invoice.receiptUrl,
          gatewayPaymentId: transactionNsu || invoice.gatewayPaymentId,
          paymentMethod: captureMethod.includes("credit") ? "CREDIT_CARD" : "PIX",
        },
      });

      // Atualiza as parcelas de contrato atreladas a cada item da fatura
      for (const item of invoice.items) {
        if (item.installment) {
          console.log(`[InfinitePay Webhook] [${timestamp}] Liquidando parcela #${item.installment.installmentNumber} do contrato ${item.installment.contractId}...`);
          
          await tx.contractInstallment.update({
            where: { id: item.installment.id },
            data: { status: "PAID" },
          });

          await tx.contract.update({
            where: { id: item.installment.contractId },
            data: {
              paidAmount: { increment: item.installment.amount },
            },
          });
        }
      }
    });

    console.log(`[InfinitePay Webhook] [${timestamp}] Baixa atômica realizada com sucesso para a fatura #${invoice.invoiceNumber}.`);

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
              <p style="margin: 0 0 8px 0; font-size: 14px; color: #0f0f0f;"><strong>Método de Pagamento:</strong> ${captureMethod.includes("credit") ? "Cartão de Crédito" : "Pix"}</p>
              <p style="margin: 0; font-size: 14px; color: #0f0f0f;"><strong>Data da Baixa:</strong> ${new Date().toLocaleDateString("pt-BR", { timeZone: "America/Sao_Paulo" })} às ${new Date().toLocaleTimeString("pt-BR", { timeZone: "America/Sao_Paulo" })}</p>
            </div>
            ${receiptUrl ? `<p style="margin: 24px 0;"><a href="${receiptUrl}" target="_blank" style="background:#002bba; color:#ffffff; padding:12px 20px; text-decoration:none; border-radius:4px; font-weight: 700; display:inline-block;">Acessar Comprovante Oficial</a></p>` : ""}
            <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 24px 0;" />
            <p style="font-size: 12px; color: #6b7280; margin: 0;">MindSite Agência Digital — CNPJ 19.725.535/0001-58 | Suporte: contato@mindsite.com.br</p>
          </div>
        `,
      });
      console.log(`[InfinitePay Webhook] [${timestamp}] Recibo enviado para ${invoice.user.email}.`);
    } catch (mailErr: unknown) {
      console.error(`[InfinitePay Webhook] [${timestamp}] Falha no envio do e-mail de recibo:`, mailErr);
    }

    // 6. Revalidação de cache nas rotas do Portal e do Admin
    revalidatePath("/portal");
    revalidatePath("/portal/dashboard");
    revalidatePath("/admin");
    revalidatePath("/admin/dashboard");
    revalidatePath("/admin/clients");

    console.log(`[InfinitePay Webhook] [${timestamp}] Processamento finalizado com sucesso.`);
    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Erro desconhecido";
    console.error(`[InfinitePay Webhook] [${timestamp}] Erro interno:`, message);
    return NextResponse.json({ error: message, received: false }, { status: 500 });
  }
}