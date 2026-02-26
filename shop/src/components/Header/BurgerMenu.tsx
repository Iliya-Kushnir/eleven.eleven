"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import styles from "./BurgerMenu.module.scss";
import TextField from "./TextField/TextField";
import Cookies from "js-cookie";
import { getProductsGroupedByType } from "@/lib/shopify";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import { useLanguage } from "@/context/LanguageContext";

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
  
  const { t, language } = useLanguage();

  useEffect(() => {
    const tToken = Cookies.get("shopifyToken");
    setToken(tToken ?? null);
  }, []);

  useEffect(() => {
    setGroupedProducts({});
    setActiveSubmenu(null);
  }, [language]);

  useEffect(() => {
    setOpen(false);
    setActiveSubmenu(null);
    setActiveProductType(null);
  }, [pathname]);

  const handleOpenShop = async () => {
    setActiveSubmenu("shop");
    if (!Object.keys(groupedProducts).length) {
      const grouped = await getProductsGroupedByType(language);
      setGroupedProducts(grouped);
    }
  };

  const toNumericId = (gid: string) => {
    const parts = gid.split("/");
    return parts[parts.length - 1];
  };

  return (
    <div className={styles.burgerMenu}>
      <button
        className={`${styles.burgerButton} ${open ? styles.open : ""}`}
        onClick={() => setOpen(!open)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {open && <div className={styles.overlay} onClick={() => setOpen(false)} />}

      <aside className={`${styles.sidebar} ${open ? styles.show : ""}`}>
        <div className={styles.nav}>
          <TextField />

          <button className={styles.shop} onClick={handleOpenShop}>
            {t('common.header.shop')}{" "}
            <Image width={15} height={24} alt="vector" src="/images/chevron.png" />
          </button>

          <Link className={styles.shop} href="/about-us">
            {t('common.nav.about_us')}
          </Link>
          <Link className={styles.shop} href="/contact">
            {t('common.nav.contact')}
          </Link>

          {token ? (
            <Link className={styles.link} href="/account">
              {t('account.title')}
            </Link>
          ) : (
            <Link className={styles.link} href="/account/login">
              {/* Исправлены пути: убрано common перед auth */}
              {t('auth.login.title')} / {t('auth.login.create')}
            </Link>
          )}
          <LanguageSwitcher />
        </div>
      </aside>

      {activeSubmenu === "shop" && !activeProductType && (
        <aside className={`${styles.submenu} ${styles.show}`}>
          <div className={styles.nav}>
            <button className={styles.shop} onClick={() => setActiveSubmenu(null)}>
              {/* Убран лишний пробел в ключе BACK */}
              ← {t('common.nav.BACK') || 'BACK'}
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

      {activeProductType && (
        <aside className={`${styles.submenu} ${styles.show}`}>
          <div className={styles.nav}>
            <button
              className={styles.shop}
              onClick={() => setActiveProductType(null)}
            >
              ← {t('common.header.shop') || 'SHOP'}
            </button>
            {groupedProducts[activeProductType]?.map((product) => {
              const numericId = toNumericId(product.id);
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