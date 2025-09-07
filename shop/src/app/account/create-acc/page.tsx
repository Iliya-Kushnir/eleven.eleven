import EmailForm from "@/components/registration/registration"


export default function Products() {
    return (
    <div className="font-sans flex flex-col items-center justify-items-center  p-2.5 pb-2.5 pt-[75px] sm:p-20">
        <EmailForm label="CREATE ACCOUNT" mode="register"/>
    </div>
    )
}