/*
"use client";

import { useState } from "react";

interface ResetPasswordFormProps {
  resetUrl: string;
}

export default function ResetPasswordForm({ resetUrl }: ResetPasswordFormProps) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Пароли не совпадают!");
      return;
    }

    try {
      const res = await fetch("/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resetUrl, newPassword: password }),
      });

      const data = await res.json();

      if (data?.customerResetByUrl?.customerUserErrors?.length > 0) {
        alert(data.customerResetByUrl.customerUserErrors[0].message);
        return;
      }

      alert("✅ Пароль успешно изменён!");
      window.location.href = "/account/login";
    } catch (error) {
      console.error(error);
      alert("Произошла ошибка. Попробуйте позже.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80">
      <input
        type="password"
        placeholder="Новый пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border rounded p-2"
        required
      />
      <input
        type="password"
        placeholder="Подтвердите пароль"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="border rounded p-2"
        required
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Сменить пароль
      </button>
    </form>
  );
}



"use client";

import React from "react";
import RecoverPassword from "@/components/RecoverPassword/RecoverPassword";

interface PageProps {
  searchParams?: { resetUrl?: string }; // Next.js передаёт searchParams автоматически
}

const ChangePasswordPage: React.FC<PageProps> = ({ searchParams }) => {
  const resetUrl = searchParams?.resetUrl || "";

  return (
    <div className="flex justify-center items-center min-h-screen">
      <RecoverPassword  />
    </div>
  );
};

export default ChangePasswordPage;
*/

import ResetPasswordForm from "@/components/ChangePasswordForm/ChangePasswordForm";
import RecoverPassword from "@/components/RecoverPassword/RecoverPassword";

type PageProps = {
  searchParams: Promise<{ resetUrl?: string }>;
};

export default async function ChangePasswordPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const resetUrl = params?.resetUrl || "";

  return (
    <div className="flex justify-center items-center min-h-screen">
      {resetUrl ? (
        <ResetPasswordForm resetUrl={resetUrl} />
      ) : (
        <RecoverPassword />
      )}
    </div>
  );
}



