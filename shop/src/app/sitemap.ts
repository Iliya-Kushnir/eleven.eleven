import { MetadataRoute } from "next";
import { shopifyFetch } from "@/lib/shopify";

interface ProductNode {
  handle: string;
  updatedAt?: string;
}

interface ShopifyResponse {
  products: {
    edges: { node: ProductNode }[];
    pageInfo: { hasNextPage: boolean; endCursor: string | null };
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

  const query = `
    query GetProducts($first: Int!, $after: String) {
      products(first: $first, after: $after) {
        edges {
          cursor
          node {
            id
            handle
            title
            createdAt
            updatedAt
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  `;

  let allProducts: ProductNode[] = [];
  let hasNextPage = true;
  let after: string | null = null;

  while (hasNextPage) {
    const res: ShopifyResponse = await shopifyFetch<ShopifyResponse>(query, {
      first: 250,
      after,
    });

    const edges = res.products.edges.map((e) => e.node);
    allProducts = [...allProducts, ...edges];
    hasNextPage = res.products.pageInfo.hasNextPage;
    after = res.products.pageInfo.endCursor;
  }

  const productRoutes = allProducts.map((p) => ({
    url: `${siteUrl}/products/${p.handle}`,
    lastModified: p.updatedAt ? new Date(p.updatedAt) : undefined,
  }));

  const staticRoutes = [
    "terms",
    "shipping",
    "search-for",
    "sale",
    "returns",
    "privacy",
    "new-in",
    "faqs",
    "account/login",
  ].map((path) => ({
    url: `${siteUrl}/${path}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...productRoutes];
}
