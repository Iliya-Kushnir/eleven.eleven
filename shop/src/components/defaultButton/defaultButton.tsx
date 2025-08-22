import styles from "./defaultButton.module.scss"
import Link from "next/link"

type defaultButtonProps = {
    label: string;
}


const DefaultButton: React.FC<defaultButtonProps> = ({label}) => {
    

    return (
        <>
        <button 
        className={styles.button} 
        type="button">
            <Link href="/products">{label}</Link>
        </button>
        </>
    )
}

export default DefaultButton