import styles from "./page.module.scss"
import { Metadata } from "next"
import { getTranslations } from "@/lib/get-translations";

const showPage = true

export const metadata: Metadata = {
    title: "Terms of Service | eleven:eleven",
    description: "Rules and regulations for using our website."
}

export default async function Terms() {
    if (!showPage) {
        return <p>Unavailable page</p>
    }

    const { t } = await getTranslations();
    
    return (
        /* Внешний контейнер с принудительным text-center */
        <div className="font-sans flex flex-col items-center text-center w-full p-2.5 pb-2.5 pt-[75px] sm:p-20">
            <div className={styles.container} style={{ textAlign: 'center', width: '100%', maxWidth: '800px' }}>
                
                {/* Исправлено: используем info.terms.title */}
                <h1 className={styles.title} style={{ textAlign: 'center', padding: "10px", margin: 0 }}>
                    {t('info.terms.title')}
                </h1>

                {/* Исправлено: заголовок общих условий */}
                <h2 className={styles.heading} style={{ textAlign: 'center', padding: "10px", margin: 0 }}>
                    {t('info.terms.general_title')}
                </h2>
                <p className={styles.paragraph} style={{ textAlign: 'center', padding: "10px", margin: 0 }}>
                    {t('info.terms.general_text')}
                </p>

                {/* Исправлено: лицензия */}
                <h2 className={styles.heading} style={{ textAlign: 'center', padding: "10px", margin: 0 }}>
                    {t('info.terms.license_title')}
                </h2>
                <p className={styles.paragraph} style={{ textAlign: 'center', padding: "10px", margin: 0 }}>
                    {t('info.terms.license_text')}
                </p>

                {/* Исправлено: ограничения */}
                <h2 className={styles.heading} style={{ textAlign: 'center' }}>
                    {t('info.terms.restrictions_title')}
                </h2>
                <ul className={styles.list} style={{ listStyle: 'none', padding: 0, margin: '0 auto 1rem', textAlign: 'center' }}>
                    <li style={{ textAlign: 'center', padding: "10px", margin: 0 }}>{t('info.terms.rest_1')}</li>
                    <li style={{ textAlign: 'center', padding: "10px", margin: 0 }}>{t('info.terms.rest_2')}</li>
                </ul>

                {/* Исправлено: контакты */}
                <h2 className={styles.heading} style={{ textAlign: 'center', padding: "5px" }}>
                    {t('info.terms.contact_title')}
                </h2>
                <ul className={styles.list} style={{ listStyle: 'none', padding: "10px", margin: '0 auto 1rem', textAlign: 'center' }}>
                    <li style={{ textAlign: 'center' }}>{t('info.terms.contact_email')}</li>
                </ul>
                
                <p className={styles.paragraph} style={{ textAlign: 'center' }}>ELEVEN:ELEVEN UA</p>
            </div>
        </div>
    )
}