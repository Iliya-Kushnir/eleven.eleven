import { NextResponse } from 'next/server';
import { createFondyCheckoutUrl } from '@/lib/foundy';

export async function POST(req: Request) {
  try {
    // 1. Получаем данные из тела запроса
    const body = await req.json();
    
    // 2. Базовая валидация (проверяем, что все нужные данные пришли)
    if (!body.amount || !body.orderId || !body.email) {
      return NextResponse.json(
        { error: "Missing required fields: amount, orderId, or email" },
        { status: 400 }
      );
    }

    // 3. Вызываем функцию из нашей библиотеки fondy.ts
    // Мы передаем весь объект body, так как его структура совпадает с CheckoutParams
    const checkout_url = await createFondyCheckoutUrl({
      amount: body.amount,
      orderId: body.orderId,
      email: body.email,
      address: body.address || { city: "", postOffice: "" } // Защита от отсутствия адреса
    });

    // 4. Если по какой-то причине URL не пришел (хотя функция должна выбросить ошибку)
    if (!checkout_url) {
      return NextResponse.json(
        { error: "Fondy API did not return a checkout URL" },
        { status: 400 }
      );
    }

    // 5. Возвращаем успешный ответ с ссылкой
    return NextResponse.json({ checkout_url });

  } catch (error: any) {
    // Логируем ошибку именно на сервере, чтобы ты видел её в консоли VS Code
    console.error("--- API ROUTE ERROR ---");
    console.error("Message:", error.message);
    
    // Возвращаем ошибку фронтенду, чтобы сработал блок catch в ShoppingCartComponent
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}