
import styles from "./Header.module.scss"
import BurgerMenu from "./BurgerMenu";
import ShoppingCart from "./SoppingCartBtn";
import HeaderNav from "./HeaderNav/HeaderNav";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";




const Header = () => {
  const token = Cookies.get("shopifyToken")

  
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

              <Link href={token ? "/account" : "/account/login"}>
                <Image src="/images/user.png" width={20} height={20} alt="account page" />
              </Link>
              </div>
              <ShoppingCart />
            </div>
          

       </div>
       <HeaderNav/>
      </header>
  </>
    );
  };
  
  export default Header;  