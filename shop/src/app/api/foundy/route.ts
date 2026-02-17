import { NextResponse } from "next/server";
import crypto from "crypto";
import { createShopifyOrder } from "@/lib/shopify-admin";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { signature, ...params } = data;

    // Проверка подписи в обратную сторону
    const sortedValues = Object.keys(params).sort().map(k => params[k])
      .filter(v => v !== "" && v !== null).join("|");

    const calcSign = crypto.createHash("sha1")
      .update(`${process.env.FONDY_PASSWORD}|${sortedValues}`).digest("hex");

    if (calcSign !== signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    if (data.order_status === "approved") {
      const meta = JSON.parse(data.merchant_data);
      await createShopifyOrder({
        lineItems: meta.lines,
        customerId: meta.customerId,
        shippingAddress: meta.address,
        email: data.sender_email
      });
    }
    return NextResponse.json({ message: "OK" });
  } catch (err) {
    return NextResponse.json({ error: "Webhook Error" }, { status: 500 });
  }
}