"use client";
import { use } from "react";
import { notFound } from "next/navigation";
import Carousel from "@/components/Carousel/Carousel";
import SizeComponent from "@/components/SizeComponent/SizeComponent";
import DefaultButton from "@/components/defaultButton/defaultButton";
import ProductsFeed from "@/components/ProductsFeed/ProductsFeed";
import ColorsComp from "@/components/ColorsComp/ColorsComp";
import Accordion from "@/components/Accordion/Accordion";
import styles from "./page.module.scss";
import { getProductById } from "@/lib/shopify";
import { useState, useEffect } from "react";
import { useCart } from "@/hooks/useCart"; // импорт хука


interface ProductType {
  id: string;
  title: string;
  description?: string;
  images?: {
    edges: {
      node: {
        url: string;
        altText?: string | null;
      };
    }[];
  };
  featuredImage?: { url: string; altText: string } | null;
  variants?: { edges: { node: { id: string; priceV2: { amount: string; currencyCode: string } } }[] };
}

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params); // теперь это обычная строка
  const [product, setProduct] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState(true);


 const { lines, addItem } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        if (!data.product) {
          notFound();
          return;
        }
        setProduct(data.product as ProductType);
      } catch {
        notFound();
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!product) return null;

  const price = product.variants?.edges[0]?.node.priceV2;
  const variantId = product.variants?.edges[0]?.node.id;

  const isInCart = variantId ? lines.some(line => line.merchandise.id === variantId) : false;

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
      <span className={styles.price}>
        {price ? `${price.amount} ${price.currencyCode}` : "0 $"}
      </span>
      <h1 className={styles.secondaryText}>SIZE</h1>
      <SizeComponent />
      <h1 className={styles.secondaryText}>SIZE GUIDE</h1>

      <DefaultButton
        type="button"
        label={isInCart ? "ALREADY IN CART" : "ADD TO CART"}
        disabled={isInCart || !variantId}
        onClick={() => variantId && addItem(variantId)}
        href="/"
      />

      <h1 className={styles.secondaryText}>COLOR</h1>
      <ColorsComp />
      <Accordion />
      <ProductsFeed />
    </div>
  );
}
