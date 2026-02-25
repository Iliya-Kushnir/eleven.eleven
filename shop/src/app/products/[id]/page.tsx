/* eslint-disable @typescript-eslint/no-explicit-any */
import ProductPageClient from "./ProductPageClient";
import { getProductById } from "@/lib/shopify";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "@/lib/get-translations";

/**
 * Генерирует динамические метаданные для каждого товара.
 */
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}): Promise<Metadata> {
  const { id } = await params;
  
  // Получаем данные на языке по умолчанию (или можно добавить логику определения языка)
  const productData = await getProductById(id);

  if (!productData?.product) {
    return {
      title: "Product Not Found | eleven:eleven",
    };
  }

  const product = productData.product;
  const imageUrl = product.featuredImage?.url || product.images?.edges?.[0]?.node?.url || "";
  const imageAlt = product.featuredImage?.altText || product.title;

  return {
    title: `${product.title} | eleven:eleven`,
    description: product.description?.slice(0, 160) || `Buy ${product.title} at eleven:eleven. Premium quality apparel.`,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [
        {
          url: imageUrl,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: product.title,
      description: product.description,
      images: [imageUrl],
    },
  };
}

export default async function ProductPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  const { lang } = await getTranslations();
  
  const shopifyLang = lang.toUpperCase(); 
  const data = await getProductById(id, shopifyLang);

  if (!data?.product) {
    return notFound();
  }

  return <ProductPageClient product={data.product} />;
}