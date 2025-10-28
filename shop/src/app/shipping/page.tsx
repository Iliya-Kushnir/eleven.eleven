import styles from "./page.module.scss"

const showPage = true

export default function Products() {
  if (!showPage) {
    return <p>Unavailoble page</p>
}

    return (
      <div className="font-sans flex flex-col items-center justify-items-center p-2.5 pb-2.5 pt-[75px] sm:p-20">

      <h1 className={styles.heading}>DELIVERY & PAYMENT</h1>
    
      <h1 className={styles.heading}>DELIVERY</h1>
    
      <p className={styles.paragraph}>
        DELIVERY WITHIN UKRAINE IS CARRIED OUT USING THE “NOVA POSHTA” SERVICE
        WITHIN 2-3 BUSINESS DAYS FROM THE MOMENT THE ORDER IS PLACED ON OUR WEBSITE.
        DELIVERY COST IS CALCULATED INDIVIDUALLY AND PAID BY THE RECIPIENT UPON PICKUP
        AT THE SELECTED NOVA POSHTA BRANCH.
      </p>
    
      <p className={styles.paragraph}>
        INTERNATIONAL ORDERS ARE SHIPPED USING “UKRPOSHTA” AND “NOVA POSHTA”.
        DELIVERY TIME DEPENDS ON YOUR REGION AND DESTINATION COUNTRY AND GENERALLY
        TAKES FROM TWO WEEKS TO ONE MONTH.
        INTERNATIONAL SHIPPING COSTS VARY BY COUNTRY AND ARE PAID TOGETHER
        WITH THE PURCHASE AT CHECKOUT.
      </p>
    
      <p className={styles.paragraph}>
        TO CHECK THE EXACT SHIPPING COST, ADD THE DESIRED PRODUCT TO YOUR CART
        AND SELECT YOUR DESTINATION COUNTRY AT CHECKOUT. IF THE COST DOES NOT APPEAR,
        PLEASE REFRESH THE PAGE.
      </p>
    
      <p className={styles.paragraph}>
        PLEASE NOTE THAT THE PURCHASE PRICE AND SHIPPING COSTS DO NOT INCLUDE ANY
        IMPORT DUTIES, TAXES, OR CUSTOMS FEES THAT MAY APPLY IN THE DESTINATION COUNTRY.
      </p>
    
      <p className={styles.paragraph}>
        DELIVERY TIMES MAY VARY DEPENDING ON HOLIDAY SEASONS (SUCH AS CHRISTMAS)
        OR FORCE MAJEURE SITUATIONS. IF DELIVERY IS DELAYED, YOU MAY USE YOUR
        TRACKING NUMBER TO CHECK THE PACKAGE LOCATION AT ANY TIME.
      </p>
    
      <p className={styles.paragraph}>
        FOR ANY QUESTIONS RELATED TO DELIVERY, PLEASE CONTACT US VIA DIRECT MESSAGE
        ON OUR INSTAGRAM PAGE @eleven.el.even
      </p>
    
      <h1 className={styles.heading}>PAYMENT</h1>
    
      <p className={styles.paragraph}>
        PAYMENTS ON OUR WEBSITE ARE PROCESSED USING VISA / MASTERCARD BANK CARDS
        THROUGH THE MONO PAYMENT SYSTEM. AFTER COMPLETING YOUR TRANSACTION,
        A CONFIRMATION EMAIL WILL BE SENT TO YOUR PROVIDED EMAIL ADDRESS.
      </p>
    
      <h1 className={styles.heading}>PRE-ORDER</h1>
    
      <p className={styles.paragraph}>
        PRE-ORDERS REQUIRE 100% UPFRONT PAYMENT. MANUFACTURING TIME MAY TAKE
        BETWEEN 5 TO 8 BUSINESS DAYS DEPENDING ON PRODUCTION LOAD.
      </p>
    
      <p className={styles.paragraph}>THANK YOU FOR SHOPPING WITH US.</p>
      <p className={styles.paragraph}>ELEVEN EL EVEN</p>
    
    </div>
    
    )

}