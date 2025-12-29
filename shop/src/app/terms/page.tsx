import styles from "./page.module.scss"
import { Metadata } from "next"

const showPage = true

export const metadata: Metadata = {
    title: "Terms Policy",
    description: ""
}

export default function Terms() {
    if (!showPage) {
        return <p>Unavailable page</p>
    }
    
    return (
    /* Внешний контейнер с принудительным text-center */
    <div className="font-sans flex flex-col items-center text-center w-full p-2.5 pb-2.5 pt-[75px] sm:p-20">
        <div className={styles.container} style={{ textAlign: 'center', width: '100%', maxWidth: '800px' }}>
            
            <h1 className={styles.title} style={{ textAlign: 'center', padding: "10px", margin: 0  }}>TERMS & CONDITIONS</h1>

            <h2 className={styles.heading} style={{ textAlign: 'center', padding: "10px", margin: 0  }}>GENERAL TERMS</h2>
            <p className={styles.paragraph} style={{ textAlign: 'center', padding: "10px", margin: 0  }}>
                BY ACCESSING AND PLACING AN ORDER WITH ELEVEN:ELEVEN, YOU CONFIRM THAT YOU ARE IN AGREEMENT WITH AND BOUND BY THE TERMS OF SERVICE CONTAINED IN THE TERMS & CONDITIONS OUTLINED BELOW.
            </p>

            <h2 className={styles.heading} style={{ textAlign: 'center', padding: "10px", margin: 0  }}>LICENSE</h2>
            <p className={styles.paragraph} style={{ textAlign: 'center', padding: "10px", margin: 0 }}>
                ELEVEN:ELEVEN GRANTS YOU A REVOCABLE, NON-EXCLUSIVE, NON-TRANSFERABLE, LIMITED LICENSE TO DOWNLOAD, INSTALL AND USE THE WEBSITE STRICTLY IN ACCORDANCE WITH THE TERMS OF THIS AGREEMENT.
            </p>

            <h2 className={styles.heading} style={{ textAlign: 'center' }}>RESTRICTIONS</h2>
            {/* Убираем стандартные отступы списка, которые сдвигают текст влево */}
            <ul className={styles.list} style={{ listStyle: 'none', padding: 0, margin: '0 auto 1rem', textAlign: 'center' }}>
                <li style={{ textAlign: 'center', padding: "10px" , margin: 0 }}>MODIFY, MAKE DERIVATIVE WORKS OF, DISASSEMBLE, DECRYPT, REVERSE COMPILE OR REVERSE ENGINEER ANY PART OF THE WEBSITE.</li>
                <li style={{ textAlign: 'center', padding: "10px" , margin: 0 }}>REMOVE, ALTER OR OBSCURE ANY PROPRIETARY NOTICE (INCLUDING ANY NOTICE OF COPYRIGHT OR TRADEMARK) OF ELEVEN:ELEVEN.</li>
            </ul>

            <h2 className={styles.heading} style={{ textAlign: 'center', padding: "5px"  }}>CONTACT</h2>
            <ul className={styles.list} style={{ listStyle: 'none', padding: "10px", margin: '0 auto 1rem', textAlign: 'center' }}>
                <li style={{ textAlign: 'center' }}>VIA EMAIL: SUPPORT@ELEVEN-ELEVEN.COM</li>
            </ul>
            
            <p className={styles.paragraph} style={{ textAlign: 'center' }}>ELEVEN:ELEVEN UA</p>
        </div>
    </div>
    )
}