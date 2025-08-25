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
