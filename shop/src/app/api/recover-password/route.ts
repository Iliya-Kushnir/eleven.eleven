// pages/api/auth/recover.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { recoverCustomerPassword } from "@/lib/shopify";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email required" });

  try {
    const data = await recoverCustomerPassword(email);
    const errors = data?.customerRecover?.customerUserErrors ?? [];
    if (errors.length) return res.status(400).json({ errors });
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("recover error:", err);
    return res.status(500).json({ error: "Server error" });
  }
}
