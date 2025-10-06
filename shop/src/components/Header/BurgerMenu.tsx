"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import styles from "./BurgerMenu.module.scss";
import TextField from "./TextField/TextField";
import Cookies from "js-cookie";
import { getProductsGroupedByType } from "@/lib/shopify"; // твоя функция для получения продуктов
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";

interface Product {
  id: string;
  title: string;
}

export default function BurgerMenu() {
  const [open, setOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<null | string>(null);
  const [activeProductType, setActiveProductType] = useState<null | string>(null);
  const [groupedProducts, setGroupedProducts] = useState<Record<string, Product[]>>({});
  const pathname = usePathname();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const t = Cookies.get("shopifyToken");
    setToken(t ?? null);
  }, []);

  // закрываем меню при смене страницы
  useEffect(() => {
    setOpen(false);
    setActiveSubmenu(null);
    setActiveProductType(null);
  }, [pathname]);

  const menus = [
    { id: "shop", label: "SHOP" },
  ];

  // Загружаем продукты при открытии SHOP
  const handleOpenShop = async () => {
    setActiveSubmenu("shop");
    if (!Object.keys(groupedProducts).length) {
      const grouped = await getProductsGroupedByType();
      setGroupedProducts(grouped);
    }
  };

  // Функция для извлечения числового ID из GID
  const toNumericId = (gid: string) => {
    const parts = gid.split("/");
    return parts[parts.length - 1];
  };

  return (
    <div className={styles.burgerMenu}>
      {/* кнопка-бургер */}
      <button
        className={`${styles.burgerButton} ${open ? styles.open : ""}`}
        onClick={() => setOpen(!open)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* затемнение */}
      {open && <div className={styles.overlay} onClick={() => setOpen(false)} />}

      {/* основной слой меню */}
      <aside className={`${styles.sidebar} ${open ? styles.show : ""}`}>
        <div className={styles.nav}>
          <TextField />

          {menus.map((menu) =>
            menu.id === "shop" ? (
              <button
                key={menu.id}
                className={styles.shop}
                onClick={handleOpenShop}
              >
                {menu.label}{" "}
                <Image width={15} height={24} alt="vector" src="/images/chevron.png" />
              </button>
            ) : (
              <button
                key={menu.id}
                className={styles.shop}
                onClick={() =>
                  setActiveSubmenu(activeSubmenu === menu.id ? null : menu.id)
                }
              >
                {menu.label}{" "}
                <Image width={15} height={24} alt="vector" src="/images/chevron.png" />
              </button>
            )
          )}

          <Link className={styles.shop} href="/about-us">
            ABOUT US
          </Link>
          <Link className={styles.shop} href="/contact">
            CONTACT
          </Link>

          {token ? (
            <Link className={styles.link} href="/account">
              ACCOUNT
            </Link>
          ) : (
            <Link className={styles.link} href="/account/login">
              LOG IN / REGISTER
            </Link>

            
          )}
          <LanguageSwitcher />
        </div>
      </aside>

      {/* Второй слой: типы продуктов */}
      {activeSubmenu === "shop" && !activeProductType && (
        <aside className={`${styles.submenu} ${styles.show}`}>
          <div className={styles.nav}>
            <button className={styles.shop} onClick={() => setActiveSubmenu(null)}>
              ← BACK
            </button>
            {Object.keys(groupedProducts).map((type) => (
              <button
                key={type}
                className={styles.shop}
                onClick={() => setActiveProductType(type)}
              >
                {type}
              </button>
            ))}
          </div>
        </aside>
      )}

      {/* Третий слой: товары выбранного типа */}
      {activeProductType && (
        <aside className={`${styles.submenu} ${styles.show}`}>
          <div className={styles.nav}>
            <button
              className={styles.shop}
              onClick={() => setActiveProductType(null)}
            >
              ← SHOP
            </button>
            {groupedProducts[activeProductType]?.map((product) => {
              const numericId = toNumericId(product.id); // используем встроенную функцию
              return (
                <Link
                  key={numericId}
                  className={styles.shop}
                  href={`/products/${numericId}`}
                >
                  {product.title}
                </Link>
              );
            })}
          </div>
        </aside>
      )}
    </div>
  );
}
