import ResetPasswordForm from "@/components/ChangePasswordForm/ChangePasswordForm";
import RecoverPassword from "@/components/RecoverPassword/RecoverPassword";
import { Metadata } from "next";

type PageProps = {
  searchParams: Promise<{ resetUrl?: string }>;
};

export const metadata: Metadata = {
  title: "Change Password | eleven:eleven",
  description: "Update your account security settings."
}

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



