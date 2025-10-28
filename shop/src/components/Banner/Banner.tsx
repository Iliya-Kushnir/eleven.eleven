import Image from "next/image";
import DefaultButton from "../defaultButton/defaultButton";
import styles from "./Banner.module.scss"

const Banner = () => {

    return (
        <div className={styles.bannerWrapper}>
            <Image 
            className={styles.bannerImage}
            alt="Banner Image"
            src="/images/photo.jpeg"
            fill
            quality={100}
            priority
            style={{ objectFit: "cover",
                objectPosition: "top center", }}    
            />

            <div style={{width: "100px", height: "35px", marginBottom: "40px", zIndex: 100}}>
                <DefaultButton href="/product-types" type="button" label="SHOP NOW"/>
            </div>
        </div>
    )
}

export default Banner