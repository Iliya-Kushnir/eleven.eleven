"use client";
import Link from "next/link";
import { getProductsGroupedByType } from "@/lib/shopify";
import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./AllTypes.module.scss";
import { useLanguage } from "@/context/LanguageContext";

// Интерфейс для товара
interface ProductType {
  id: string;
  title: string;
  featuredImage?: {
    url: string;
    altText?: string | null;
  } | null;
}

// Мапа переводов для красивого отображения типов в интерфейсе
// Ключ — это то, что приходит от Shopify (в любом регистре), значение — то, что увидит юзер
const typeTranslations: Record<string, Record<string, string>> = {
  en: {
    "hoodie": "Hoodies",
    "t-shirt": "T-Shirts",
    "pants": "Pants",
    "accessories": "Accessories",
    "unknown": "Other"
  },
  uk: {
    "hoodie": "Худі",
    "худі": "Худі",
    "t-shirt": "Футболки",
    "футболка": "Футболки",
    "pants": "Штани",
    "штани": "Штани",
    "accessories": "Аксесуари",
    "unknown": "Інше"
  }
};

export default function ProductTypesPage() {
  const [groupedProducts, setGroupedProducts] = useState<Record<string, ProductType[]>>({});
  const { language } = useLanguage(); // Получаем текущий язык ("en" или "uk")

  useEffect(() => {
    async function loadGrouped() {
      // getProductsGroupedByType внутри использует shopifyFetch, 
      // который уже настроен на передачу текущего языка в Shopify
      const grouped = await getProductsGroupedByType();
      setGroupedProducts(grouped);
    }
    loadGrouped();
  }, [language]); // Перезагружаем при смене языка

  // Функция для получения переведенного названия типа
  const getDisplayName = (type: string) => {
    const lang = (language === 'en' || language === 'uk') ? language : 'uk';
    const lowerType = type.toLowerCase();
    
    // Пытаемся найти перевод, если нет — возвращаем исходный тип
    return typeTranslations[lang][lowerType] || type;
  };

  return (
    <div className={styles.gridWrapper}>
      {Object.keys(groupedProducts).map((type) => {
        const productsInType = groupedProducts[type];
        const firstProduct = productsInType[0];
        
        const coverImage = firstProduct?.featuredImage?.url || "/images/default.webp";
        const displayName = getDisplayName(type);

        return (
          <Link key={type} href={`/products/type/${encodeURIComponent(type.toLowerCase())}`}>
            <div className={styles.wrapper}>
              <div className={styles.imageContainer}>
                <Image 
                  src={coverImage} 
                  alt={type} 
                  width={135}
                  height={135}
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <span>{displayName.toUpperCase()} ({productsInType.length})</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}