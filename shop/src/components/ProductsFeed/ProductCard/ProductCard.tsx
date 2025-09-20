import styles from "./ProductCard.module.scss";
import DefaultButton from "@/components/defaultButton/defaultButton";
import Image from "next/image";
import Link from "next/link";

type CardProps = {
  src: string;
  alt: string;
  heading: string;
  price: string;
  oldPrice?: string;
  discount?: string;
  soldOut?: boolean;
  isNew?: boolean; // <-- добавляем новый проп
  href: string;
  createdAt?: string;
  showBadges?: boolean;
};

const Card: React.FC<CardProps> = ({
  src,
  alt,
  heading,
  price,
  oldPrice,
  discount,
  soldOut,
  isNew, // <-- деструктурируем
  href,
  createdAt,
  showBadges
}) => {
    console.log("received createdAt:", isNew, heading);

  const content = (
    <div className={`${styles.cardWrapper} ${soldOut ? styles.disabled : ""}`}>
      <div className={styles.imageWrapper}>
        <Image
          width={500}
          height={500}
          src={src}
          alt={alt}
          className={styles.image}
        />

        {/* показываем скидку только если есть discount и товар не soldOut */}
        <div className={styles.buttonWrapper}>
            {showBadges && discount && !soldOut && <DefaultButton label={`${discount} OFF`} />}
            {showBadges && isNew && !soldOut && !discount && <DefaultButton label="NEW IN" />}
            {showBadges && soldOut && <DefaultButton label="SOLD OUT" />}
        </div>

      </div>

      <h1 className={styles.heading}>{heading}</h1>

      <div className={styles.priceWrapper}>
        <span className={styles.price}>{price}</span>
      </div>
    </div>
  );

  if (soldOut) return content;

  return (
    <Link href={href} className={styles.cardLink}>
      {content}
    </Link>
  );
};

export default Card;
