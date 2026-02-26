"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getProductsGroupedByType } from "@/lib/shopify";
import styles from "./Slider.module.scss";
import { useLanguage } from "@/context/LanguageContext"; // Импортируем контекст языка

// Интерфейс для типизации данных
interface ProductNode {
  id: string;
  title: string;
  featuredImage?: {
    url: string;
    altText?: string | null;
  } | null;
}

// Объект с переводами категорий для отображения
const typeTranslations: Record<string, Record<string, string>> = {
  en: {
    "hoodie": "Hoodies",
    "t-shirt": "T-Shirts",
    "pants": "Pants",
    "accessories": "Accessories",
    "long sleeve": "Long sleeves",
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
    "long sleeve": "Лонгсліви",
    "Лонгсліви": "Лонгсліви",
    "unknown": "Інше"
  }
};

const SliderComponent = () => {
  const [groupedProducts, setGroupedProducts] = useState<Record<string, ProductNode[]>>({});
  const { language } = useLanguage(); // Получаем текущий язык ("en" или "uk")

  useEffect(() => {
    async function loadData() {
      // Функция getProductsGroupedByType учитывает язык через shopifyFetch
      const data = await getProductsGroupedByType();
      setGroupedProducts(data);
    }
    loadData();
  }, [language]); // Перезагружаем данные при смене языка

  // Функция для получения красивого названия категории
  const getDisplayName = (type: string) => {
    const lang = (language === 'en' || language === 'uk') ? language : 'uk';
    const lowerType = type.toLowerCase();
    return typeTranslations[lang][lowerType] || type;
  };

  const types = Object.keys(groupedProducts);

  return (
    <div className={styles.SliderWrapper}>
      {types.map((type) => {
        const firstProduct = groupedProducts[type][0];
        const coverImage = firstProduct?.featuredImage?.url || "/images/default.webp";
        const displayName = getDisplayName(type);

        return (
          <Link
            key={type}
            // Используем .toLowerCase() для стабильной работы роутинга
            href={`/products/type/${encodeURIComponent(type.toLowerCase())}`}
            className={styles.SliderItem}
          >
            <div className={styles.imageContainer}>
              <Image
                width={800}
                height={1000}
                className={styles.img}
                alt={type}
                src={coverImage}
                priority={true}
              />
            </div>
            <p className={styles.text}>
              {displayName.toUpperCase()} ({groupedProducts[type].length})
            </p>
          </Link>
        );
      })}
    </div>
  );
};

export default SliderComponent;