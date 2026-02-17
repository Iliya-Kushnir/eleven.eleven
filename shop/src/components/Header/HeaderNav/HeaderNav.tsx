"use client";

import styles from "./HeaderNav.module.scss";
import { useState } from "react";
import Link from "next/link";
import { getProductsGroupedByType } from "@/lib/shopify";
import { useLanguage } from "@/context/LanguageContext";


interface Product {
  id: string;
  title: string;
}

const HeaderNav = () => {
  const [openShop, setOpenShop] = useState(false);
  const [expandedTypes, setExpandedTypes] = useState<Record<string, boolean>>({});
  const [groupedProducts, setGroupedProducts] = useState<Record<string, Product[]>>({});

  const toggleShop = async () => {
    setOpenShop((prev) => !prev);

    if (!Object.keys(groupedProducts).length) {
      const grouped = await getProductsGroupedByType();
      setGroupedProducts(grouped);
    }
  };

  const toggleType = (type: string) => {
    setExpandedTypes((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const toNumericId = (gid: string) =>
    gid.split("/").pop() || gid;

  const { t } = useLanguage();
  return (
    <nav className={styles.navWrapper}>

      <p className={styles.link} onClick={toggleShop}>
        {t('common.header.shop')}
      </p>

      {openShop && (
        <div className={styles.shopDropdown}>
          {Object.keys(groupedProducts).map((type) => (
            <div key={type} className={styles.typeBlock}>

              <p className={styles.type} onClick={() => toggleType(type)}>
                {type}
              </p>


              {expandedTypes[type] &&
                groupedProducts[type].map((product) => (
                  <Link
                    href={`/products/${toNumericId(product.id)}`}
                    key={product.id}
                    className={styles.product}
                  >
                    {product.title}
                  </Link>
                ))}
            </div>
          ))}
        </div>
      )}

      <Link href="/about-us"><p className={styles.link}>{t('common.header.about_us')}</p></Link>
      <Link href="/contact"><p className={styles.link}>{t('common.header.contact')}</p></Link>
    </nav>
  );
};

export default HeaderNav;
