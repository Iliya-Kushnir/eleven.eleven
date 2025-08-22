"use client";

import { useState } from "react";
import styles from "./BurgerMenu.module.scss";

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
        <nav>
          <ul>
            <li><a href="#">Главная</a></li>
            <li><a href="#">Магазин</a></li>
            <li><a href="#">Контакты</a></li>
          </ul>
        </nav>
      </aside>
    </div>
  );
}
