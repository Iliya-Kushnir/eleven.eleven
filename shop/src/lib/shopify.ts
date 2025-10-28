const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!;
const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_TOKEN!;
const endpoint = `https://${domain}/api/2024-07/graphql.json`;

// ======================
// Типы
// ======================

export interface CustomerAddress {
  id: string;
  firstName?: string;
  lastName?: string;
  address1: string;
  address2?: string;
  city: string;
  province?: string;
  country: string;
  zip: string;
  phone?: string;
}

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

export interface CustomerAddressCreateResponse {
  customerAddressCreate: {
    customerAddress: CustomerAddress | null;
    customerUserErrors: CustomerUserError[];
  };
}

export interface CustomerCreateResponse {
  customerCreate: {
    customer: Customer | null;
    customerUserErrors: CustomerUserError[];
  };
}

export interface CustomerAddressUpdateResponse {
  customerAddressUpdate: {
    customerAddress: CustomerAddress | null;
    customerUserErrors: CustomerUserError[];
  };
}

export interface CustomerAddress {
  id: string;
  firstName?: string;
  lastName?: string;
  address1: string;
  address2?: string;
  city: string;
  province?: string;
  country: string;
  zip: string;
  phone?: string;
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
// Cart Types
// ======================

export interface CartLine {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title?: string;
  };
  attributes: { key: string; value: string }[];
}

export interface Cart {
  id: string;
  checkoutUrl: string;
  lines: {
    edges: {
      node: CartLine;
    }[];
  };
}

export interface CartResponse {
  cart: Cart;
}

export interface CartCreateResponse {
  cartCreate: {
    cart: Cart;
  };
}

export interface CartLinesAddResponse {
  cartLinesAdd: {
    cart: Cart;
  };
}

export interface CartLinesUpdateResponse {
  cartLinesUpdate: {
    cart: Cart;
  };
}

export interface CartLinesRemoveResponse {
  cartLinesRemove: {
    cart: Cart;
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
    altText?: string | null;
  } | null;
}

export interface ProductVariant {
  id: string;
  priceV2: {
    amount: string;
    currencyCode: string;
  };
  selectedOptions: { name: string; value: string }[];
}

