import crypto from 'crypto';

interface CheckoutParams {
  amount: number;
  orderId: string;
  email: string;
  address: {
    city: string;
    postOffice: string;
  };
}

export async function createFondyCheckoutUrl({ amount, orderId, email, address }: CheckoutParams) {
    const merchantId = process.env.FOUNDY_ID;
    const secretKey = process.env.FOUNDY_API_KEY;
  
    if (!merchantId || !secretKey) {
      throw new Error("Fondy credentials missing");
    }
  
    // 1. Формируем только те поля, которые Fondy учитывает в подписи по умолчанию
    const requestData: any = {
      amount: Math.round(amount * 100),
      currency: 'UAH',
      merchant_id: merchantId,
      order_desc: `Оплата заказа #${orderId}`,
      order_id: String(orderId),
      response_url: `${process.env.NEXT_PUBLIC_SITE_URL}/thanks`,
      sender_email: email,
      server_callback_url: `${process.env.NEXT_PUBLIC_SITE_URL}/api/webhooks/fondy`,
    };
  
    // 2. Генерация подписи строго по алфавиту ключей
    const orderedKeys = Object.keys(requestData).sort();
    const signatureString = [secretKey, ...orderedKeys.map(key => requestData[key])].join('|');
    const signature = crypto.createHash('sha1').update(signatureString).digest('hex');
  
    try {
      const response = await fetch('https://pay.fondy.eu/api/checkout/url/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          request: {
            ...requestData,
            signature,
            // Дополнительные поля передаем ВНЕ подписи (Fondy их увидит, но в хеш они не пойдут)
            shipping_city: address.city || "Киев",
            shipping_address: address.postOffice || "1"
          }
        })
      });
  
      const result = await response.json();
  
      // Если Fondy вернул ошибку (например, неверная сигнатура)
      if (result.response.response_status === 'failure') {
        console.error("Fondy Reject:", result.response.error_message);
        throw new Error(result.response.error_message);
      }
  
      return result.response.checkout_url;
    } catch (error: any) {
      throw error;
    }
  }