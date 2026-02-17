import crypto from 'crypto';

export async function createFondyCheckoutUrl(params: any) {
  const { FONDY_MERCHANT_ID, FONDY_PASSWORD, NGROK_URL, NEXT_PUBLIC_SITE_URL } = process.env;

  // Формируем объект строго с теми полями, которые Fondy ждет в подписи
  const requestData: any = {
    amount: String(params.amount),
    currency: params.currency || 'UAH',
    merchant_data: params.merchant_data || "", 
    merchant_id: String(FONDY_MERCHANT_ID),
    order_desc: params.order_desc || `Order ${params.orderId}`,
    order_id: String(params.orderId),
    response_url: `${NEXT_PUBLIC_SITE_URL}/thanks`,
    sender_email: params.email,
    server_callback_url: `${NGROK_URL}/api/foundy`,
  };

  // Сортируем ключи и собираем строку для подписи: Password|val1|val2...
  const signatureString = [
    FONDY_PASSWORD,
    ...Object.keys(requestData).sort().map(key => requestData[key])
  ].join('|');

  const signature = crypto.createHash('sha1').update(signatureString).digest('hex');

  const response = await fetch('https://pay.fondy.eu/api/checkout/url/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ request: { ...requestData, signature } })
  });

  const result = await response.json();
  if (result.response?.response_status === 'failure') {
    return { error: result.response.error_message };
  }
  return { checkout_url: result.response?.checkout_url };
}