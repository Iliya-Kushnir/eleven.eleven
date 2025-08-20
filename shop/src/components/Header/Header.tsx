import Image from "next/image";
import BurgerMenu from "./BurgerMenu";
import ShoppingCart from "./SoppingCartBtn";

type HeaderProps = {
  label: string;
  src: string;
  alt: string;
};

const Header = ({ label, src, alt }: HeaderProps) => {
  
  return (
      <header className="h-57px w-[100%] flex flex-reverse-row center justify-between
      align-center">
        <Image 
        width={44}
        height={44}
        src={src} 
        alt={alt}/>

        <BurgerMenu />

        <ShoppingCart />
 
      </header>
    );
  };
  
  export default Header;  