import Image from "next/image";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Banner from "@/components/Banner/Banner";
import ProductsFeed from "@/components/ProductsFeed/ProductsFeed";
import DefaultButton from "@/components/defaultButton/defaultButton";
import Carousel from "@/components/Carousel/Carousel";
import SectionGridBtns from "@/components/SectionGridBtns/SectionGridBtns";

export default function Home() {
  return (
    <div className="font-sans flex flex-col items-center justify-items-center min-h-screen p-2.5 pb-2.5 sm:p-20">
      <Header 
      label="Hello world"
      src="https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/396e9/MainBefore.jpg"
      alt="sobaka"
      />
    <Banner />

    <ProductsFeed />

    <DefaultButton label="VIEW ALL"/>

    <Carousel />

    <SectionGridBtns />
      
      <Footer />
    </div>
  );
}
