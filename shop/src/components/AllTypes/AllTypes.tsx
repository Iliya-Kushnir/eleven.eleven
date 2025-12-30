"use client";
import Link from "next/link";
import { getProductsGroupedByType } from "@/lib/shopify";
import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./AllTypes.module.scss"

// Обновим интерфейс, чтобы он соответствовал данным из Shopify
interface ProductType {
  id: string;
  title: string;
  featuredImage?: { // Это поле теперь будет заполнено
    url: string;
    altText?: string | null;
  } | null;
}

export default function ProductTypesPage() {
  const [groupedProducts, setGroupedProducts] = useState<Record<string, ProductType[]>>({});

  useEffect(() => {
    async function loadGrouped() {
      const grouped = await getProductsGroupedByType();
      setGroupedProducts(grouped);
    }
    loadGrouped();
  }, []);

  return (
    <div className={styles.gridWrapper}>
{Object.keys(groupedProducts).map((type) => {
  const firstProduct = groupedProducts[type][0];
  
  // Теперь featuredImage.url будет существовать, так как мы сохранили весь объект
  const coverImage = firstProduct?.featuredImage?.url || "/images/default.webp";

  return (
    <Link key={type} href={`/products/type/${encodeURIComponent(type)}`}>
      <div className={styles.wrapper}>
        <Image 
          src={coverImage} 
          alt={type} 
          width={135}
          height={135}
          style={{ objectFit: 'cover' }}
        />
        <span>{type.toUpperCase()} ({groupedProducts[type].length})</span>
      </div>
    </Link>
  );
})}
    </div>
  );
}