import styles from "./page.module.scss"
const showPage = true

import { Metadata } from "next"
import { getTranslations } from "@/lib/get-translations";

export const metadata: Metadata = {
  title: "Privacy Policy | eleven:eleven",
  description: "How we protect and manage your personal data."
}

export default async function PrivacyPage() {

    if (!showPage) {
        return <p>Unavailoble page</p>
    }
    
    const { t } = await getTranslations();

    return (
      <div className="font-sans flex flex-col items-center justify-items-center p-2.5 pb-2.5 pt-[75px] sm:p-20">
        <h1 className={styles.heading}>{t('info.privacy.title')}</h1>
        <p className={styles.paragraph}>{t('info.privacy.intro')}</p>
  
        <h1 className={styles.heading}>{t('info.privacy.collection_title')}</h1>
        <p className={styles.paragraph}>{t('info.privacy.collection_text1')}</p>
        <p className={styles.paragraph}>{t('info.privacy.collection_text2')}</p>
        <p className={styles.paragraph}>{t('info.privacy.collection_text3')}</p>
        <p className={styles.paragraph}>{t('info.privacy.collection_text4')}</p>
  
        <h1 className={styles.heading}>{t('info.privacy.third_party_title')}</h1>
        <p className={styles.paragraph}>{t('info.privacy.third_party_text')}</p>
  
        <p className={styles.paragraph}><strong>{t('info.privacy.exceptions_title')}</strong></p>
        <p className={styles.paragraph}>{t('info.privacy.exceptions_text')}</p>
  
        <h1 className={styles.heading}>{t('info.privacy.protection_title')}</h1>
        <p className={styles.paragraph}>{t('info.privacy.protection_text')}</p>
  
        <h1 className={styles.heading}>{t('info.privacy.compliance_title')}</h1>
        <p className={styles.paragraph}>{t('info.privacy.compliance_text')}</p>
  
        <p className={styles.paragraph}>{t('info.privacy.thanks')}</p>
        <p className={styles.paragraph}>ELEVEN:ELEVEN UA</p>
      </div>
    );
}