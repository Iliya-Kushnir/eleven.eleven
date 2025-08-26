// src/app/products/[id]/page.tsx
/*


import { notFound } from "next/navigation";
import Carousel from "@/components/Carousel/Carousel";
import SizeComponent from "@/components/SizeComponent/SizeComponent";
import DefaultButton from "@/components/defaultButton/defaultButton";
import ProductsFeed from "@/components/ProductsFeed/ProductsFeed";
import ColorsComp from "@/components/ColorsComp/ColorsComp";
import Accordion from "@/components/Accordion/Accordion";
import styles from "./page.module.scss";

const products = [
  { id: "1", name: "1000 GSM 'ANTHRACITE' DOUBLE HOODIE", price: "100.00$" },
  { id: "2", name: "3000 GSM 'ANTHRACITE' DOUBLE ZIP-HOODIE", price: "200.00$" },
];

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}


export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === params.id);

  if (!product) notFound();

  return (
    <div className="font-sans flex flex-col items-center justify-items-center p-2.5 pb-2.5 sm:p-20">
           <Carousel showNavigation={true} showPagination={true} />

            <h1 className={styles.productName}>{product.name}</h1>
            <span className={styles.price}>{product.price}</span>

            <h1 className={styles.secondaryText}>SIZE</h1>
            <SizeComponent />

            <h1 className={styles.secondaryText}>SIZE GUIDE</h1>
            <DefaultButton label="ADD TO CART" />

            <h1 className={styles.secondaryText}>COLOR</h1>
            <ColorsComp />

            <Accordion />
            <ProductsFeed />
    </div>
  );
}

 





"use client";

import { gql } from "@apollo/client";
import { useQuery} from "@apollo/client/react"

const GET_PRODUCT_BY_ID = gql`
  query getProductById($id: ID!) {
    product(id: $id) {
      id
      title
      description
      variants(first: 1) {
        edges {
          node {
            id
            priceV2 {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;

interface Product {
  id: string;
  title: string;
  description: string;
  variants: {
    edges: {
      node: {
        id: string;
        priceV2: {
          amount: string;
          currencyCode: string;
        };
      };
    }[];
  };
}

interface GetProductByIdData {
  product: Product;
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const shopifyId = decodeURIComponent(params.id);

  const { data, loading, error } = useQuery<GetProductByIdData>(GET_PRODUCT_BY_ID, {
    variables: { id: shopifyId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data?.product) return <p>Not found</p>;

  const product = data.product;
  const price = product.variants.edges[0]?.node.priceV2;

  return (
    <div>
      <h1>{product.title}</h1>
      <p>
        {price.amount} {price.currencyCode}
      </p>
    </div>
  );
}
*/

// src/app/products/[id]/page.tsx


"use client";

import { notFound } from "next/navigation";
import Carousel from "@/components/Carousel/Carousel";
import SizeComponent from "@/components/SizeComponent/SizeComponent";
import DefaultButton from "@/components/defaultButton/defaultButton";
import ProductsFeed from "@/components/ProductsFeed/ProductsFeed";
import ColorsComp from "@/components/ColorsComp/ColorsComp";
import Accordion from "@/components/Accordion/Accordion";
import styles from "./page.module.scss";
import { getProductById } from "@/lib/shopify";
import { useState, useEffect, use } from "react";

interface ProductType {
  id: string;
  title: string;
  description: string;
  images?: {
    edges: {
      node: {
        url: string;
        altText?: string | null;
      };
    }[];
  };
  featuredImage?: { url: string; altText: string } | null;
  variants?: { edges: { node: { priceV2: { amount: string; currencyCode: string } } }[] };
}

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params); // разворачиваем Promise
  const [product, setProduct] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState(true);

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

  console.log("This is product:", product)

  return (
    <div className="font-sans flex flex-col items-center justify-items-center p-2.5 pb-2.5 sm:p-20">
      <Carousel
      height={400}
      slides={product.images?.edges.map((edge, index) => ({
        id: index,
        src: edge.node.url,
        alt: edge.node.altText || product.title,
        href: `/products/${id}`,
      })) || []}
      
      showPagination={true}
    />

      <h1 className={styles.productName}>{product.title}</h1>
      <span className={styles.price}>
        {price ? `${price.amount} ${price.currencyCode}` : "0 $"}
      </span>
      <h1 className={styles.secondaryText}>SIZE</h1>
      <SizeComponent />
      <h1 className={styles.secondaryText}>SIZE GUIDE</h1>
      <DefaultButton label="ADD TO CART" />
      <h1 className={styles.secondaryText}>COLOR</h1>
      <ColorsComp />
      <Accordion />
      <ProductsFeed />
    </div>
  );
}
