/* eslint-disable @typescript-eslint/no-explicit-any */
import crypto from 'crypto';

export async function createFondyCheckoutUrl({ amount, orderId, email, currency, address }: any) {
    // ВАЖНО: Проверь, чтобы эти имена совпадали с твоим .env.local
    const merchantId = process.env.FOUNDY_ID; 
    const secretKey = process.env.FOUNDY_API_KEY;
  
    if (!merchantId || !secretKey) {
      console.error("КЛЮЧИ НЕ НАЙДЕНЫ! Проверь .env.local");
      throw new Error("Fondy credentials missing");
    }
  
    // 1. Формируем чистый объект без лишних полей
    const requestData: any = {
      amount: String(amount),
      currency: currency || 'UAH',
      merchant_id: String(merchantId),
      order_desc: `Order ${orderId}`,
      order_id: String(orderId),
      response_url: `${process.env.NEXT_PUBLIC_SITE_URL}/thanks`,
      sender_email: email,
      server_callback_url: `${process.env.NEXT_PUBLIC_SITE_URL}/api/webhook`,
    };
  
    // 2. Генерация подписи строго по правилам Fondy
    const signatureString = [
      secretKey,
      ...Object.keys(requestData).sort().map(key => requestData[key])
    ].join('|');
    
    const signature = crypto.createHash('sha1').update(signatureString).digest('hex');
  
    try {
      const response = await fetch('https://pay.fondy.eu/api/checkout/url/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          request: {
            ...requestData,
            signature,
            // Передаем адрес вне подписи, чтобы не ломать её
            shipping_city: address?.city || "Kyiv",
            shipping_address: address?.address1 || "Delivery"
          }
        })
      });
  
      const result = await response.json();
  
      // Если Fondy вернул ошибку (например, General Decline)
      if (result.response.response_status === 'failure') {
        console.log("ОТКАЗ ФОНДИ:", result.response.error_message);
        // Вместо throw new Error, возвращаем ошибку как текст
        return { error: result.response.error_message };
      }
  
      return { checkout_url: result.response.checkout_url };
    } catch (error: any) {
      console.error("КРИТИЧЕСКАЯ ОШИБКА В LIB/FOUNDY:", error.message);
      return { error: error.message };
    }
}