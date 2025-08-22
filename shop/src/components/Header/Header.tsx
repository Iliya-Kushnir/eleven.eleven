import styles from "./Header.module.scss"
import BurgerMenu from "./BurgerMenu";
import Image from "next/image";
import ShoppingCart from "./SoppingCartBtn";
import Link from "next/link";


type HeaderProps = {
  label: string;
  src: string;
  alt: string;
};

const Header = ({ label, src, alt }: HeaderProps) => {
  
  return (
      <header className={styles.header}>
        <BurgerMenu />
       <Link href="/">Eleve.Eleven</Link>
        <ShoppingCart />
      </header>
    );
  };
  
  export default Header;  