import styles from "./Header.module.scss"
import BurgerMenu from "./BurgerMenu";
import Image from "next/image";
import ShoppingCart from "./SoppingCartBtn";
import Link from "next/link";




const Header = () => {
  
  return (
      <header className={styles.header}>
        <BurgerMenu />
       <Link href="/">Eleve.Eleven</Link>
        <ShoppingCart />
      </header>
    );
  };
  
  export default Header;  