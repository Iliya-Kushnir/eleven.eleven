/* eslint-disable */
import ProductPageClient from "./ProductPageClient";
import { getProductById } from "@/lib/shopify";
import { notFound } from "next/navigation";

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

  return <ProductPageClient product={data.product} />;
}