import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";
import { revalidatePath } from "next/cache";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const orderNsu = body.order_nsu;
    const transactionNsu = body.transaction_nsu;
    const receiptUrl = body.receipt_url;
    const paidAmountCents = body.paid_amount || body.amount;
    const captureMethod = body.capture_method; // "pix" | "credit_card"

    if (!orderNsu) {
      return NextResponse.json({ error: "order_nsu não informado" }, { status: 400 });
    }

    // Localiza a fatura
    const invoice = await prisma.invoice.findUnique({
      where: { invoiceNumber: orderNsu },
      include: {
        user: true,
        items: {
          include: {
            installment: true,
          },
        },
      },
    });

    if (!invoice) {
      console.warn(`Fatura com order_nsu ${orderNsu} não localizada no banco.`);
      return NextResponse.json({ error: "Fatura não localizada" }, { status: 404 });
    }

    if (invoice.status === "PAID") {
      return NextResponse.json({ message: "Fatura já baixada anteriormente" }, { status: 200 });
    }

    // Executa baixa atômica
    await prisma.$transaction(async (tx) => {
      // 1. Atualiza a fatura
      await tx.invoice.update({
        where: { id: invoice.id },
        data: {
          status: "PAID",
          paidAt: new Date(),
          receiptUrl: receiptUrl || null,
          gatewayPaymentId: transactionNsu || invoice.gatewayPaymentId,
          paymentMethod: captureMethod === "pix" ? "PIX" : "CREDIT_CARD",
        },
      });

      // 2. Dá baixa em parcelas de contrato atreladas a esta fatura
      for (const item of invoice.items) {
        if (item.installment) {
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

    // 3. Dispara recibo de pagamento por e-mail para o cliente e alerta para o financeiro
    try {
      await resend.emails.send({
        from: "MindSite Financeiro <financeiro@mindsite.com.br>",
        to: invoice.user.email,
        bcc: ["contato@mindsite.com.br", "financeiro@mindsite.com.br"],
        subject: `Confirmação de Pagamento — Fatura ${invoice.invoiceNumber}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 4px;">
            <h2 style="color: #002bba;">Pagamento Confirmado!</h2>
            <p>Olá, <strong>${invoice.user.fullName || "Cliente"}</strong>.</p>
            <p>Confirmamos o recebimento do seu pagamento referente à fatura <strong>${invoice.invoiceNumber}</strong>.</p>
            <p><strong>Valor Liquidado:</strong> R$ ${(paidAmountCents / 100).toFixed(2).replace(".", ",")}</p>
            <p><strong>Forma de Pagamento:</strong> ${captureMethod === "pix" ? "Pix" : "Cartão de Crédito"}</p>
            ${receiptUrl ? `<p><a href="${receiptUrl}" target="_blank" style="background:#002bba; color:#fff; padding:10px 18px; text-decoration:none; border-radius:4px; display:inline-block;">Acessar Comprovante</a></p>` : ""}
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
            <p style="font-size: 12px; color: #64748b;">MindSite Agência Digital — CNPJ 19.725.535/0001-58</p>
          </div>
        `,
      });
    } catch (mailErr: unknown) {
      console.error("Falha ao enviar e-mail de recibo no webhook:", mailErr);
    }

    revalidatePath("/portal/dashboard");
    revalidatePath("/admin/dashboard");
    revalidatePath("/admin/clients");

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Erro desconhecido";
    console.error("Erro ao processar webhook da InfinitePay:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}