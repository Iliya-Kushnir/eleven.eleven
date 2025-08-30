/*
const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!;
const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_TOKEN!;
const endpoint = `https://${domain}/api/2024-07/graphql.json`;

// ======================
// Типы
// ======================

export interface CustomerUserError {
  field: string[];
  message: string;
}

export interface Customer {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

export interface CustomerCreateResponse {
  customerCreate: {
    customer: Customer | null;
    customerUserErrors: CustomerUserError[];
  };
}

export interface CustomerAccessToken {
  accessToken: string;
  expiresAt: string;
}

export interface CustomerAccessTokenResponse {
  customerAccessTokenCreate: {
    customerAccessToken: CustomerAccessToken | null;
    customerUserErrors: CustomerUserError[];
  };
}

export interface Product {
  id: string;
  title: string;
  handle: string;
  featuredImage?: {
    url: string;
    altText?: string;
  } | null;
}

export interface ProductEdge {
  node: Product;
}

export interface ProductsResponse {
  products: {
    edges: ProductEdge[];
  };
}

export interface Order {
  id: string;
  orderNumber: string;
  totalPriceV2: {
    amount: string;
    currencyCode: string;
  };
}

export interface CustomerWithOrders {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  orders: {
    edges: {
      node: Order;
    }[];
  };
}

// ======================
// Основной fetch
// ======================

export async function shopifyFetch<T>(
  query: string,
  variables: Record<string, unknown> = {}
): Promise<T> {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "X-Shopify-Storefront-Access-Token": token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Shopify API error: ${res.statusText}`);
  }

  const json = (await res.json()) as { data: T };
  console.log("RESPONSE:", json);
  return json.data;
}

// ======================
// Helpers
// ======================

export function getProductNumericId(gid: string) {
  return gid.split("/").pop() || gid;
}

export function toShopifyProductGid(id: string | number) {
  return `gid://shopify/Product/${id}`;
}

// ======================
// Products
// ======================

export async function searchProducts(queryText: string) {
  const query = `
    query Products($query: String!) {
      products(first: 10, query: $query) {
        edges {
          node {
            id
            title
            handle
            featuredImage {
              url
              altText
            }
          }
        }
      }
    }
  `;
  return shopifyFetch<ProductsResponse>(query, { query: queryText });
}

export async function getProductById(id: string | number) {
  const query = `
    query Product($id: ID!) {
      product(id: $id) {
        id
        title
        handle
        description
        featuredImage {
          url
          altText
        }
        images(first: 10) {
          edges {
            node {
              url
              altText
            }
          }
        }
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
  return shopifyFetch<{ product: Product }>(query, { id: toShopifyProductGid(id) });
}

// ======================
// Customers
// ======================

export async function createCustomer(
  email: string,
  password: string,
  firstName?: string,
  lastName?: string
) {
  const mutation = `
    mutation customerCreate($input: CustomerCreateInput!) {
      customerCreate(input: $input) {
        customer {
          id
          email
          firstName
          lastName
        }
        customerUserErrors {
          field
          message
        }
      }
    }
  `;
  return shopifyFetch<CustomerCreateResponse>(mutation, { input: { email, password, firstName, lastName } });
}

export async function loginCustomer(email: string, password: string) {
  const mutation = `
    mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
      customerAccessTokenCreate(input: $input) {
        customerAccessToken {
          accessToken
          expiresAt
        }
        customerUserErrors {
          field
          message
        }
      }
    }
  `;
  return shopifyFetch<CustomerAccessTokenResponse>(mutation, { input: { email, password } });
}

export async function getCustomer(accessToken: string) {
  const query = `
    query customer($customerAccessToken: String!) {
      customer(customerAccessToken: $customerAccessToken) {
        id
        email
        firstName
        lastName
        orders(first: 5) {
          edges {
            node {
              id
              orderNumber
              totalPriceV2 {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  `;
  return shopifyFetch<{ customer: CustomerWithOrders }>(query, { customerAccessToken: accessToken });
}
*/
const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!;
const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_TOKEN!;
const endpoint = `https://${domain}/api/2024-07/graphql.json`;

// ======================
// Типы
// ======================

export interface CustomerUserError {
  field: string[];
  message: string;
}

