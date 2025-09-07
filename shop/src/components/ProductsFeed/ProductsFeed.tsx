"use client";

import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { getProductNumericId } from "@/lib/shopify";
import Card from "./ProductCard/ProductCard";
import styles from "./ProductsFeed.module.scss";

interface ProductVariant {
  availableForSale: boolean;
  priceV2: { amount: string; currencyCode: string };
  compareAtPriceV2?: { amount: string; currencyCode: string } | null;
}

interface ProductNode {
  id: string;
  title: string;
  featuredImage?: { url: string; altText: string } | null;
  variants: {
    edges: { node: ProductVariant }[];
  };
}

interface ProductsData {
  products: { edges: { node: ProductNode }[] };
}

const GET_PRODUCTS = gql`
  query GetProducts {
    products(first: 5) {
      edges {
        node {
          id
          title
          featuredImage {
            url
            altText
          }
          variants(first: 1) {
            edges {
              node {
                availableForSale
                priceV2 {
                  amount
                  currencyCode
                }
                compareAtPriceV2 {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    }
  }
`;

const ProductsFeed = () => {
  const { data, loading, error } = useQuery<ProductsData>(GET_PRODUCTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <section className={styles.productsSection}>
      {data?.products.edges.map(({ node }) => {
        const numericId = getProductNumericId(node.id);
        const variant = node.variants.edges[0]?.node;

        if (!variant) return null;

        const price = parseFloat(variant.priceV2.amount);
        const compareAtPrice = parseFloat(variant.compareAtPriceV2?.amount || "0");
        const currency = variant.priceV2.currencyCode;

        const isSoldOut = !variant.availableForSale;

        // Скидка есть только если compareAtPrice > price
        const hasDiscount = compareAtPrice > price;

        // Считаем процент скидки в целых
        const discountPercent = hasDiscount
          ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100)
          : 0;

        return (
          <Card
            key={node.id}
            src={node.featuredImage?.url || "/images/BannerImage.webp"}
            alt={node.featuredImage?.altText || node.title}
            heading={node.title}
            price={`${price} ${currency}`}
            oldPrice={hasDiscount ? `${compareAtPrice} ${currency}` : undefined}
            discount={hasDiscount ? `${discountPercent}%` : undefined}
            isNew={true} // или любая твоя логика определения новых товаров
            soldOut={isSoldOut}
            href={`/products/${numericId}`}
          />
        );
      })}
    </section>
  );
};

export default ProductsFeed;
