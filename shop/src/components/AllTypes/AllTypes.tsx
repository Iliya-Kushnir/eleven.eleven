"use client";
import Link from "next/link";
import { getProductsGroupedByType } from "@/lib/shopify";
import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./AllTypes.module.scss"

interface ProductType {
  id: string;
  title: string;
}

const typeImages: Record<string, string> = {
    shoes: "/images/typeShoes.avif",
    hoodie: "/images/techFleece.avif",
  };
  

export default function ProductTypesPage() {
  const [groupedProducts, setGroupedProducts] = useState<Record<string, ProductType[]>>({});

  useEffect(() => {
    async function loadGrouped() {
      const grouped = await getProductsGroupedByType();
      setGroupedProducts(grouped);
    }

    loadGrouped();
  }, []);

  console.log(groupedProducts)

  return (
      <div className={styles.gridWrapper}>
        {Object.keys(groupedProducts).map((type) => (
            
            <Link key={type} href={`/products/type/${encodeURIComponent(type)}`}>
                <div className={styles.wrapper}>
                <Image 
                src={typeImages[type] || "/images/default.webp"} 
                alt={type} 
                width={135}
                height={135}
                />
                <span>{type.toUpperCase()} ({groupedProducts[type].length})</span>
                </div>
            </Link>
        ))}
    </div>
  );
}
