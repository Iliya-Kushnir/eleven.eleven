"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./BurgerMenu.module.scss";
import TextField from "./TextField/TextField";

export default function BurgerMenu() {
  const [open, setOpen] = useState(false);

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
          <TextField/>
          <button className={styles.shop}>SHOP <Image width={15} height={24} alt="vector" src="/images/chevron.png"/></button>
          <Link className={styles.shop} href="/about-us">ABOUT US</Link>
          <Link className={styles.shop} href="/about-us">CONTANCT</Link>

          <Link className={styles.link} href="/account/login">LOG IN / REGISTER</Link>
        </div>
      </aside>
    </div>
  );
}
