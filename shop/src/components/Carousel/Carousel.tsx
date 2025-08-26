"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type Slide = {
  id: number | string;
  src: string;
  alt: string;
  href: string;
};
const defaultSlides: Slide[] = [
  { id: 1, src: "/images/BannerImage.webp", alt: "Photo 1", href: "/products" },
  { id: 2, src: "/images/BannerImage.webp", alt: "Photo 2", href: "/products" },
  { id: 3, src: "/images/BannerImage.webp", alt: "Photo 3", href: "/products" },
  { id: 4, src: "/images/BannerImage.webp", alt: "Photo 4", href: "/products" },
];

type CarouselProps = {
  slides?: Slide[];
  showNavigation?: boolean;
  showPagination?: boolean;
  slidesPerView?: number;
  width?: string | number; // например "100%" или 500
  height?: string | number; // например "300px" или 400
};

export default function Carousel({
  slides = defaultSlides,
  showNavigation = false,
  showPagination = false,
  slidesPerView = 1,
  width = "100%",
  height = 300,
}: CarouselProps) {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={10}
      slidesPerView={slidesPerView}
      navigation={showNavigation}
      pagination={showPagination ? { clickable: true } : false}
      breakpoints={{
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
      style={{ width, height }}
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.id}>
          <Link href={slide.href}>
            <div style={{ position: "relative", width: "100%", height: "100%" }}>
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                style={{ objectFit: "contain", borderRadius: "12px" }}
              />
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
