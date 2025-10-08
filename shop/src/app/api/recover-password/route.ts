import { NextResponse } from "next/server";
import { recoverCustomerPassword } from "@/lib/shopify";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    const data = await recoverCustomerPassword(email);
    const errors = data?.customerRecover?.customerUserErrors ?? [];

    if (errors.length) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("recover error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
