import styles from "./Header.module.scss"
import BurgerMenu from "./BurgerMenu";
import Image from "next/image";
import ShoppingCart from "./SoppingCartBtn";
import Link from "next/link";




const Header = () => {
  
  return (
  <>
    <div className={styles.blackLine}></div>
      <header className={styles.header}>
        <BurgerMenu />
       <Link href="/">Eleven.Eleven</Link>
        <ShoppingCart />
      </header>
  </>
    );
  };
  
  export default Header;  