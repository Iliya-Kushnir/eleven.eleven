/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable */
import { NextResponse } from 'next/server';
import { createFondyCheckoutUrl } from '@/lib/foundy';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    if (!body.amount || !body.orderId || !body.email) {
      return NextResponse.json(
        { error: "Missing required fields: amount, orderId, or email" },
        { status: 400 }
      );
    }

    // Вызываем функцию и получаем результат (объект с URL или с ошибкой)
    const result = await createFondyCheckoutUrl({
      amount: body.amount,
      orderId: body.orderId,
      email: body.email,
      currency: body.currency,
      address: body.address || { city: "", address1: "" }
    });

    // ИСПРАВЛЕНИЕ: Если функция вернула ошибку от Fondy (например, General decline)
    if (result.error) {
      console.error("FONDY REJECTED:", result.error);
      // Возвращаем ошибку в корне объекта, чтобы фронтенд её увидел
      return NextResponse.json({ error: result.error }, { status: 200 });
    }

    // ИСПРАВЛЕНИЕ: Возвращаем только чистую ссылку
    return NextResponse.json({ checkout_url: result.checkout_url });

  } catch (error: any) {
    console.error("--- API ROUTE ERROR ---");
    console.error("Message:", error.message);
    
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}