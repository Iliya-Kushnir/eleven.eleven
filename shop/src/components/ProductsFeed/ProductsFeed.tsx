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
  productType: string;
  featuredImage?: { url: string; altText: string } | null;
  createdAt: string;
  variants: {
    edges: { node: ProductVariant }[];
  };
}

interface ProductsData {
  products: { edges: { node: ProductNode }[] };
}

interface ProductsFeedProps {
  showNewBadge?: boolean;
  showDiscountBadge?: boolean;
  showSoldOutBadge?: boolean;
  filter?: "all" | "new" | "sale";
  searchTerm?: string;
  type?: string; 
}

const GET_PRODUCTS = gql`
  query GetProducts {
    products(first: 20) {
      edges {
        node {
          id
          title
          productType
          createdAt
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

const ProductsFeed: React.FC<ProductsFeedProps> = ({
  showNewBadge = true,
  showDiscountBadge = true,
  showSoldOutBadge = true,
  filter = "all",
  searchTerm = "",
  type
}) => {
  const { data, loading, error } = useQuery<ProductsData>(GET_PRODUCTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Фильтруем продукты
  let filteredProducts = data?.products.edges.filter(({ node }) => {
    const variant = node.variants.edges[0]?.node;
    if (!variant) return false;

    const price = parseFloat(variant.priceV2.amount);
    const compareAtPrice = parseFloat(variant.compareAtPriceV2?.amount || "0");
    const isNew = (Date.now() - new Date(node.createdAt).getTime()) / (1000 * 60 * 60 * 24) <= 14;
    const hasDiscount = compareAtPrice > price;

    if (filter === "new") return isNew;
    if (filter === "sale") return hasDiscount;
    return true;
  }) ?? [];

  // Фильтруем по поисковому слову
  if (searchTerm.trim() !== "") {
    filteredProducts = filteredProducts.filter(({ node }) =>
      node.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Фильтруем по типу
  if (type) {
    filteredProducts = filteredProducts.filter(
      ({ node }) =>
        node.productType?.toLowerCase().trim() === type.toLowerCase().trim()
    );
  }

  return (
    <section className={styles.productsSection}>
      {filteredProducts.map(({ node }) => {
        const variant = node.variants.edges[0]?.node;
        if (!variant) return null; // безопасная проверка

        const price = parseFloat(variant.priceV2.amount);
        const compareAtPrice = parseFloat(variant.compareAtPriceV2?.amount || "0");
        const currency = variant.priceV2.currencyCode;
        const isSoldOut = !variant.availableForSale;
        const hasDiscount = compareAtPrice > price;
        const discountPercent = hasDiscount ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100) : 0;
        const isNew = (Date.now() - new Date(node.createdAt).getTime()) / (1000 * 60 * 60 * 24) <= 14;

        return (
          <Card
            key={node.id}
            src={node.featuredImage?.url || "/images/BannerImage.webp"}
            alt={node.featuredImage?.altText || node.title}
            heading={node.title}
            price={`${price} ${currency}`}
            oldPrice={showDiscountBadge && hasDiscount ? `${compareAtPrice} ${currency}` : undefined}
            discount={showDiscountBadge && hasDiscount ? `${discountPercent}%` : undefined}
            isNew={showNewBadge && isNew}
            soldOut={showSoldOutBadge && isSoldOut}
            href={`/products/${getProductNumericId(node.id)}`}
            showBadges={showDiscountBadge || showNewBadge || showSoldOutBadge}
          />
        );
      })}
    </section>
  );
};

export default ProductsFeed;
