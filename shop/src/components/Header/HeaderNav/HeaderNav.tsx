"use client";

import styles from "./HeaderNav.module.scss";
import { useState, useEffect } from "react";
import Link from "next/link";
import { getProductsGroupedByType } from "@/lib/shopify";
import { useLanguage } from "@/context/LanguageContext";

interface Product {
  id: string;
  title: string;
}

// Мапа переводов для красивого отображения типов в меню
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

const HeaderNav = () => {
  const [openShop, setOpenShop] = useState(false);
  const [expandedTypes, setExpandedTypes] = useState<Record<string, boolean>>({});
  const [groupedProducts, setGroupedProducts] = useState<Record<string, Product[]>>({});
  
  const { t, language } = useLanguage(); // Достаем текущий язык

  const loadData = async () => {
    // Функция getProductsGroupedByType учитывает язык через shopifyFetch
    const grouped = await getProductsGroupedByType(language);
    setGroupedProducts(grouped);
  };

  // Перезагружаем данные при смене языка, если меню открыто
  useEffect(() => {
    if (openShop) {
      loadData();
    }
  }, [language]);

  const toggleShop = async () => {
    const nextState = !openShop;
    setOpenShop(nextState);

    if (nextState && !Object.keys(groupedProducts).length) {
      await loadData();
    }
  };

  const toggleType = (type: string) => {
    setExpandedTypes((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const getDisplayName = (type: string) => {
    const lang = (language === 'en' || language === 'uk') ? language : 'uk';
    const lowerType = type.toLowerCase();
    return typeTranslations[lang][lowerType] || type;
  };

  const toNumericId = (gid: string) =>
    gid.split("/").pop() || gid;

  return (
    <nav className={styles.navWrapper}>
      <p className={styles.link} onClick={toggleShop}>
        {t('common.header.shop')}
      </p>

      {openShop && (
        <div className={styles.shopDropdown}>
          {Object.keys(groupedProducts).map((type) => {
            const displayName = getDisplayName(type);
            
            return (
              <div key={type} className={styles.typeBlock}>
                <p className={styles.type} onClick={() => toggleType(type)}>
                  {displayName.toUpperCase()}
                </p>

                {expandedTypes[type] &&
                  groupedProducts[type].map((product) => (
                    <Link
                      href={`/products/${toNumericId(product.id)}`}
                      key={product.id}
                      className={styles.product}
                      onClick={() => setOpenShop(false)} // Закрываем меню при клике на товар
                    >
                      {product.title}
                    </Link>
                  ))}
              </div>
            );
          })}
        </div>
      )}

      <Link href="/about-us">
        <p className={styles.link}>{t('common.header.about_us')}</p>
      </Link>
      <Link href="/contact">
        <p className={styles.link}>{t('common.header.contact')}</p>
      </Link>
    </nav>
  );
};

export default HeaderNav;