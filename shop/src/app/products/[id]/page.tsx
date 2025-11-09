/* eslint-disable */
import ProductPageClient from "./ProductPageClient";
import { getProductById } from "@/lib/shopify";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { id } = params;
  const product = await getProductById(id);

  const imageUrl =
    product.product.images?.edges?.[0]?.node?.url || "";
  const imageAlt =
    product.product.images?.edges?.[0]?.node?.altText ||
    product.product.title;

  return {
    title: product.product.title,
    description: product.product.description,
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



interface Params {
  id: string;
}

interface PageProps {
  params: Params;
}

// async page component
export default async function ProductPage({ params }: any) {
  const { id } = params;
  const data = await getProductById(id);

  if (!data?.product) return notFound();

  console.log("Product INFO:", data?.product)

  return <ProductPageClient product={data.product} />;
}