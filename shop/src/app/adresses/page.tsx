import DefaultButton from "@/components/defaultButton/defaultButton";
import AddressesFeed from "@/components//adressesFeed/addressesFeed";
import EmailForm from "@/components/registration/registration";
import Link from "next/link";
import styles from "./page.module.scss"

export default function Adresses() {

    return (
        <div className="font-sans flex flex-col items-center justify-items-center  p-2.5 pb-2.5 pt-[75px] sm:p-20">
            <h1 className={styles.heading}>addresses</h1>
            <Link  href="/account">
            <p className={styles.link}>RETURN TO ACCOUNT DETAILS</p>
            </Link>

            <div className="w-[165px] h-[50px]">
            <DefaultButton
            label="ADD NEW ADDRESSES"
            />
            </div>

            <EmailForm mode="address"/>

            <AddressesFeed />
        </div>
    )
}