export interface ColorGallery {
  [color: string]: { url: string; altText?: string | null }[];
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
  colorGallery?: {
    type: string;
    value: string; // JSON-строка с галереей
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
    descriptionHtml
    featuredImage {
      url
      altText
    }
    images(first: 10) {
      edges { node { url altText } }
    }
    variants(first: 50) {
      edges { node { id priceV2 { amount currencyCode } selectedOptions { name value } } }
    }
    metafield(namespace: "custom", key: "color_gallery") {
      type
      value
    }
  }
}
  `;
  return shopifyFetch<{ product: ProductFull }>(query, { id: toShopifyProductGid(id) });
}


interface ProductNode {
  id: string;
  title: string;
  productType: string;
}

interface ShopifyProductEdge {
  node: ProductNode;
}

interface ProductsByIdResponse {
  products: {
    edges: ShopifyProductEdge[];
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string | null;
    };
  };
}

export async function getProductsGroupedByType() {
  const query = `
    query Products($first: Int!, $after: String) {
      products(first: $first, after: $after) {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            id
            title
            productType
          }
        }
      }
    }
  `;

  let allProducts: ProductNode[] = [];
  let hasNextPage = true;
  let after: string | null = null;

  while (hasNextPage) {
    const response: ProductsByIdResponse = await shopifyFetch<ProductsByIdResponse>(
      query,
      { first: 250, after }
    );

    const products = response.products.edges.map((edge: ShopifyProductEdge) => edge.node);
    allProducts = allProducts.concat(products);
    hasNextPage = response.products.pageInfo.hasNextPage;
    after = response.products.pageInfo.endCursor;
  }

  // Группируем по типу товара
  const grouped: Record<string, { id: string; title: string }[]> = {};
  allProducts.forEach((product) => {
    const type = product.productType || "Unknown";
    if (!grouped[type]) grouped[type] = [];
    grouped[type].push({ id: product.id, title: product.title });
  });

  return grouped;
}


// ======================
// Customers
// ======================

export async function createCustomer(
  email: string,
  password: string,
  firstName?: string,
  lastName?: string,
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

  return shopifyFetch<CustomerCreateResponse>(mutation, {
    input: {
      email,
      password,
      firstName,
      lastName
    },
  });
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

export async function addCustomerAddress(
  accessToken: string,
  address: Omit<CustomerAddress, "id">
) {
  const mutation = `
    mutation customerAddressCreate($customerAccessToken: String!, $address: MailingAddressInput!) {
      customerAddressCreate(customerAccessToken: $customerAccessToken, address: $address) {
        customerAddress {
          id
          firstName
          lastName
          address1
          address2
          city
          province
          country
          zip
          phone
        }
        customerUserErrors {
          field
          message
        }
      }
    }
  `;

  return shopifyFetch<CustomerAddressCreateResponse>(mutation, {
    customerAccessToken: accessToken,
    address,
  });
}

export async function getCustomerAddresses(accessToken: string) {
  const query = `
    query customer($customerAccessToken: String!) {
      customer(customerAccessToken: $customerAccessToken) {
        addresses(first: 10) {
          edges {
            node {
              id
              firstName
              lastName
              address1
              address2
              city
              province
              country
              zip
              phone
            }
          }
        }
      }
    }
  `;
  return shopifyFetch<{ customer: { addresses: { edges: { node: CustomerAddress }[] } } }>(query, { customerAccessToken: accessToken });
}

export async function deleteCustomerAddress(accessToken: string, addressId: string) {
  const mutation = `
    mutation customerAddressDelete($customerAccessToken: String!, $id: ID!) {
      customerAddressDelete(customerAccessToken: $customerAccessToken, id: $id) {
        deletedCustomerAddressId
        customerUserErrors {
          field
          message
        }
      }
    }
  `;
  return shopifyFetch<{ customerAddressDelete: { deletedCustomerAddressId: string | null, customerUserErrors: CustomerUserError[] } }>(
    mutation,
    { customerAccessToken: accessToken, id: addressId }
  );
}

export async function updateCustomerAddress(
  accessToken: string,
  addressId: string,
  address: Omit<CustomerAddress, "id">
) {
  const mutation = `
    mutation customerAddressUpdate($customerAccessToken: String!, $id: ID!, $address: MailingAddressInput!) {
      customerAddressUpdate(customerAccessToken: $customerAccessToken, id: $id, address: $address) {
        customerAddress {
          id
          firstName
          lastName
          address1
          address2
          city
          province
          country
          zip
          phone
        }
        customerUserErrors {
          field
          message
        }
      }
    }
  `;

  return shopifyFetch<{ 
    customerAddressUpdate: { 
      customerAddress: CustomerAddress | null, 
      customerUserErrors: CustomerUserError[] 
    } 
  }>(mutation, {
    customerAccessToken: accessToken,
    id: addressId,
    address,
  });
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

export interface CustomerRecoverResponse {
  customerRecover: {
    customerUserErrors: CustomerUserError[];
  };
}

export async function recoverCustomerPassword(email: string) {
  const query = `
    mutation customerRecover($email: String!, $redirectUrl: URL) {
      customerRecover(email: $email, redirectUrl: $redirectUrl) {
        customerUserErrors {
          code
          field
          message
        }
      }
    }
  `;

  const res = await fetch(`https://${domain}/api/2024-07/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },
    body: JSON.stringify({
      query,
      variables: { email  },
    }),
  });
  if (res.ok) {
    const text = await res.text();
    throw new Error(`Shopify API error: ${res.status} ${text}`);
  }

  return res.json();
}


type CustomerResetByUrlResponse = {
  customerResetByUrl: {
    customerUserErrors: {
      field: string[] | null;
      message: string;
      code: string | null;
    }[];
    customer: {
      id: string;
    } | null;
  };
};

