import { redirect } from "next/navigation";
import { getClientDashboardData } from "@/app/actions/portal";
import PortalDashboardView from "./PortalDashboardView";
import { Metadata } from "next";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Área do Cliente | MindSite",
  description: "Gerencie chamados técnicos com SLA e faturas do seu projeto.",
};

interface ClientDashboardPageProps {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ClientDashboardPage({ searchParams }: ClientDashboardPageProps) {
  // Reconciliação Síncrona no Retorno do Checkout InfinitePay
  try {
    const resolvedSearchParams = searchParams ? await searchParams : {};
    const paymentStatus =
      typeof resolvedSearchParams.payment === "string" ? resolvedSearchParams.payment : undefined;
    const orderNsu =
      typeof resolvedSearchParams.order_nsu === "string"
        ? resolvedSearchParams.order_nsu
        : typeof resolvedSearchParams.orderNsu === "string"
        ? resolvedSearchParams.orderNsu
        : undefined;
    const transactionNsu =
      typeof resolvedSearchParams.transaction_nsu === "string"
        ? resolvedSearchParams.transaction_nsu
        : typeof resolvedSearchParams.slug === "string"
        ? resolvedSearchParams.slug
        : undefined;
    const receiptUrl =
      typeof resolvedSearchParams.receipt_url === "string"
        ? resolvedSearchParams.receipt_url
        : undefined;
    const captureMethod =
      typeof resolvedSearchParams.capture_method === "string"
        ? resolvedSearchParams.capture_method
        : undefined;

    if (paymentStatus === "success" && orderNsu) {
      const invoice = await prisma.invoice.findFirst({
        where: {
          OR: [
            { invoiceNumber: orderNsu },
            { id: orderNsu },
            { gatewayPaymentId: orderNsu },
          ],
        },
        include: {
          items: { include: { installment: true } },
        },
      });

      if (invoice && invoice.status !== "PAID") {
        const isPixPayment = String(captureMethod || "pix").toLowerCase() === "pix";

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
      }
    }
  } catch (reconcileError: unknown) {
    console.warn("[ClientDashboardPage] Erro não fatal na reconciliação síncrona InfinitePay:", reconcileError);
  }

  let data;
  try {
    data = await getClientDashboardData();
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Erro desconhecido";
    console.error("Erro ao carregar área do cliente:", message);
    redirect("/login");
  }

  return <PortalDashboardView data={data} isFirstLogin={data.isFirstLogin} />;
}
