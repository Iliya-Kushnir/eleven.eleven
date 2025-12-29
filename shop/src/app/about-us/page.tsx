import styles from "./page.module.scss"
import { Metadata } from "next"

const showPage = true

export const metadata: Metadata = {
    title: "About us",
    description: "Learn more about eleven:eleven brand"
}

export default function AboutUs() {
 

  return (
    <div className="font-sans flex flex-col items-center justify-center min-h-[calc(100vh-75px)] p-2.5 pb-2.5 pt-[75px] sm:p-20">
      {/* Этот блок центрирует всё содержимое по горизонтали */}
      <div className={styles.wrapper}>
        <h1 className={styles.heading}>ABOUT US</h1>
        
        <div className={styles.content}>
          <p className={styles.paragraph}>
            <strong>eleven:eleven</strong> — elevated style. urban spirit. catch the moment.
          </p>

          <p className={styles.paragraph}>
            <strong>eleven:eleven</strong> is a Ukrainian brand of contemporary clothing designed for those who live in the here and now. 
            Whether your day is filled with a high-speed metropolitan rhythm, an aesthetic coffee date, or late-night plans 
            that turn into unforgettable memories — we make sure you have the perfect outfit to own every second of it.
          </p>

          <p className={styles.paragraph}>
            We believe that "modern" doesn't have to mean "temporary." Our pieces are about the perfect balance 
            between bold trends and lasting comfort. Every item in our collection is designed to be a statement on its own, 
            yet they all seamlessly blend together, allowing you to create looks that our 
            <strong> 11:11 community</strong> describes as "the ultimate confidence booster."
          </p>

          <p className={styles.paragraph}>
            Founded with a vision to bring a fresh perspective to the Ukrainian fashion scene, 
            <strong> eleven:eleven</strong> has evolved from a passionate idea into a destination for trendsetters. 
            Today, we ship hundreds of orders across the country, connecting with people who value individuality as much as we do.
          </p>

          <p className={styles.paragraph}>
            Our obsession is the intersection of premium fabrics and cutting-edge tailoring. 
            We hunt for materials that feel as good as they look, ensuring that even our most "fashion-forward" drops 
            remain durable and comfortable. From our signature oversized silhouettes to our cult-favorite outerwear, 
            we create the items that dominate your social media feeds and, more importantly, your daily wardrobe.
          </p>

          <p className={styles.paragraph}>
            Our ultimate goal is to know that you feel a genuine spark of joy when you discover, try on, 
            unbox, and wear your <strong>eleven:eleven</strong> pieces. We do everything to make that feeling your reality.
          </p>
        </div>
      </div>
    </div>
  )
}