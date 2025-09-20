"use client";

import RecoverForm from "@/components/RecoverPassword/RecoverPassword";

export default function RecoverPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl mb-6">Forgot Password?</h1>
      <RecoverForm />
    </div>
  );
}
