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

            <div style={{width: "100px", height: "35px", marginBottom: "40px", zIndex: 100}}>
                <DefaultButton label="SHOP NOW"/>
            </div>
        </div>
    )
}

export default Banner