export interface Customer {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

export interface CustomerCreateResponse {
  customerCreate: {
    customer: Customer | null;
    customerUserErrors: CustomerUserError[];
  };
}

export interface CustomerAccessToken {
  accessToken: string;
  expiresAt: string;
}

export interface CustomerAccessTokenResponse {
  customerAccessTokenCreate: {
    customerAccessToken: CustomerAccessToken | null;
    customerUserErrors: CustomerUserError[];
  };
}

// ======================
// Products
// ======================

export interface Product {
  id: string;
  title: string;
  handle: string;
  featuredImage?: {
    url: string;
    altText?: string;
  } | null;
}

export interface ProductVariant {
  id: string;
  priceV2: {
    amount: string;
    currencyCode: string;
  };
}

export interface ProductFull {
  id: string;
  title: string;
  handle: string;
  description: string;
  featuredImage?: { url: string; altText?: string | null } | null;
  images?: {
    edges: { node: { url: string; altText?: string | null } }[];
  };
  variants?: {
    edges: { node: ProductVariant }[];
  };
}

export interface ProductEdge {
  node: Product;
}

export interface ProductsResponse {
  products: {
    edges: ProductEdge[];
  };
}

export interface Order {
  id: string;
  orderNumber: string;
  totalPriceV2: {
    amount: string;
    currencyCode: string;
  };
}

export interface CustomerWithOrders {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  orders: {
    edges: {
      node: Order;
    }[];
  };
}

// ======================
// Основной fetch
// ======================

export async function shopifyFetch<T>(
  query: string,
  variables: Record<string, unknown> = {}
): Promise<T> {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "X-Shopify-Storefront-Access-Token": token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Shopify API error: ${res.statusText}`);
  }

  const json = (await res.json()) as { data: T };
  console.log("RESPONSE:", json);
  return json.data;
}

// ======================
// Helpers
// ======================

export function getProductNumericId(gid: string) {
  return gid.split("/").pop() || gid;
}

export function toShopifyProductGid(id: string | number) {
  return `gid://shopify/Product/${id}`;
}

// ======================
// Products
// ======================

export async function searchProducts(queryText: string) {
  const query = `
    query Products($query: String!) {
      products(first: 10, query: $query) {
        edges {
          node {
            id
            title
            handle
            featuredImage {
              url
              altText
            }
          }
        }
      }
    }
  `;
  return shopifyFetch<ProductsResponse>(query, { query: queryText });
}

export async function getProductById(id: string | number) {
  const query = `
    query Product($id: ID!) {
      product(id: $id) {
        id
        title
        handle
        description
        featuredImage {
          url
          altText
        }
        images(first: 10) {
          edges {
            node {
              url
              altText
            }
          }
        }
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
  return shopifyFetch<{ product: ProductFull }>(query, { id: toShopifyProductGid(id) });
}

// ======================
// Customers
// ======================

export async function createCustomer(
  email: string,
  password: string,
  firstName?: string,
  lastName?: string
) {
  const mutation = `
    mutation customerCreate($input: CustomerCreateInput!) {
      customerCreate(input: $input) {
        customer {
          id
          email
          firstName
          lastName
        }
        customerUserErrors {
          field
          message
        }
      }
    }
  `;
  return shopifyFetch<CustomerCreateResponse>(mutation, { input: { email, password, firstName, lastName } });
}

export async function loginCustomer(email: string, password: string) {
  const mutation = `
    mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
      customerAccessTokenCreate(input: $input) {
        customerAccessToken {
          accessToken
          expiresAt
        }
        customerUserErrors {
          field
          message
        }
      }
    }
  `;
  return shopifyFetch<CustomerAccessTokenResponse>(mutation, { input: { email, password } });
}

export async function getCustomer(accessToken: string) {
  const query = `
    query customer($customerAccessToken: String!) {
      customer(customerAccessToken: $customerAccessToken) {
        id
        email
        firstName
        lastName
        orders(first: 5) {
          edges {
            node {
              id
              orderNumber
              totalPriceV2 {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  `;
  return shopifyFetch<{ customer: CustomerWithOrders }>(query, { customerAccessToken: accessToken });
}