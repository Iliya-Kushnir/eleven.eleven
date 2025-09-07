import styles from "./defaultButton.module.scss"
import Link from "next/link"

type defaultButtonProps = {
    label: string;
    type?: "button" | "submit" | "reset";
    onClick?: () => void;
    disabled?: boolean;
    href?: string;
}


const DefaultButton: React.FC<defaultButtonProps> = ({label, type, onClick, disabled, href}) => {
    

    return (
        <>
        <button 
        onClick={onClick}
        className={`${styles.button} ${disabled ? styles.disabled : ""}`} 
        type={type}
        disabled={disabled}
        >
      {href ? (
        <Link href={href}>{label}</Link>
      ) : (
        label
      )}
        </button>
        </>
    )
}

export default DefaultButton