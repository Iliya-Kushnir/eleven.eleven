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
        type="text"
        placeholder="Новый пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border rounded p-2"
        required
      />
      <input
        type="text"
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
