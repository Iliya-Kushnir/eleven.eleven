// pages/api/auth/reset.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { customerResetByUrl } from "@/lib/shopify";

type ResetRequestBody = {
  resetUrl: string;
  password: string;
};

type ResetResponse = {
  ok?: boolean;
  error?: string;
  errors?: { field: string[] | null; message: string; code: string | null }[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResetResponse>
) {
  if (req.method !== "POST") return res.status(405).end();

  const body = req.body as ResetRequestBody;
  let { resetUrl, password } = body;

  if (!resetUrl || !password) {
    return res.status(400).json({ error: "resetUrl and password required" });
  }

  // Иногда URL приходит закодированным — декодируем
  try {
    resetUrl = decodeURIComponent(resetUrl);
  } catch {
    // игнорируем ошибки декодирования
  }

  // Валидация пароля (Shopify: 5-40 символов)
  if (typeof password !== "string" || password.length < 5 || password.length > 40) {
    return res.status(400).json({ error: "Password must be between 5 and 40 characters" });
  }

  try {
    const data = await customerResetByUrl(resetUrl, password);

    const errors = data?.customerResetByUrl?.customerUserErrors ?? [];
    if (errors.length) {
      return res.status(400).json({ errors });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("reset error:", err);
    return res.status(500).json({ error: "Server error" });
  }
}
