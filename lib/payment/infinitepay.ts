export interface CreateCheckoutLinkParams {
  orderNsu: string;
  amountInCents?: number;
  items: Array<{
    description: string;
    price?: number; // Em centavos
    amount?: number; // Em reais
    quantity?: number;
  }>;
  customer?: {
    name: string;
    email: string;
    phone?: string;
  };
  redirectUrl?: string;
  webhookUrl?: string;
}

export async function createInfinitePayCheckoutLink(params: CreateCheckoutLinkParams) {
  const apiKey = process.env.INFINITEPAY_API_KEY;
  const handle = (process.env.INFINITEPAY_HANDLE || "mindsite").replace(/^\$/, "").trim();

  // Garante domínio de produção como base para callbacks externos
  const baseUrl = (process.env.NEXT_PUBLIC_APP_URL || "https://mindsite.com.br").replace(/\/$/, "");

  const redirectUrl =
    params.redirectUrl ||
    `${baseUrl}/portal/dashboard?payment=success&order_nsu=${encodeURIComponent(params.orderNsu)}`;
  const webhookUrl = params.webhookUrl || `${baseUrl}/api/webhooks/infinitepay`;

  const formattedItems = params.items.map((item) => ({
    quantity: item.quantity || 1,
    price:
      typeof item.price === "number"
        ? Math.round(Number(item.price))
        : Math.round(Number(item.amount || 0) * 100),
    description: item.description.trim(),
  }));

  const payload: Record<string, unknown> = {
    handle,
    order_nsu: params.orderNsu,
    items: formattedItems,
    redirect_url: redirectUrl,
    webhook_url: webhookUrl,
  };

  if (params.customer) {
    payload.customer = {
      name: params.customer.name,
      email: params.customer.email,
      phone_number: params.customer.phone || undefined,
    };
  }

  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (apiKey) {
      headers["X-Api-Key"] = apiKey;
    }

    const res = await fetch("https://api.checkout.infinitepay.io/links", {
      method: "POST",
      headers,
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
    console.error("[InfinitePay Link Gen Error]:", message);
    return {
      success: false,
      error: message,
    };
  }
}