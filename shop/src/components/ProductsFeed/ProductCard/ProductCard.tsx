import styles from "./ProductCard.module.scss"
import Image from "next/image"
import Link from "next/link"

type CardProps = {
    src: string;
    alt: string;
    heading: string;
    price: string;
    href: string;
  }

const Card: React.FC<CardProps> = ({ src, alt, heading, price, href }) => {
    return (
        <Link className={styles.cardWrapper} href={href}>
            <Image
             width={500}
             height={500}
             src={src}
             alt={alt}
             className={styles.image}/>

            <h1 className={styles.heading}>{heading}</h1>

            <span className={styles.price}>{price}</span>

        </Link>
    )
}

export default Card