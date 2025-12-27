/* eslint-disable @typescript-eslint/no-explicit-any */
import ProductPageClient from "./ProductPageClient";
import { getProductById } from "@/lib/shopify";
import { Metadata } from "next";
import { notFound } from "next/navigation";

/**
 * Генерирует метаданные для страницы товара.
 * В Next.js 15+ params — это Promise.
 */
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}): Promise<Metadata> {
  const { id } = await params;
  const productData = await getProductById(id);

  if (!productData?.product) {
    return {
      title: "Product Not Found",
    };
  }

  const product = productData.product;
  const imageUrl = product.images?.edges?.[0]?.node?.url || "";
  const imageAlt = product.images?.edges?.[0]?.node?.altText || product.title;

  return {
    title: product.title,
    description: product.description,
    openGraph: {
      images: [
        {
          url: imageUrl,
          alt: imageAlt,
        },
      ],
    },
  };
}

/**
 * Основной серверный компонент страницы товара.
 */
export default async function ProductPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  // Обязательно используем await для извлечения id в Next.js 15
  const { id } = await params;
  
  const data = await getProductById(id);

  // Если товар не найден в Shopify, возвращаем стандартную 404 страницу
  if (!data?.product) {
    return notFound();
  }

  console.log("Product INFO loaded for ID:", id);

  return <ProductPageClient product={data.product} />;
}