export async function customerResetByUrl(resetUrl: string, password: string) {
  const mutation = `
    mutation customerResetByUrl($resetUrl: URL!, $password: String!) {
      customerResetByUrl(resetUrl: $resetUrl, password: $password) {
        customerUserErrors {
          field
          message
          code
        }
        customer {
          id
        }
      }
    }
  `;
  return shopifyFetch<CustomerResetByUrlResponse>(mutation, { resetUrl, password });
}


// ======================
// Cart API
// ======================

// Деньги
export interface MoneyV2 {
  amount: string;
  currencyCode: string;
}

export interface Image {
  url: string;
  altText?: string | null;
}

export interface Merchandise {
  id: string;
  title?: string;
  priceV2?: MoneyV2;
  image?: Image;
}

// 🔹 Даем уникальное имя
export interface CartLineFull {
  id: string;
  quantity: number;
  merchandise: Merchandise;
  attributes: { key: string; value: string }[];
}

export interface CartFull {
  id: string;
  checkoutUrl: string;
  linesFull: { edges: { node: CartLineFull }[] }; // <- переименовал lines в linesFull
}



// 🛒 Создать корзину
export async function createCart() {
  const mutation = `
    mutation {
      cartCreate {
        cart {
          id
          checkoutUrl
          lines(first: 10) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    priceV2 {
                      amount
                      currencyCode
                    }
                    image {
                      url
                      altText
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;
  return shopifyFetch<{ cartCreate: { cart: Cart } }>(mutation);
}

// 🛒 Добавить товар
export async function addToCart(cartId: string, merchandiseId: string, quantity: number, merchandise: object={}, attributes: {key: string, value: string}[], title: string [] = []) {
  const mutation = `
    mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          id
          checkoutUrl
          lines(first: 10) {
            edges {
              node {
                id
                quantity
                attributes {
                  key
                  value
                }
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                  product {
                  title
                }
                    priceV2 {
                      amount
                      currencyCode
                    }
                    image {
                      url
                      altText
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;
  const data = await shopifyFetch<{ cartLinesAdd: { cart: Cart } }>(mutation, {
    cartId,
    lines: [{ merchandiseId, quantity, attributes}],
  });

  return data.cartLinesAdd; // <--- возвращаем сразу cartLinesAdd
}


// 🛒 Обновить количество
export async function updateCartLine(cartId: string, lineId: string, quantity: number, attributes: {key: string, value: string}[]) {
  const mutation = `
    mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart {
          id
          checkoutUrl
          lines(first: 10) {
            edges {
              node {
                id
                quantity
                attributes {
                  key
                  value
                }
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    priceV2 {
                      amount
                      currencyCode
                    }
                    image {
                      url
                      altText
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;
  return shopifyFetch<{ cartLinesUpdate: { cart: Cart } }>(mutation, {
    cartId,
    lines: [{ id: lineId, quantity, attributes }],

  });
}

// 🛒 Удалить товар
export async function removeFromCart(cartId: string, lineIds: string[]) {
  const mutation = `
    mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          id
          checkoutUrl
          lines(first: 10) {
            edges {
              node {
                id
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    priceV2 {
                      amount
                      currencyCode
                    }
                    image {
                      url
                      altText
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;
  return shopifyFetch<{ cartLinesRemove: { cart: Cart } }>(mutation, { cartId, lineIds });
}

// 🛒 Получить корзину
export async function getCart(cartId: string) {
  const query = `
    query cart($id: ID!) {
      cart(id: $id) {
        id
        checkoutUrl
        lines(first: 10) {
          edges {
            node {
              id
              quantity
              attributes {
                key
                value
              }
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  priceV2 {
                    amount
                    currencyCode
                  }
                  image {
                    url
                    altText
                  }
                }
              }
            }
          }
        }
      }
    }
  `;
  return shopifyFetch<{ cart: Cart }>(query, { id: cartId });
}