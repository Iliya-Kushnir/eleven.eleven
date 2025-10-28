"use client";
import { useState, useEffect, useMemo } from "react";
import Carousel from "@/components/Carousel/Carousel";
import SizeComponent, { Size } from "@/components/SizeComponent/SizeComponent";
import ColorsComp, { Color } from "@/components/ColorsComp/ColorsComp";
import DefaultButton from "@/components/defaultButton/defaultButton";
import ProductsFeed from "@/components/ProductsFeed/ProductsFeed";
import Accordion from "@/components/Accordion/Accordion";
import styles from "./page.module.scss";
import { useCart } from "@/hooks/useCart";
import { useCartContext } from "@/context/CartContext";
import Image from "next/image";

interface ProductVariant {
  id: string;
  priceV2: { amount: string; currencyCode: string };
  selectedOptions: { name: string; value: string }[];
}

interface ProductType {
  id: string;
  title: string;
  description?: string;
  descriptionHtml?: string;
  featuredImage?: { url: string; altText?: string | null } | null;
  images?: { edges: { node: { url: string; altText?: string | null } }[] };
  variants?: { edges: { node: ProductVariant }[] };
  metafield?: { key: string; value: string | null } | null;
}

interface Props {
  product: ProductType;
}

interface ColorGallery {
  color: string;
  images: { url: string; altText?: string | null }[];
}

interface ActiveImage {
    src: string ;
    alt: string | null ;
}
  

export default function ProductPageClient({ product }: Props) {
  const { lines, addItem } = useCartContext();
  console.log("Full info:", lines)

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<ActiveImage | {src: string; alt: string}>()

  const variants = useMemo(() => product.variants?.edges.map(v => v.node) || [], [product]);

  console.log("PRODUCT:", variants)


  // ---- Сбор цветов ----
  const colorHexMap: Record<string, string> = {
    Black: "#000000",
    White: "#FFFFFF",
    Red: "#FF0000",
    Blue: "#0000FF",
    Green: "#008000",
    Yellow: "#FFFF00",
    Gray: "#808080",
    Beige: "#F5F5DC",
    Brown: "#8B4513",
    Pink: "#FFC0CB",
    Orange: "#FFA500",
  };

  const ALL_SIZES = ["XS", "S", "M", "L", "XL", "2XL"];
  const allSizes: Size[] = useMemo(() => {
    return ALL_SIZES.map(size => {
      const hasVariant = variants.some(v =>
        v.selectedOptions.some(
          o => (o.name === "Size" || o.name === "Shoe size") && o.value === size
        )
      );
      return { id: size, value: size, available: hasVariant };
    });
  }, [variants]);

  const allColors: Color[] = useMemo(() => {
    const colorsSet = new Set(variants.map(v => v.selectedOptions.find(o => o.name === "Color")?.value));
    return Array.from(colorsSet)
      .filter(Boolean)
      .map((value, i) => ({
        id: `${i}`,
        name: value!,
        hex: colorHexMap[value!] || "#CCCCCC",
      }));
  }, [variants]);

  console.log("Product color:", product.metafield)

  // ---- Парсим JSON из metafield ----
  const colorGalleries: ColorGallery[] = useMemo(() => {
    if (!product.metafield?.value) return [];
    try {
      const parsed = JSON.parse(product.metafield.value) as Record<string, { url: string; altText?: string | null }[]>;
      return Object.entries(parsed).map(([color, images]) => ({
        color,
        images,
      }));
    } catch {
      return [];
    }
  }, [product.metafield]);

  // ---- Автовыбор первого варианта ----
  useEffect(() => {
    const firstVariant = variants[0];
    if (firstVariant) {
      setSelectedVariantId(firstVariant.id);
      setSelectedSize(firstVariant.selectedOptions.find(o => o.name === "Size" || o.name === "Shoe size")?.value || null);
      setSelectedColor(firstVariant.selectedOptions.find(o => o.name === "Color")?.value || null);
    }
  }, [variants]);

  // ---- Обновление выбранного варианта при смене size/color ----
  useEffect(() => {
    const variant = variants.find(
      v =>
        v.selectedOptions.find(o => o.name === "Size" || o.name === "Shoe size")?.value === selectedSize &&
        v.selectedOptions.find(o => o.name === "Color")?.value === selectedColor
    );
    setSelectedVariantId(variant?.id || null);
  }, [selectedSize, selectedColor, variants]);

  // ---- Формируем слайды для карусели ----
  const slides = useMemo(() => {
    // Берём все картинки продукта по умолчанию
    const defaultSlides = product.images?.edges?.map((edge, index) => ({
      id: index,
      src: edge.node.url,
      alt: edge.node.altText || product.title,
      href: `/products/${product.id}`,
    })) || [];
  
    // Если выбран цвет и есть галерея из metafield — используем её
    if (selectedColor && colorGalleries.length) {
      const gallery = colorGalleries.find(
        g => g.color.toLowerCase() === selectedColor.toLowerCase()
      );
      if (gallery && gallery.images.length) {
        return gallery.images.map((img, index) => ({
          id: index,
          src: img.url,
          alt: img.altText || product.title,
          href: `/products/${product.id}`,
        }));
      }
    }
  
    // Если галереи нет — просто возвращаем дефолтные изображения
    return defaultSlides;
  }, [product.images, colorGalleries, selectedColor]);
  
  

  const price = useMemo(() => {
    const variant = variants.find(v => v.id === selectedVariantId);
    return variant?.priceV2?.amount
      ? `${variant.priceV2.amount} ${variant.priceV2.currencyCode}`
      : "Нет в наличии";
  }, [variants, selectedVariantId]);

  const isInCart = selectedVariantId ? lines.some(line => line.merchandise.id === selectedVariantId) : false;

  console.log("Активный цвет:", selectedColor);

  console.log("Слайды:", slides);



  useEffect(() => {
    const firstSlide = slides[0];
    setSelectedImage({
      src: firstSlide?.src || "",
      alt: firstSlide?.alt || null,
    });

    console.log("ACTIVE IMAGE:", slides)
  }, [slides]);
  
  console.log("SELECTED IMAGE:", selectedImage)


  return (
    <div className="font-sans flex flex-col items-center justify-items-center p-2.5 pb-2.5 sm:p-20 relative">
    <div className={styles.productWrapper}>

    <div className={styles.carouselContainer}>
    <Carousel height={400} slides={slides} showPagination={true} />
    </div>
      

      <div className={styles.images}>
        {slides.map((slide, index) => (
            <Image width={500} height={700} loading="lazy" key={index} src={slide.src} alt={slide.alt} />
        ))}
      </div>

        <div className={styles.productInfo}>
        <h1 className={styles.productName}>{product.title}</h1>
        <span className={styles.price}>{price}</span>

        <h1 className={styles.secondaryText}>SIZE</h1>
        <SizeComponent sizes={allSizes} onSelect={setSelectedSize} />

        <h1 className={styles.secondaryText}>COLOR</h1>
        <ColorsComp colors={allColors} onSelect={c => setSelectedColor(c.name)} />

        <h1 className={styles.secondaryText}>SIZE GUIDE</h1>
        <DefaultButton
            type="button"
            label={isInCart ? "ALREADY IN CART" : "ADD TO CART"}
            disabled={!selectedVariantId || isInCart}
            onClick={() =>
                selectedVariantId &&
                addItem(selectedVariantId, 1, selectedImage, product.title)
            }
            
        />

        <Accordion descriptionHtml={product.description} />
        </div>
    </div>
      <ProductsFeed isHomePage={true}/>
    </div>
  );
}
