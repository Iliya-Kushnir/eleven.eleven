/*
"use client";
import { use } from "react";
import { notFound } from "next/navigation";
import Carousel from "@/components/Carousel/Carousel";
import SizeComponent, { Size } from "@/components/SizeComponent/SizeComponent";
import ColorsComp, { Color } from "@/components/ColorsComp/ColorsComp";
import DefaultButton from "@/components/defaultButton/defaultButton";
import ProductsFeed from "@/components/ProductsFeed/ProductsFeed";
import Accordion from "@/components/Accordion/Accordion";
import styles from "./page.module.scss";
import { getProductById } from "@/lib/shopify";
import { useState, useEffect, useMemo } from "react";
import { useCart } from "@/hooks/useCart";

interface ProductVariant {
  id: string;
  priceV2: { amount: string; currencyCode: string };
  selectedOptions: { name: string; value: string }[];
}

interface ProductType {
  id: string;
  title: string;
  description?: string;
  images?: { edges: { node: { url: string; altText?: string | null } }[] };
  variants?: { edges: { node: ProductVariant }[] };
}

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [product, setProduct] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState(true);
  const { lines, addItem } = useCart();

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);

  // Загружаем продукт
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        if (!data.product) {
          notFound();
          return;
        }
        setProduct(data.product as ProductType);

        // Автоматический выбор первого варианта
        const firstVariant = data.product.variants?.edges[0]?.node;
        if (firstVariant) {
          setSelectedVariantId(firstVariant.id);
          const sizeOption = firstVariant.selectedOptions.find(o => o.name === "Size");
          const colorOption = firstVariant.selectedOptions.find(o => o.name === "Color");
          setSelectedSize(sizeOption?.value || null);
          setSelectedColor(colorOption?.value || null);
        }
      } catch {
        notFound();
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // Все варианты
  const variants = useMemo(() => product?.variants?.edges.map(v => v.node) || [], [product]);

  // Уникальные размеры и цвета
  const allSizes: Size[] = useMemo(() => {
    const sizesSet = new Set(variants.map(v => v.selectedOptions.find(o => o.name === "Size")?.value));
    return Array.from(sizesSet)
      .filter(Boolean)
      .map(value => ({ id: value!, value: value!, available: true }));
  }, [variants]);

  const allColors: Color[] = useMemo(() => {
    const colorsSet = new Set(variants.map(v => v.selectedOptions.find(o => o.name === "Color")?.value));
    return Array.from(colorsSet)
      .filter(Boolean)
      .map((value, i) => ({
        id: `${i}`,
        name: value!,
        hex: value === "White" ? "#fff" : "#000" // маппинг цветов можно расширить
      }));
  }, [variants]);

  // При изменении цвета/размера находим соответствующий variantId
  useEffect(() => {
    const variant = variants.find(
      v =>
        v.selectedOptions.find(o => o.name === "Size")?.value === selectedSize &&
        v.selectedOptions.find(o => o.name === "Color")?.value === selectedColor
    );
    setSelectedVariantId(variant?.id || null);
  }, [selectedSize, selectedColor, variants]);

  if (loading) return <p>Loading...</p>;
  if (!product) return null;

  const price = variants.find(v => v.id === selectedVariantId)?.priceV2;
  const isInCart = selectedVariantId ? lines.some(line => line.merchandise.id === selectedVariantId) : false;

  return (
    <div className="font-sans flex flex-col items-center justify-items-center p-2.5 pb-2.5 sm:p-20">
      <Carousel
        height={400}
        slides={
          product.images?.edges.map((edge, index) => ({
            id: index,
            src: edge.node.url,
            alt: edge.node.altText || product.title,
            href: `/products/${id}`,
          })) || []
        }
        showPagination={true}
      />

      <h1 className={styles.productName}>{product.title}</h1>
      <span className={styles.price}>{price ? `${price.amount} ${price.currencyCode}` : "0 UAH"}</span>

      <h1 className={styles.secondaryText}>SIZE</h1>
      <SizeComponent
        sizes={allSizes}
        onSelect={setSelectedSize}
      />

      <h1 className={styles.secondaryText}>COLOR</h1>
      <ColorsComp
        colors={allColors}
        onSelect={color => setSelectedColor(color.name)}
      />



      <h1 className={styles.secondaryText}>SIZE GUIDE</h1>
      <DefaultButton
        type="button"
        label={isInCart ? "ALREADY IN CART" : "ADD TO CART"}
        disabled={!selectedVariantId || isInCart}
        onClick={() => selectedVariantId && addItem(selectedVariantId, 1)}
      />

      <Accordion />
      <ProductsFeed />
    </div>
  );
}
*/


import ProductPageClient from "./ProductPageClient";
import { getProductById } from "@/lib/shopify";
import { notFound } from "next/navigation";

// async page component
export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;
  const data = await getProductById(id);

  if (!data.product) return notFound();

  return <ProductPageClient product={data.product} />;
}