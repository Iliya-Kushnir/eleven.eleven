import styles from "./page.module.scss"
import { Metadata } from "next"
import { getTranslations } from "@/lib/get-translations";

const showPage = true

export const metadata: Metadata = {
    title: "Terms Policy",
    description: ""
}

export default async function Terms() {
    if (!showPage) {
        return <p>Unavailable page</p>
    }

    const { t } = await getTranslations();
    
    return (
        <div className="font-sans flex flex-col items-center justify-center min-h-[calc(100vh-75px)] p-2.5 pb-2.5 pt-[75px] sm:p-20">
          <div className={styles.wrapper} style={{ textAlign: 'center', maxWidth: '600px' }}>
            <h1 className={styles.heading}>{t('info.contacts.title')}</h1>
    
            <div className="mt-10">
              <h2 className={styles.heading} style={{ fontSize: '14px', marginBottom: '10px' }}>
                {t('info.contacts.support_title')}
              </h2>
              <p className={styles.paragraph}>{t('info.contacts.support_text')}</p>
              <p className={styles.paragraph}>
                <strong>{t('info.contacts.email')}</strong>
              </p>
            </div>
    
            <div className="mt-10">
              <h2 className={styles.heading} style={{ fontSize: '14px', marginBottom: '10px' }}>
                {t('info.contacts.social_title')}
              </h2>
              <p className={styles.paragraph}>{t('info.contacts.social_text')}</p>
              <p className={styles.paragraph}>
                <strong>{t('info.contacts.insta')}</strong>
              </p>
            </div>
    
            <div className="mt-10">
              <h2 className={styles.heading} style={{ fontSize: '14px', marginBottom: '10px' }}>
                {t('info.contacts.business_title')}
              </h2>
              <p className={styles.paragraph}>{t('info.contacts.business_text')}</p>
              <p className={styles.paragraph}>
                <strong>{t('info.contacts.email')}</strong>
              </p>
            </div>
    
            <div className="mt-10 pt-10 border-t border-gray-100">
              <h2 className={styles.heading} style={{ fontSize: '12px', marginBottom: '5px' }}>
                {t('info.contacts.location_title')}
              </h2>
              <p className={styles.paragraph}>{t('info.contacts.location_text')}</p>
            </div>
          </div>
        </div>
      );
}