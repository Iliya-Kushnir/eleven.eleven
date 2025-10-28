import { NextResponse } from "next/server";
import { recoverCustomerPassword } from "@/lib/shopify";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    const redirectUrl = "https://eleven-eleven.vercel.app/account/change-password"; // ⬅️ твой домен на Vercel

    const data = await recoverCustomerPassword(email);
    const errors = data?.customerRecover?.customerUserErrors ?? [];

    if (errors.length) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("recover error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
