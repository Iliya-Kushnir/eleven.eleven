"use client";

import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { useEffect, useState } from "react";
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
  limitFirst: number;
  featuredImage?: { url: string; altText: string } | null;
  createdAt: string;
  variants: {
    edges: { node: ProductVariant }[];
  };
}

interface ProductsData {
  products: {
    edges: { cursor: string; node: ProductNode }[];
    pageInfo: { hasNextPage: boolean; endCursor: string };
  };
}

interface ProductsFeedProps {
  showNewBadge?: boolean;
  showDiscountBadge?: boolean;
  showSoldOutBadge?: boolean;
  filter?: "all" | "new" | "sale";
  searchTerm?: string;
  type?: string;
  pageSize?: number;
  limitFirst?: number;
  isHomePage?: boolean;
}

const GET_PRODUCTS = gql`
  query GetProducts($first: Int!, $after: String) {
    products(first: $first, after: $after) {
      edges {
        cursor
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
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

const ProductsFeed: React.FC<ProductsFeedProps & { isHomePage?: boolean }> = ({
  showNewBadge = true,
  showDiscountBadge = true,
  showSoldOutBadge = true,
  filter = "all",
  searchTerm = "",
  type,
  pageSize = 20,
  limitFirst = 4,
  isHomePage = false,
}) => {
  const [products, setProducts] = useState<ProductNode[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [hasNextPage, setHasNextPage] = useState(true);

  const { data, loading, fetchMore, error } = useQuery<ProductsData>(
    GET_PRODUCTS,
    {
      variables: { first: isHomePage ? limitFirst : pageSize, after: null },
      notifyOnNetworkStatusChange: true,
    }
  );

  useEffect(() => {
    if (data) {
      const newProducts = data.products.edges.map((e) => e.node);
      setProducts(isHomePage ? newProducts.slice(0, limitFirst) : newProducts);
      setCursor(data.products.pageInfo.endCursor);
      setHasNextPage(data.products.pageInfo.hasNextPage);
    }
  }, [data, isHomePage, limitFirst]);

  useEffect(() => {
    if (isHomePage && products.length <= 20) return;

    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 500 &&
        hasNextPage &&
        !loading
      ) {
        fetchMore({
          variables: { first: pageSize, after: cursor },
        }).then((res) => {
          const newEdges = res.data?.products.edges.map((e) => e.node) || [];
          if (newEdges.length === 0) return;

          setProducts((prev) => [...prev, ...newEdges]);
          setCursor(res.data?.products.pageInfo.endCursor || null);
          setHasNextPage(res.data?.products.pageInfo.hasNextPage || false);
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [cursor, hasNextPage, loading, fetchMore, pageSize, products.length, isHomePage]);

  if (error) return <p>Error: {error.message}</p>;

  return (
    <section className={styles.productsSection}>
      {products
        .filter((node) => {
          const variant = node.variants.edges[0]?.node;
          if (!variant) return false;

          const price = parseFloat(variant.priceV2.amount);
          const compareAtPrice = parseFloat(
            variant.compareAtPriceV2?.amount || "0"
          );
          const isNew =
            (Date.now() - new Date(node.createdAt).getTime()) /
              (1000 * 60 * 60 * 24) <= 14;
          const hasDiscount = compareAtPrice > price;

          if (filter === "new") return isNew;
          if (filter === "sale") return hasDiscount;
          return true;
        })
        .filter((node) =>
          type ? node.productType?.toLowerCase() === type.toLowerCase() : true
        )
        .filter((node) =>
          searchTerm
            ? node.title.toLowerCase().includes(searchTerm.toLowerCase())
            : true
        )
        .map((node) => {
          const variant = node.variants.edges[0]?.node;
          if (!variant) return null;

          const price = parseFloat(variant.priceV2.amount);
          const compareAtPrice = parseFloat(
            variant.compareAtPriceV2?.amount || "0"
          );
          const currency = variant.priceV2.currencyCode;
          const isSoldOut = !variant.availableForSale;
          const hasDiscount = compareAtPrice > price;
          const discountPercent = hasDiscount
            ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100)
            : 0;
          const isNew =
            (Date.now() - new Date(node.createdAt).getTime()) /
              (1000 * 60 * 60 * 24) <=
            14;

          return (
            <Card
              key={node.id}
              src={node.featuredImage?.url || "/images/BannerImage.webp"}
              alt={node.featuredImage?.altText || node.title}
              heading={node.title}
              price={`${price} ${currency}`}
              oldPrice={
                showDiscountBadge && hasDiscount
                  ? `${compareAtPrice} ${currency}`
                  : undefined
              }
              discount={
                showDiscountBadge && hasDiscount
                  ? `${discountPercent}%`
                  : undefined
              }
              isNew={showNewBadge && isNew}
              soldOut={showSoldOutBadge && isSoldOut}
              href={`/products/${getProductNumericId(node.id)}`}
              showBadges={
                showDiscountBadge || showNewBadge || showSoldOutBadge
              }
            />
          );
        })}

      {loading && products.length > 20 && <p>Loading more products...</p>}
    </section>
  );
};

export default ProductsFeed;
