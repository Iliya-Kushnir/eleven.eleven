"use client";
import styles from "./SizeComponent.module.scss";
import { useState } from "react";

export interface Size {
  id: string;
  value: string;
  available: boolean;
}

interface SizeComponentProps {
  sizes: Size[];
  onSelect?: (variantId: string) => void; // передаем ID варианта в корзину
}

const SizeComponent: React.FC<SizeComponentProps> = ({ sizes, onSelect }) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const handleSelector = (sizeId: string, available: boolean) => {
    if (!available) return;
    setSelectedSize(sizeId);
    if (onSelect) onSelect(sizeId);
  };

  return (
    <div className={styles.btnsWrapper}>
      {sizes.map((size) => (
        <button
          key={size.id}
          className={`${styles.sizeButton} 
            ${selectedSize === size.id ? styles.active : ""} 
            ${!size.available ? styles.disabled : ""}`}
          onClick={() => handleSelector(size.id, size.available)}
          disabled={!size.available}
        >
          {size.value}
        </button>
      ))}
    </div>
  );
};

export default SizeComponent;
