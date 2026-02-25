import styles from "./page.module.scss"
const showPage = true

import { Metadata } from "next"
import { getTranslations } from "@/lib/get-translations";

export const metadata: Metadata = {
  title: "Returns | eleven:eleven",
  description: "Information about our return and exchange policy."
}

export default async function Products() {
  if (!showPage) {
    return <p>Unavailoble page</p>
}

const { t } = await getTranslations();
return (
<div className="font-sans flex flex-col items-center w-full p-2.5 pb-2.5 pt-[75px] sm:p-20">
            
            {/* ГЛАВНАЯ ОБЕРТКА ИЗ SCSS */}
            <div className={styles.wrapper}>
                
                <h1 className={styles.heading}>{t('info.returns.title')}</h1>

                <p className={styles.paragraph}>{t('info.returns.text1')}</p>
                <p className={styles.paragraph}>{t('info.returns.text2')}</p>
                <p className={styles.paragraph}>{t('info.returns.text3')}</p>

                <p 
                    className={styles.paragraph} 
                    dangerouslySetInnerHTML={{ __html: t('info.returns.text4') }} 
                />

                <p className={styles.paragraph}>{t('info.returns.text5')}</p>
                <p className={styles.paragraph}>{t('info.returns.text6')}</p>
                <p className={styles.paragraph}>{t('info.returns.text7')}</p>

                <h1 className={styles.heading}>{t('info.returns.refund_title')}</h1>
                <p className={styles.paragraph}>{t('info.returns.refund_text1')}</p>
                <p className={styles.paragraph}>{t('info.returns.refund_text2')}</p>

                <h1 className={styles.heading}>{t('info.returns.preorder_title')}</h1>
                <p className={styles.paragraph}>{t('info.returns.preorder_text')}</p>

                <p className={styles.paragraph}>{t('info.returns.thanks')}</p>
                <p className={styles.paragraph}>ELEVEN:ELEVEN UA</p>
            </div>
        </div>
  );
}