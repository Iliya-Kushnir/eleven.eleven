"use client"
import styles from "./SizeComponent.module.scss"
import { useState } from "react";

const SizeComponent = () => {

    const sizes = [
        { value: "XS", available: false }, 
        { value: "S", available: true },
        { value: "M", available: true },
        { value: "L", available: false }, 
        { value: "XL", available: true },
        { value: "XXL", available: true },
      ];

      const [selectedSize, setSelectedSize] = useState<string | null>(null);

      const handleSelector = (size: string, available: boolean)=> {
        if (!available) return
        setSelectedSize(size)
      }

    return (
        <div className={styles.btnsWrapper}>
            {sizes.map((size)=> (
                <button
                key={size.value}
                className={`${styles.sizeButton} 
                  ${selectedSize === size.value ? styles.active : ""} 
                  ${!size.available ? styles.disabled : ""}`}
                onClick={() => handleSelector(size.value, size.available)}
                disabled={!size.available}
                 >
                    {size.value}
                </button>
            ))}
        </div>
    )
}

export default SizeComponent