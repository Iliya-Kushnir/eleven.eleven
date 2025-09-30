import styles from "./Header.module.scss"
import BurgerMenu from "./BurgerMenu";
import ShoppingCart from "./SoppingCartBtn";
import Link from "next/link";




const Header = () => {
  
  return (
  <>
    <div className={styles.blackLine}></div>
      <header className={styles.header}>
        <BurgerMenu />
       <Link className={styles.linkWrapper} href="/">
        <p className={styles.link}>eleven..eleven</p>
        <p className={styles.country}>ukraine</p>
       </Link>
       <ShoppingCart />
      </header>
  </>
    );
  };
  
  export default Header;  