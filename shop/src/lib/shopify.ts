/*const domain = process.env.SHOPIFY_STORE_DOMAIN!;
const token = process.env.SHOPIFY_STOREFRONT_API_TOKEN!;
const endpoint = `https://${domain}/api/2024-07/graphql.json`; // актуальная версия API

export async function shopifyFetch<T>(query: string, variables: Record<string, any> = {}): Promise<T> {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "X-Shopify-Storefront-Access-Token": token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 }, // для ISR, можно убрать
  });

  if (!res.ok) {
    throw new Error(`Shopify API error: ${res.statusText}`);
  }

  const json = await res.json();
  return json.data;
}*/

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!;
const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_TOKEN!;
const endpoint = `https://${domain}/api/2024-07/graphql.json`; // актуальная версия API

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
    next: { revalidate: 60 }, // для ISR
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

// Вытаскиваем числовой ID из gid://

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
export function getProductNumericId(gid: string) {
  return gid.split("/").pop() || gid;
}

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

  return shopifyFetch<{ products: { edges: { node: any }[] } }>(query, {
    query: queryText,
  });
}

// Формируем gid обратно для запросов
export function toShopifyProductGid(id: string | number) {
  return `gid://shopify/Product/${id}`;
}

// Получить продукт по числовому ID
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

  const variables = { id: toShopifyProductGid(id) };

  return shopifyFetch<{ product: object }>(query, variables);
}


// Создание нового пользователя
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




// Логин
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


// Получить данные по токену
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

  const variables = { customerAccessToken: accessToken };

  return shopifyFetch<{ customer: any }>(query, variables);
}
