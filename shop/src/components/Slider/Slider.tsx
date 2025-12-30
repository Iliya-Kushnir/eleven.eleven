"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getProductsGroupedByType } from "@/lib/shopify";
import styles from "./Slider.module.scss";

// Интерфейс для типизации данных
interface ProductNode {
  id: string;
  title: string;
  featuredImage?: {
    url: string;
    altText?: string | null;
  } | null;
}

const SliderComponent = () => {
  const [groupedProducts, setGroupedProducts] = useState<Record<string, ProductNode[]>>({});

  useEffect(() => {
    async function loadData() {
      // Получаем сгруппированные товары с картинками
      const data = await getProductsGroupedByType();
      setGroupedProducts(data);
    }
    loadData();
  }, []);

  // Превращаем ключи объекта (типы) в массив для рендеринга
  const types = Object.keys(groupedProducts);

  return (
    <div className={styles.SliderWrapper}>
      {types.map((type) => {
        // Берем первый товар из категории для обложки слайда
        const firstProduct = groupedProducts[type][0];
        const coverImage = firstProduct?.featuredImage?.url || "/images/default.webp";

        return (
          <Link
            key={type}
            href={`/products/type/${encodeURIComponent(type)}`}
            className={styles.SliderItem}
          >
            <div className={styles.imageContainer}>
              <Image
                width={800} // Оптимальный размер для слайдера
                height={1000}
                className={styles.img}
                alt={type}
                src={coverImage}
                priority={true} // Ускоряет загрузку первых слайдов
              />
            </div>
            <p className={styles.text}>
              {type.toUpperCase()} ({groupedProducts[type].length})
            </p>
          </Link>
        );
      })}
    </div>
  );
};

export default SliderComponent;