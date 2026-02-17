import Banner from "@/components/Banner/Banner";
import ProductsFeed from "@/components/ProductsFeed/ProductsFeed";
import DefaultButton from "@/components/defaultButton/defaultButton";
import SectionGridBtns from "@/components/SectionGridBtns/SectionGridBtns";
import ModalEmail from "@/components/ModalEmail/ModalEmail";
import SliderComponent from "@/components/Slider/Slider";
import { useLanguage } from "@/context/LanguageContext";
import { getTranslations } from "@/lib/get-translations";

export default async function Home() {
  const { t } = await getTranslations();

  return (
    <div className="font-sans flex flex-col items-center justify-items-center min-h-screen  pb-2.5  sm:p-20 sm:pt-[0px]">

    <Banner />

    <ProductsFeed
        isHomePage={true}
        limitFirst={4}      
        pageSize={20}     
        showNewBadge={false}
        showDiscountBadge={true}
        showSoldOutBadge={true}
      />

    <div style={{width: "100px", height: "35px", marginBottom: "40px", marginTop: "40px"}}>
    <DefaultButton href="/products" type="button" label={t('home.hero.button_alt')}/>
    </div>


    <SliderComponent />

    <SectionGridBtns />

    <ModalEmail />
      
    </div>
  );
}