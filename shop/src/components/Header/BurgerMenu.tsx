"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation"; // импортируем хук
import styles from "./BurgerMenu.module.scss";
import TextField from "./TextField/TextField";

export default function BurgerMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname(); // текущий путь

  // закрываем меню при смене страницы
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

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

      {/* меню */}
      <aside className={`${styles.sidebar} ${open ? styles.show : ""}`}>
        <div className={styles.nav}>
          <TextField />
          <button className={styles.shop}>
            SHOP <Image width={15} height={24} alt="vector" src="/images/chevron.png" />
          </button>
          <Link className={styles.shop} href="/about-us">ABOUT US</Link>
          <Link className={styles.shop} href="/contact">CONTACT</Link>

          <Link className={styles.link} href="/account/login">LOG IN / REGISTER</Link>
        </div>
      </aside>
    </div>
  );
}
