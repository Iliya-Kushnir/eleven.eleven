"use client";

import RecoverForm from "@/components/RecoverPassword/RecoverPassword";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recover Password | eleven:eleven",
  description: "Reset your account password."
}

export default function RecoverPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl mb-6">Forgot Password?</h1>
      <RecoverForm />
    </div>
  );
}
