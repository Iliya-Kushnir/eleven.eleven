import EmailForm from "@/components/registration/registration"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Create Account | eleven:eleven",
    description: "Join eleven:eleven and manage your style."
}

export default function Products() {
    return (
    <div className="font-sans flex flex-col items-center justify-items-center  p-2.5 pb-2.5 pt-[75px] sm:p-20">
        <EmailForm label="CREATE ACCOUNT" mode="register"/>
    </div>
    )
}