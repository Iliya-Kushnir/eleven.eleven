import Banner from "@/components/Banner/Banner";
import ProductsFeed from "@/components/ProductsFeed/ProductsFeed";
import DefaultButton from "@/components/defaultButton/defaultButton";
import Carousel from "@/components/Carousel/Carousel";
import SectionGridBtns from "@/components/SectionGridBtns/SectionGridBtns";

export default function Home() {
  return (
    <div className="font-sans flex flex-col items-center justify-items-center min-h-screen p-2.5 pb-2.5 sm:p-20">

    <Banner />

    <ProductsFeed />

    <div style={{width: "100px", height: "35px", marginBottom: "40px", marginTop: "40px"}}>
    <DefaultButton label="VIEW ALL"/>
    </div>

    <Carousel  />


    <SectionGridBtns />
      
    </div>
  );
}
