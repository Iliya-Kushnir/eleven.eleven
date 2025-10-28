"use client";

import styles from "./HeaderNav.module.scss";
import { useState } from "react";
import Link from "next/link";
import { getProductsGroupedByType } from "@/lib/shopify";

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

  return (
    <nav className={styles.navWrapper}>
      {/* SHOP BUTTON */}
      <p className={styles.link} onClick={toggleShop}>
        SHOP
      </p>

      {/* DROPDOWN */}
      {openShop && (
        <div className={styles.shopDropdown}>
          {Object.keys(groupedProducts).map((type) => (
            <div key={type} className={styles.typeBlock}>
              {/* TYPE BUTTON */}
              <p className={styles.type} onClick={() => toggleType(type)}>
                {type}
              </p>

              {/* PRODUCTS */}
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

      <Link href="/about-us"><p className={styles.link}>ABOUT US</p></Link>
      <Link href="/contact"><p className={styles.link}>CONTACT</p></Link>
    </nav>
  );
};

export default HeaderNav;
