import styles from "./page.module.scss"
import { Metadata } from "next"

const showPage = true

export const metadata: Metadata = {
    title: "About us",
    description: "Learn more about eleven:eleven brand"
}
import { getTranslations } from "@/lib/get-translations";

export default async function AboutUs() {
 

  const { t } = await getTranslations();

  return (
    <div className="font-sans flex flex-col items-center justify-center min-h-[calc(100vh-75px)] p-2.5 pb-2.5 pt-[75px] sm:p-20">
      <div className={styles.wrapper}>
        <h1 className={styles.heading}>{t('info.about.title')}</h1>
        
        <div className={styles.content}>
          <p className={styles.paragraph}>
            <strong>eleven:eleven</strong> — {t('info.about.p1')}
          </p>

          <p className={styles.paragraph}>{t('info.about.p2')}</p>

          <p className={styles.paragraph}>{t('info.about.p3')}</p>

          <p className={styles.paragraph}>{t('info.about.p4')}</p>

          <p className={styles.paragraph}>{t('info.about.p5')}</p>

          <p className={styles.paragraph}>{t('info.about.p6')}</p>
        </div>
      </div>
    </div>
  )
}