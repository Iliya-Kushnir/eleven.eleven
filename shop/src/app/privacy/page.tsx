import styles from "./page.module.scss"
const showPage = false



export default function PrivacyPage() {

    if (!showPage) {
        return <p>Unavailoble page</p>
    }
    return (
 
    <div className="font-sans flex flex-col items-center justify-items-center  p-2.5 pb-2.5 pt-[75px] sm:p-20">
        <h1 className={styles.title}>PRIVACY POLICY</h1>
        <p className={styles.updated}>UPDATED AT 2021-10-27</p>

        <p className={styles.paragraph}>
            THIS PRIVACY POLICY APPLIES TO OUR WEBSITE, AND ITS ASSOCIATED SUBDOMAINS (COLLECTIVELY, OUR “SERVICE”) ALONGSIDE OUR APPLICATION, VELOUR GARMENTS. BY ACCESSING OR USING OUR SERVICE, YOU SIGNIFY THAT YOU HAVE READ, UNDERSTOOD, AND AGREE TO OUR COLLECTION, STORAGE, USE, AND DISCLOSURE OF YOUR PERSONAL INFORMATION AS DESCRIBED IN THIS PRIVACY POLICY AND OUR TERMS OF SERVICE.
        </p>

        <h2 className={styles.heading}>WHAT INFORMATION DO WE COLLECT?</h2>
        <p className={styles.paragraph}>
            WE COLLECT INFORMATION FROM YOU WHEN YOU VISIT OUR WEBSITE, REGISTER ON OUR SITE, PLACE AN ORDER, SUBSCRIBE TO OUR NEWSLETTER, RESPOND TO A SURVEY OR FILL OUT A FORM.
        </p>
        <ul className={styles.list}>
            <li>NAME / USERNAME</li>
            <li>PHONE NUMBERS</li>
            <li>EMAIL ADDRESSES</li>
            <li>MAILING ADDRESSES</li>
            <li>BILLING ADDRESSES</li>
            <li>DEBIT/CREDIT CARD NUMBERS</li>
            <li>PASSWORD</li>
        </ul>

        <h2 className={styles.heading}>HOW DO WE USE THE INFORMATION WE COLLECT?</h2>
        <p className={styles.paragraph}>
            ANY OF THE INFORMATION WE COLLECT FROM YOU MAY BE USED IN ONE OF THE FOLLOWING WAYS:
        </p>
        <ul className={styles.list}>
            <li>TO PERSONALIZE YOUR EXPERIENCE (YOUR INFORMATION HELPS US TO BETTER RESPOND TO YOUR INDIVIDUAL NEEDS)</li>
            <li>TO IMPROVE OUR WEBSITE (WE CONTINUALLY STRIVE TO IMPROVE OUR WEBSITE OFFERINGS BASED ON THE INFORMATION AND FEEDBACK WE RECEIVE FROM YOU)</li>
            <li>TO IMPROVE CUSTOMER SERVICE (YOUR INFORMATION HELPS US TO MORE EFFECTIVELY RESPOND TO YOUR CUSTOMER SERVICE REQUESTS AND SUPPORT NEEDS)</li>
            <li>TO PROCESS TRANSACTIONS</li>
            <li>TO ADMINISTER A CONTEST, PROMOTION, SURVEY OR OTHER SITE FEATURE</li>
            <li>TO SEND PERIODIC EMAILS</li>
        </ul>

        <h2 className={styles.heading}>WHEN DOES VELOUR GARMENTS USE END USER INFORMATION FROM THIRD PARTIES?</h2>
        <p className={styles.paragraph}>
            VELOUR GARMENTS WILL COLLECT END USER DATA NECESSARY TO PROVIDE THE VELOUR GARMENTS SERVICES TO OUR CUSTOMERS.
        </p>
        <p className={styles.paragraph}>
            END USERS MAY VOLUNTARILY PROVIDE US WITH INFORMATION THEY HAVE MADE AVAILABLE ON SOCIAL MEDIA WEBSITES. IF YOU PROVIDE US WITH ANY SUCH INFORMATION, WE MAY COLLECT PUBLICLY AVAILABLE INFORMATION FROM THE SOCIAL MEDIA WEBSITES YOU HAVE INDICATED. YOU CAN CONTROL HOW MUCH OF YOUR INFORMATION SOCIAL MEDIA WEBSITES MAKE PUBLIC BY VISITING THESE WEBSITES AND CHANGING YOUR PRIVACY SETTINGS.
        </p>

        <h2 className={styles.heading}>DO WE SHARE THE INFORMATION WE COLLECT WITH THIRD PARTIES?</h2>
        <p className={styles.paragraph}>
            WE MAY SHARE THE INFORMATION THAT WE COLLECT, BOTH PERSONAL AND NON-PERSONAL, WITH THIRD PARTIES SUCH AS ADVERTISERS, CONTEST SPONSORS, PROMOTIONAL AND MARKETING PARTNERS, AND OTHERS WHO PROVIDE OUR CONTENT OR WHOSE PRODUCTS OR SERVICES WE THINK MAY INTEREST YOU.
        </p>

        {/* Далее вставляй остальные секции таким же образом */}
        <h2 className={styles.heading}>CONTACT US</h2>
        <p className={styles.paragraph}>
            DON&apos;T HESITATE TO CONTACT US IF YOU HAVE ANY QUESTIONS.
        </p>
        <ul className={styles.list}>
            <li>VIA EMAIL: SUPPORT@VELOURGARMENTS.COM</li>
        </ul>
    </div>
    )
}