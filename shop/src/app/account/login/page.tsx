import EmailForm from "@/components/login/loginForm"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Login | eleven:eleven",
    description: "Sign in to your eleven:eleven account."
}

export default function Products() {
    return (
    <div className="font-sans flex flex-col items-center justify-items-center  p-2.5 pb-2.5 pt-[75px] sm:p-20">
        <EmailForm />
    </div>
    )
}