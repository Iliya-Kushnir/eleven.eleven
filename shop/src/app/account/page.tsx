import CustomerInfo from "@/components/PrivatData/PrivatData"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "My Account | eleven:eleven",
    description: "Manage your orders and personal information."
}

export default function Products() {
    return (
    <div className="font-sans flex flex-col items-center justify-items-center  p-2.5 pb-2.5 pt-[75px] sm:p-20">
        <CustomerInfo />
    </div>
    )
}