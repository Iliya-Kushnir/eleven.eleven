// pages/api/auth/reset.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { customerResetByUrl } from "@/lib/shopify";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  let { resetUrl, password } = req.body;
  if (!resetUrl || !password) return res.status(400).json({ error: "resetUrl and password required" });

  // Иногда URL приходит закодированным — декодируем
  try {
    resetUrl = decodeURIComponent(resetUrl);
  } catch (e) {
    // ignore
  }

  // Валидация пароля (Shopify: 5-40)
  if (typeof password !== "string" || password.length < 5 || password.length > 40) {
    return res.status(400).json({ error: "Password must be between 5 and 40 characters" });
  }

  try {
    const data = await customerResetByUrl(resetUrl, password);
    const errors = data?.customerResetByUrl?.customerUserErrors ?? [];
    if (errors.length) return res.status(400).json({ errors });
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("reset error:", err);
    return res.status(500).json({ error: "Server error" });
  }
}
