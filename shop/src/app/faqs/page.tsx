import styles from "./page.module.scss"
import { Metadata } from "next"

const showPage = true

export const metadata: Metadata = {
    title: "FAQs",
    description: "Frequently Asked Questions about eleven:eleven"
}

export default function FAQPage() {
    if (!showPage) {
        return <p>Unavailable page</p>
    }

    return (
        <div className="font-sans flex flex-col items-center p-2.5 pb-2.5 pt-[75px] sm:p-20">
            {/* Добавлена обертка wrapper для центровки всей группы текста */}
            <div className={styles.wrapper}>
                <h1 className={styles.heading}>FAQS</h1>

                <h2 className={styles.heading}>WHERE ARE YOU BASED?</h2>
                <p className={styles.paragraph}>
                    eleven:eleven was born and remains in Ukraine. We stand for local craftsmanship and high-quality production standards.
                </p>

                <h2 className={styles.heading}>WHAT MATERIALS DO YOU USE?</h2>
                <p className={styles.paragraph}>
                    Most of our products are made out of high-quality organic materials, ensuring that every garment meets our standards for comfort and durability.
                </p>

                <h2 className={styles.heading}>HOW SHOULD I WASH YOUR PRODUCTS?</h2>
                <p className={styles.paragraph}>
                    We always recommend washing every garment at cold temperatures (20ºC - 30ºC) selecting a gentle cycle to maintain the fabric's properties. Avoid tumble drying.
                </p>

                <h2 className={styles.heading}>WHAT IS THE PROCESS BEHIND EACH PRODUCT?</h2>
                <p className={styles.paragraph}>
                    From fabric selection to hand-cutting patterns and meticulous sewing in our atelier, every step is controlled to ensure the final result is perfect.
                </p>

                <h2 className={styles.heading}>WHERE DO YOU PRODUCE YOUR GARMENTS?</h2>
                <p className={styles.paragraph}>
                    Our whole production is local. This allows us to directly control each part of the process and guarantee the highest quality for each garment.
                </p>

                <h2 className={styles.heading}>DO YOU SHIP WORLDWIDE?</h2>
                <p className={styles.paragraph}>
                    Yes, we ship internationally. Shipping costs and times will be calculated at checkout depending on your location.
                </p>

                <h2 className={styles.heading}>HOW LONG DOES SHIPPING TAKE?</h2>
                <p className={styles.paragraph}>
                    Orders within Ukraine usually take 2–4 business days, while international orders may take 5–15 business days depending on the destination.
                </p>

                <h2 className={styles.heading}>CAN I RETURN OR EXCHANGE AN ITEM?</h2>
                <p className={styles.paragraph}>
                    Yes, you may return or exchange your item within 14 days of receiving it, provided it is in its original condition.
                </p>

                <h2 className={styles.heading}>HOW CAN I CONTACT YOU?</h2>
                <p className={styles.paragraph}>
                    You can reach out to us anytime via our contact form or by emailing support@eleveneleven.com.
                </p>
            </div>
        </div>
    )
}