import Image from "next/image"
import Link from "next/link"
import styles from "./Slider.module.scss"

const SliderComponent = () => {

return (
    <div className={styles.SliderWrapper}>
        <Link
            href="/"
            className={styles.SliderItem}
            >
                <Image
                width={2000}
                height={2000}
                className={styles.img}
                alt="type-text" 
                src="/images/typeShoes.avif"
                />
                <p className={styles.text}>Item</p>
        </Link>

        <Link
            href="/"
            className={styles.SliderItem}
            >
                <Image
                                width={2000}
                                height={2000}
                className={styles.img}
                alt="type-text" 
                src="/images/typeShoes.avif"
                />
                <p className={styles.text}>Item</p>
        </Link>

        <Link
            href="/"
            className={styles.SliderItem}
            >
                <Image
                                width={2000}
                                height={2000}
                className={styles.img}
                alt="type-text" 
                src="/images/typeShoes.avif"
                />
                <p className={styles.text}>Item</p>
        </Link>

        <Link
            href="/"
            className={styles.SliderItem}
            >
                <Image
                                width={2000}
                                height={2000}
                className={styles.img}
                alt="type-text" 
                src="/images/typeShoes.avif"
                />
                <p className={styles.text}>Item</p>
        </Link>

        <Link
            href="/"
            className={styles.SliderItem}
            >
                <Image
                                width={2000}
                                height={2000}
                className={styles.img}
                alt="type-text" 
                src="/images/typeShoes.avif"
                />
                <p className={styles.text}>Item</p>
        </Link>

        <Link
            href="/"
            className={styles.SliderItem}
            >
                <Image
                                width={2000}
                                height={2000}
                className={styles.img}
                alt="type-text" 
                src="/images/typeShoes.avif"
                />
                <p className={styles.text}>Item</p>
        </Link>

        <Link
            href="/"
            className={styles.SliderItem}
            >
                <Image
                                width={2000}
                                height={2000}
                className={styles.img}
                alt="type-text" 
                src="/images/typeShoes.avif"
                />
                <p className={styles.text}>Item</p>
        </Link>

        <Link
            href="/"
            className={styles.SliderItem}
            >
                <Image
                                width={2000}
                                height={2000}
                className={styles.img}
                alt="type-text" 
                src="/images/typeShoes.avif"
                />
                <p className={styles.text}>Item</p>
        </Link>

        <Link
            href="/"
            className={styles.SliderItem}
            >
                <Image
                                width={2000}
                                height={2000}
                className={styles.img}
                alt="type-text" 
                src="/images/typeShoes.avif"
                />
                <p className={styles.text}>Item</p>
        </Link>
    </div>
)

}

export default SliderComponent