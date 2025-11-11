import { NextResponse } from "next/server";
import { customerResetByUrl } from "@/lib/shopify";

type ResetRequestBody = {
  resetUrl: string;
  password: string;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ResetRequestBody;
    let { resetUrl } = body;
    const { password } = body;

    if (!resetUrl || !password) {
      return NextResponse.json(
        { error: "resetUrl and password required" },
        { status: 400 }
      );
    }

    try {
      resetUrl = decodeURIComponent(resetUrl);
    } catch {
    }

    if (
      typeof password !== "string" ||
      password.length < 5 ||
      password.length > 40
    ) {
      return NextResponse.json(
        { error: "Password must be between 5 and 40 characters" },
        { status: 400 }
      );
    }

    const data = await customerResetByUrl(resetUrl, password);
    const errors = data?.customerResetByUrl?.customerUserErrors ?? [];

    if (errors.length) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("reset error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
