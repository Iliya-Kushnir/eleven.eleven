"use client";

import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { getProductNumericId} from "@/lib/shopify"
import Card from "./ProductCard/ProductCard";
import styles from "./ProductsFeed.module.scss";

interface ProductNode {
  id: string;
  title: string;
  featuredImage?: { url: string; altText: string } | null;
  variants: {
    edges: {
      node: {
        priceV2: { amount: string; currencyCode: string };
      };
    }[];
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
                priceV2 {
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
        const price = node.variants.edges[0]?.node.priceV2.amount || "0";
        const currency = node.variants.edges[0]?.node.priceV2.currencyCode || "$";

        return (
          <Card
            key={node.id}
            src={node.featuredImage?.url || "/images/BannerImage.webp"}
            alt={node.featuredImage?.altText || node.title}
            heading={node.title}
            price={`${price} ${currency}`}
            href={`/products/${numericId}`}
          />
        );
      })}
    </section>
  );
};

export default ProductsFeed;
