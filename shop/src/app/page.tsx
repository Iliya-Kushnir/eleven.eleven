import Banner from "@/components/Banner/Banner";
import ProductsFeed from "@/components/ProductsFeed/ProductsFeed";
import DefaultButton from "@/components/defaultButton/defaultButton";
import SectionGridBtns from "@/components/SectionGridBtns/SectionGridBtns";
import ModalEmail from "@/components/ModalEmail/ModalEmail";
import SliderComponent from "@/components/Slider/Slider";
import { useLanguage } from "@/context/LanguageContext";


export default async function Home() {

  return (
    <div className="font-sans flex flex-col items-center justify-items-center min-h-screen p-2.5 pb-2.5 sm:p-20">

    

    <Banner />

    <ProductsFeed
        isHomePage={true}
        limitFirst={4}       // выводим ровно 4 товара
        pageSize={20}        // размер подгрузки, но на главной странице он не используется
        showNewBadge={false}
        showDiscountBadge={true}
        showSoldOutBadge={true}
      />

    <div style={{width: "100px", height: "35px", marginBottom: "40px", marginTop: "40px"}}>
    <DefaultButton href="/products" type="button" label="VIEW ALL"/>
    </div>


    <SliderComponent />

    <SectionGridBtns />

    <ModalEmail />
      
    </div>
  );
}