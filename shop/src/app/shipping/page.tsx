import styles from "./page.module.scss"
import { getTranslations } from "@/lib/get-translations";

const showPage = true

import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Shipping | eleven:eleven",
  description: "Delivery times, costs, and international shipping info."
}

export default async function Products() {
  if (!showPage) {
    return <p>Unavailoble page</p>
}

const { t } = await getTranslations();

return (
  <div className="font-sans flex flex-col items-center justify-items-center p-2.5 pb-2.5 pt-[75px] sm:p-20">
    <h1 className={styles.heading}>{t('info.delivery.main_title')}</h1>
    
    <h1 className={styles.heading}>{t('info.delivery.delivery_title')}</h1>
    <p className={styles.paragraph}>{t('info.delivery.ua_text')}</p>
    <p className={styles.paragraph}>{t('info.delivery.intl_text')}</p>
    <p className={styles.paragraph}>{t('info.delivery.check_cost')}</p>
    <p className={styles.paragraph}>{t('info.delivery.customs_note')}</p>
    <p className={styles.paragraph}>{t('info.delivery.delay_note')}</p>
    <p className={styles.paragraph}>{t('info.delivery.contact_insta')}</p>

    <h1 className={styles.heading}>{t('info.delivery.payment_title')}</h1>
    <p className={styles.paragraph}>{t('info.delivery.payment_text')}</p>

    <h1 className={styles.heading}>{t('info.delivery.preorder_title')}</h1>
    <p className={styles.paragraph}>{t('info.delivery.preorder_text')}</p>

    <p className={styles.paragraph}>{t('info.delivery.thanks')}</p>
    <p className={styles.paragraph}>ELEVEN EL EVEN</p>
  </div>
);
}