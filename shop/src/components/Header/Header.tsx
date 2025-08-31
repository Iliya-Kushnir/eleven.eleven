import styles from "./Header.module.scss"
import BurgerMenu from "./BurgerMenu";
//import ShoppingCart from "./SoppingCartBtn";
import Link from "next/link";
// <ShoppingCart />



const Header = () => {
  
  return (
  <>
    <div className={styles.blackLine}></div>
      <header className={styles.header}>
        <BurgerMenu />
       <Link href="/">Eleven.Eleven</Link>
        
      </header>
  </>
    );
  };
  
  export default Header;  