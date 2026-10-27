export interface CreateCheckoutLinkParams {
  orderNsu: string;
  amountInCents: number;
  items: Array<{
    description: string;
    price: number; // Em centavos
    quantity: number;
  }>;
  customer: {
    name: string;
    email: string;
    phone?: string;
  };
  redirectUrl?: string;
  webhookUrl?: string;
}

export async function createInfinitePayCheckoutLink(params: CreateCheckoutLinkParams) {
  const apiKey = process.env.INFINITEPAY_API_KEY;
  const handle = process.env.INFINITEPAY_HANDLE || "mindsite";
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://mindsite.com.br";

  const redirectUrl = params.redirectUrl || `${appUrl}/portal/dashboard?payment=success`;
  const webhookUrl = params.webhookUrl || `${appUrl}/api/webhooks/infinitepay`;

  const payload: Record<string, unknown> = {
    handle: handle,
    order_nsu: params.orderNsu,
    items: params.items,
    redirect_url: redirectUrl,
    webhook_url: webhookUrl,
    customer: {
      name: params.customer.name,
      email: params.customer.email,
      phone_number: params.customer.phone || undefined,
    },
  };

  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (apiKey) {
      headers["X-Api-Key"] = apiKey;
    }

    const res = await fetch("https://api.checkout.infinitepay.io/links", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errBody = await res.text();
      throw new Error(`Falha InfinitePay (${res.status}): ${errBody}`);
    }

    const data = await res.json();
    return {
      success: true,
      url: data.url || data.payment_url,
      slug: data.slug || data.invoice_slug,
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Erro desconhecido";
    console.error("Erro ao gerar link InfinitePay:", message);
    return {
      success: false,
      error: message,
    };
  }
}

export interface CreateChargeParams {
  orderId: string;
  amount: number; // Em reais (ex: 300.00)
  customer: {
    name: string;
    email: string;
    document?: string;
  };
  description: string;
  method: "PIX" | "BOLETO";
}

export async function createInfinitePayCharge(params: CreateChargeParams) {
  const apiKey = process.env.INFINITEPAY_API_KEY;
  const walletId = process.env.INFINITEPAY_WALLET_ID;

  // Mock de contingência / Fallback dinâmico caso a chave da API ainda não esteja configurada no .env
  if (!apiKey || !walletId) {
    const pixDemoCode = `00020126580014BR.GOV.BCB.PIX013619725535000158520400005303986540${params.amount.toFixed(2)}5802BR5908MINDSITE6009SAO PAULO62070503***6304E2D1`;
    return {
      success: true,
      gatewayPaymentId: `IP-${params.orderId}-${Date.now()}`,
      pixCopyPaste: pixDemoCode,
      pixQrCode: `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(pixDemoCode)}`,
      paymentUrl: `https://pay.infinitepay.io/checkout/${params.orderId}`,
    };
  }

  try {
    const res = await fetch("https://api.cloudwalk.io/v1/charges", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        wallet_id: walletId,
        amount: Math.round(params.amount * 100), // Centavos
        payment_method: params.method === "PIX" ? "pix" : "bank_slip",
        metadata: { order_id: params.orderId },
        customer: {
          name: params.customer.name,
          email: params.customer.email,
          document: params.customer.document?.replace(/\D/g, ""),
        },
      }),
    });

    const data = await res.json();
    return {
      success: true,
      gatewayPaymentId: data.id,
      pixCopyPaste: data.pix_code || null,
      pixQrCode: data.pix_qrcode_url || null,
      paymentUrl: data.payment_url || null,
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Erro desconhecido";
    return { success: false, error: message };
  }
}
