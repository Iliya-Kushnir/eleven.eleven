"use client";
import { useState, useEffect, useMemo } from "react";
import Carousel from "@/components/Carousel/Carousel";
import SizeComponent, { Size } from "@/components/SizeComponent/SizeComponent";
import ColorsComp, { Color } from "@/components/ColorsComp/ColorsComp";
import DefaultButton from "@/components/defaultButton/defaultButton";
import ProductsFeed from "@/components/ProductsFeed/ProductsFeed";
import Accordion from "@/components/Accordion/Accordion";
import styles from "./page.module.scss";
import { useCartContext } from "@/context/CartContext";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

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
  sizeChart?: { reference?: { image?: { url: string; altText: string | null } } };
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

// ПРАВКА ТИПА: используем ключи Shopify (url и altText)
interface ActiveImage {
  url: string;
  altText: string | null;
}

const SIZE_NAMES = ["Size", "Розмір", "Размер", "Shoe size"];
const COLOR_NAMES = ["Color", "Колір", "Цвет"];

export default function ProductPageClient({ product }: Props) {
  const { lines, addItem } = useCartContext();
  const { t } = useLanguage();

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);
  // Инициализируем стейт картинки
  const [selectedImage, setSelectedImage] = useState<ActiveImage | undefined>();

  const variants = useMemo(() => product.variants?.edges.map(v => v.node) || [], [product]);

  const colorHexMap: Record<string, string> = {
    Black: "#000000",
    "Чорний": "#000000",
    White: "#FFFFFF",
    "Білий": "#FFFFFF",
    Red: "#FF0000",
    "Червоний": "#FF0000",
    Blue: "#0000FF",
    "Синій": "#0000FF",
    Green: "#008000",
    "Зелений": "#008000",
    Yellow: "#FFFF00",
    "Жовтий": "#FFFF00",
    Gray: "#808080",
    "Сірий": "#808080",
    Beige: "#F5F5DC",
    "Бежевий": "#F5F5DC",
    Brown: "#8B4513",
    "Коричневий": "#8B4513",
    Pink: "#FFC0CB",
    "Рожевий": "#FFC0CB",
    Orange: "#FFA500",
    "Помаранчевий": "#FFA500",
  };

  const ALL_SIZES = ["XS", "S", "M", "L", "XL", "2XL"];

  const allSizes: Size[] = useMemo(() => {
    return ALL_SIZES.map(size => {
      const hasVariant = variants.some(v =>
        v.selectedOptions.some(
          o => SIZE_NAMES.includes(o.name) && o.value === size
        )
      );
      return { id: size, value: size, available: hasVariant };
    });
  }, [variants]);

  const allColors: Color[] = useMemo(() => {
    const colorsSet = new Set(
      variants.map(v => v.selectedOptions.find(o => COLOR_NAMES.includes(o.name))?.value)
    );
    return Array.from(colorsSet)
      .filter(Boolean)
      .map((value, i) => ({
        id: `${i}`,
        name: value!,
        hex: colorHexMap[value!] || "#CCCCCC",
      }));
  }, [variants]);

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

  useEffect(() => {
    const firstVariant = variants[0];
    if (firstVariant) {
      setSelectedVariantId(firstVariant.id);
      setSelectedSize(firstVariant.selectedOptions.find(o => SIZE_NAMES.includes(o.name))?.value || null);
      setSelectedColor(firstVariant.selectedOptions.find(o => COLOR_NAMES.includes(o.name))?.value || null);
    }
  }, [variants]);

  useEffect(() => {
    const variant = variants.find(
      v =>
        v.selectedOptions.find(o => SIZE_NAMES.includes(o.name))?.value === selectedSize &&
        v.selectedOptions.find(o => COLOR_NAMES.includes(o.name))?.value === selectedColor
    );
    setSelectedVariantId(variant?.id || null);
  }, [selectedSize, selectedColor, variants]);

  const slides = useMemo(() => {
    // Используем url и altText везде
    const defaultSlides = product.images?.edges?.map((edge, index) => ({
      id: index,
      url: edge.node.url,
      altText: edge.node.altText || product.title,
      href: `/products/${product.id}`,
    })) || [];

    if (selectedColor && colorGalleries.length) {
      const gallery = colorGalleries.find(
        g => g.color.toLowerCase() === selectedColor.toLowerCase()
      );
      if (gallery && gallery.images.length) {
        return gallery.images.map((img, index) => ({
          id: index,
          url: img.url,
          altText: img.altText || product.title,
          href: `/products/${product.id}`,
        }));
      }
    }
    return defaultSlides;
  }, [product.images, colorGalleries, selectedColor, product.title, product.id]);

  const price = useMemo(() => {
    const variant = variants.find(v => v.id === selectedVariantId);
    return variant?.priceV2?.amount
      ? `${variant.priceV2.amount} ${variant.priceV2.currencyCode}`
      : t('product.out_of_stock');
  }, [variants, selectedVariantId, t]);

  const isInCart = selectedVariantId ? lines.some(line => line.merchandise.id === selectedVariantId) : false;

  // Синхронизируем выбранную картинку со слайдами
  useEffect(() => {
    const firstSlide = slides[0];
    if (firstSlide) {
      setSelectedImage({
        url: firstSlide.url,
        altText: firstSlide.altText,
      });
    }
  }, [slides]);

  return (
    <div className="font-sans flex flex-col items-center justify-items-center p-2.5 pb-2.5 sm:p-20 relative">
      <div className={styles.productWrapper}>
        <div className={styles.carouselContainer}>
          {/* Для карусели передаем данные в нужном ей формате, если она ожидает src/alt */}
          <Carousel 
            height={400} 
            slides={slides.map(s => ({ ...s, src: s.url, alt: s.altText }))} 
            showPagination={true} 
          />
        </div>

        <div className={styles.images}>
          {slides.map((slide, index) => (
            <Image 
              width={500} 
              height={700} 
              key={index} 
              src={slide.url} 
              alt={slide.altText || ""} 
              priority={index === 0} 
            />
          ))}
        </div>

        <div className={styles.productInfo}>
          <h1 className={styles.productName}>{product.title}</h1>
          <span className={styles.price}>{price}</span>

          <h1 className={styles.secondaryText}>{t('product.size') || 'SIZE'}</h1>
          <SizeComponent sizes={allSizes} onSelect={setSelectedSize} />

          <h1 className={styles.secondaryText}>{t('product.color')}</h1>
          <ColorsComp colors={allColors} onSelect={c => setSelectedColor(c.name)} />

          <h1 className={styles.secondaryText}>{t('product.size_guide')}</h1>
          
          <DefaultButton
            type="button"
            label={isInCart ? t('product.already_in_cart') : t('product.add_to_cart')}
            disabled={!selectedVariantId || isInCart}
            onClick={() => {
              if (selectedVariantId) {
                // Теперь типы совпадают идеально
                addItem(selectedVariantId, 1, selectedImage);
              }
            }}
          />

          <Accordion
            descriptionHtml={product.descriptionHtml || product.description}
            sizeGuide={product.sizeChart}
          />
        </div>
      </div>
      <ProductsFeed isHomePage={true} />
    </div>
  );
}