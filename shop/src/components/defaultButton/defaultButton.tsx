import styles from "./defaultButton.module.scss"
import Link from "next/link"

type defaultButtonProps = {
    label: string;
    type?: "button" | "submit" | "reset";
}


const DefaultButton: React.FC<defaultButtonProps> = ({label, type}) => {
    

    return (
        <>
        <button 
        className={styles.button} 
        type={type}>
            <Link href="/products">{label}</Link>
        </button>
        </>
    )
}

export default DefaultButton