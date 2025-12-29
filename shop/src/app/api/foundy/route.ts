import { NextResponse } from "next/server";
import crypto from "crypto";
import { createShopifyOrder } from "@/lib/shopify-admin"; // Эту функцию создадим следующим шагом

// Секретный ключ из кабинета Fondy (Merchant Password)
const FONDY_MERCHANT_PASSWORD = process.env.FONDY_PASSWORD;

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // 1. Проверка подписи Fondy (Security Check)
    const { signature, ...params } = data;
    
    // Сортируем параметры по алфавиту и склеиваем через |
    const sortedValues = Object.keys(params)
      .sort()
      .map((key) => params[key])
      .filter((value) => value !== "" && value !== null)
      .join("|");

    const calculatedSignature = crypto
      .createHash("sha1")
      .update(`${FONDY_MERCHANT_PASSWORD}|${sortedValues}`)
      .digest("hex");

    if (calculatedSignature !== signature) {
      console.error("❌ Invalid Fondy Signature");
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    // 2. Проверяем статус платежа
    if (data.order_status === "approved") {
      console.log("✅ Payment approved for order:", data.order_id);

      // 3. Создаем заказ в Shopify
      // Обычно в data.merchant_data мы передаем cartId или данные клиента
      const merchantData = data.merchant_data ? JSON.parse(data.merchant_data) : {};
      
      const shopifyOrder = await createShopifyOrder({
        lineItems: merchantData.lines,
        customer: merchantData.customer,
        shippingAddress: merchantData.address,
        totalPrice: data.amount / 100, // Fondy присылает в копейках
        orderId: data.order_id
      });

      if (shopifyOrder) {
        return NextResponse.json({ message: "Order created" }, { status: 200 });
      }
    }

    return NextResponse.json({ message: "Webhook received" }, { status: 200 });
  } catch (err) {
    console.error("🔥 Webhook Error:", err);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }
}