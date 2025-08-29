import Image from "next/image";
import styles from "./TextField.module.scss"

const TextField =() => {

    return (
        <div className={styles.fieldWrapper}>
            <input className={styles.input} placeholder="SEARCH" type="text" />
            <button className={styles.button} type="submit">
                <Image 
                width={20}
                height={20}
                src="/images/search-2.png"
                alt="search image"
                />
            </button>
        </div>
    )
}

export default TextField