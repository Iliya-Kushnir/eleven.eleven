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



