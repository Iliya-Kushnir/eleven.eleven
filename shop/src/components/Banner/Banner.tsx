import Image from "next/image";
import DefaultButton from "../defaultButton/defaultButton";
import styles from "./Banner.module.scss"

const Banner = () => {

    return (
        <div className={styles.bannerWrapper}>
            <Image 
            className={styles.bannerImage}
            width={30}
            height={30}
            alt="Banner Image"
            src="/images/BannerImage.webp"
            />

           <DefaultButton
           label="SHOP NOW"
           />
        </div>
    )
}

export default Banner