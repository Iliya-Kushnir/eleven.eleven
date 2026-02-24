import styles from "./page.module.scss"
import { Metadata } from "next"
import { getTranslations } from "@/lib/get-translations";

const showPage = true

export const metadata: Metadata = {
    title: "FAQs",
    description: "Frequently Asked Questions about eleven:eleven"
}

export default async function FAQPage() {
    if (!showPage) {
        return <p>Unavailable page</p>
    }

    const { t } = await getTranslations();

    return (
        <div className="font-sans flex flex-col items-center p-2.5 pb-2.5 pt-[75px] sm:p-20">
          <div className={styles.wrapper}>
            <h1 className={styles.heading}>{t('info.faqs.title')}</h1>
    
            <h2 className={styles.heading}>{t('info.faqs.q1')}</h2>
            <p className={styles.paragraph}>{t('info.faqs.a1')}</p>
    
            <h2 className={styles.heading}>{t('info.faqs.q2')}</h2>
            <p className={styles.paragraph}>{t('info.faqs.a2')}</p>
    
            <h2 className={styles.heading}>{t('info.faqs.q3')}</h2>
            <p className={styles.paragraph}>{t('info.faqs.a3')}</p>
    
            <h2 className={styles.heading}>{t('info.faqs.q4')}</h2>
            <p className={styles.paragraph}>{t('info.faqs.a4')}</p>
    
            <h2 className={styles.heading}>{t('info.faqs.q5')}</h2>
            <p className={styles.paragraph}>{t('info.faqs.a5')}</p>
    
            <h2 className={styles.heading}>{t('info.faqs.q6')}</h2>
            <p className={styles.paragraph}>{t('info.faqs.a6')}</p>
    
            <h2 className={styles.heading}>{t('info.faqs.q7')}</h2>
            <p className={styles.paragraph}>{t('info.faqs.a7')}</p>
    
            <h2 className={styles.heading}>{t('info.faqs.q8')}</h2>
            <p className={styles.paragraph}>{t('info.faqs.a8')}</p>
    
            <h2 className={styles.heading}>{t('info.faqs.q9')}</h2>
            <p className={styles.paragraph}>{t('info.faqs.a9')}</p>
          </div>
        </div>
      );
}