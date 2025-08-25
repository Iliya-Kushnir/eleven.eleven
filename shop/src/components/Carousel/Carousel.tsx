
/*
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type Slide = {
  id: number;
  src: string;
  alt: string;
  href: string;
};

const slides: Slide[] = [
  { id: 1, src: "/images/BannerImage.webp", alt: "Photo 1", href: "/products" },
  { id: 2, src: "/images/BannerImage.webp", alt: "Photo 2", href: "/products" },
  { id: 3, src: "/images/BannerImage.webp", alt: "Photo 3", href: "/products" },
  { id: 4, src: "/images/BannerImage.webp", alt: "Photo 4", href: "/products" },
];



export default function Carousel() {

  return (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={20}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      breakpoints={{
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
      style={{ width: "100%", height: "auto" }}
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.id}>
          <Link href={slide.href}>
            <div style={{ position: "relative", width: "100%", height: "300px" }}>
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                style={{ objectFit: "cover", borderRadius: "12px" }}
              />
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}


---------------------------
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type Slide = {
  id: number;
  src: string;
  alt: string;
  href: string;
};

type CarouselProps = {
  slides: Slide[];
  showNavigation?: boolean;
  showPagination?: boolean;
};

export default function Carousel({
   slides = [
    { id: 1, src: "/images/BannerImage.webp", alt: "Photo 1", href: "/products" },
    { id: 2, src: "/images/BannerImage.webp", alt: "Photo 2", href: "/products" },
    { id: 3, src: "/images/BannerImage.webp", alt: "Photo 3", href: "/products" },
    { id: 4, src: "/images/BannerImage.webp", alt: "Photo 4", href: "/products" },
  ], // <- по умолчанию пустой массив
  showNavigation = true,
  showPagination = true
}: CarouselProps) {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={20}
      slidesPerView={1}
      navigation={showNavigation}
      pagination={showPagination ? { clickable: true } : false}
      breakpoints={{
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
      style={{ width: "100%", height: "auto" }}
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.id}>
          <Link href={slide.href}>
            <div style={{ position: "relative", width: "100%", height: "300px" }}>
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                style={{ objectFit: "cover", borderRadius: "12px" }}
              />
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

*/




"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type Slide = {
  id: number;
  src: string;
  alt: string;
  href: string;
};

type CarouselProps = {
  showNavigation?: boolean; // стрелки
  showPagination?: boolean; // точки
};

const slides: Slide[] = [
  { id: 1, src: "/images/BannerImage.webp", alt: "Photo 1", href: "/products" },
  { id: 2, src: "/images/BannerImage.webp", alt: "Photo 2", href: "/products" },
  { id: 3, src: "/images/BannerImage.webp", alt: "Photo 3", href: "/products" },
  { id: 4, src: "/images/BannerImage.webp", alt: "Photo 4", href: "/products" },
  { id: 5, src: "/images/BannerImage.webp", alt: "Photo 4", href: "/products" },
  { id: 6, src: "/images/BannerImage.webp", alt: "Photo 4", href: "/products" },
];

export default function Carousel({
  showNavigation = false, // по умолчанию для домашней страницы свайп без стрелок
  showPagination = false, // по умолчанию без точек
}: CarouselProps) {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={3}
      slidesPerView={3}
      navigation={showNavigation}
      pagination={showPagination ? { clickable: true } : false}
      breakpoints={{
        640: { slidesPerView: 3 },
        1024: { slidesPerView: 3 },
      }}
      style={{ width: "100%", height: "auto" }}
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.id}>
          <Link  href={slide.href}>
            <div style={{ position: "relative", width: "100%", height: "130px" }}>
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                style={{ objectFit: "cover", borderRadius: "12px" }}
              />
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
