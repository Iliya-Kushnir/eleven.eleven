"use client"; // Обязательно, так как используем куки на клиенте

import { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import BurgerMenu from "./BurgerMenu";
import ShoppingCart from "./SoppingCartBtn";
import HeaderNav from "./HeaderNav/HeaderNav";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Для отслеживания переходов

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname(); // Помогает обновлять состояние при смене страниц

  useEffect(() => {
    // Проверяем токен только на стороне клиента
    const token = Cookies.get("shopifyToken");
    setIsLoggedIn(!!token);
  }, [pathname]); // Перепроверяем каждый раз, когда меняется путь

  return (
    <>
      <div className={styles.blackLine}></div>
      <header className={styles.header}>
        <div className={styles.firstNav}>
          <BurgerMenu />
          <div className={styles.optionalSwitcher}>
            <LanguageSwitcher />
          </div>
          <Link className={styles.linkWrapper} href="/">
            <p className={styles.link}>eleven..eleven</p>
            <p className={styles.country}>ukraine</p>
          </Link>
          <div className={styles.NavIcons}>
            <div className={styles.optionalIcons}>
              <Link href="/search-for">
                <Image src="/images/search.png" width={20} height={20} alt="search products" />
              </Link>

              {/* Теперь ссылка динамическая и реактивная */}
              <Link href={isLoggedIn ? "/account" : "/account/login"}>
                <Image src="/images/user.png" width={20} height={20} alt="account page" />
              </Link>
            </div>
            <ShoppingCart />
          </div>
        </div>
        <HeaderNav />
      </header>
    </>
  );
};

export default Header;