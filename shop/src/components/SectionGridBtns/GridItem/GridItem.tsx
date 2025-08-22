import styles from "./GridItem.module.scss"
import Link from "next/link"
import Image from "next/image"

type GridItemProps = {
    href: string;
    src: string;
    alt: string;
    label: string;
}   

const GridItem: React.FC<GridItemProps> = ({href, src, alt, label}) => {


    return (
    <Link className={styles.item} href={href}>
        <Image
        src={src}
        alt={alt}
        width={500}
        height={500}
        className={styles.img}
        />

        <h3 className={styles.text}>{label}</h3>
    </Link>
    )
}

export default GridItem