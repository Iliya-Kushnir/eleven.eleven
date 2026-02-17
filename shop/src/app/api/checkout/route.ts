import { NextResponse } from 'next/server';
import { createFondyCheckoutUrl } from '@/lib/foundy';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // merchantData БЕЗ пробелов для стабильной подписи
    const merchantData = JSON.stringify({
      lines: body.cartItems,
      customerId: body.customerId || null,
      address: body.address
    });

    const result = await createFondyCheckoutUrl({
      amount: body.amount,
      orderId: body.orderId,
      email: body.email,
      currency: body.currency,
      merchant_data: merchantData
    });

    if (result.error) return NextResponse.json({ error: result.error });
    return NextResponse.json({ checkout_url: result.checkout_url });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}