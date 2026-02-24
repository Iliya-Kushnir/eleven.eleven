/*
const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!;
const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_TOKEN!;
const endpoint = `https://${domain}/api/2024-07/graphql.json`;



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
  sizeChart?: { reference?: { image?: { url: string; altText: string | null } } };
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



export async function shopifyFetch<T>(
  query: string,
  variables: Record<string, unknown> = {},
  lang: string = "UK"
): Promise<T> {
  const shopifyLang = lang.toUpperCase() === 'EN' ? 'EN' : 'UK';
  
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "X-Shopify-Storefront-Access-Token": token,
      "Content-Type": "application/json",
      "Accept-Language": shopifyLang,
    },
    // ВАЖНО: Добавляем language в переменные, если запрос использует @inContext
    body: JSON.stringify({ 
      query, 
      variables: { ...variables, language: shopifyLang } 
    }),
    next: { revalidate: 0 }, // Для корзины лучше отключить кэш
  });

  if (!res.ok) throw new Error(`Shopify API error: ${res.statusText}`);
  const json = (await res.json()) as { data: T };
  return json.data;
}


export function getProductNumericId(gid: string) {
  return gid.split("/").pop() || gid;
}

export function toShopifyProductGid(id: string | number) {
  return `gid://shopify/Product/${id}`;
}

export async function searchProducts(queryText: string, lang: string = "EN") {
  const query = `
    query Products($query: String!, $language: LanguageCode) @inContext(language: $language) {
      products(first: 10, query: $query) {
        edges {
          node {
            id
            title
            handle
            featuredImage { url altText }
          }
        }
      }
    }
  `;
  const language = lang.toLowerCase() === 'en' ? 'EN' : 'UK';
  return shopifyFetch<ProductsResponse>(query, { query: queryText, language }, language);
}

// Получение одного товара
export async function getProductById(id: string | number, lang: string = "EN") {
  const query = `
    query Product($id: ID!, $language: LanguageCode) @inContext(language: $language) {
      product(id: $id) {
        id
        title
        handle
        description
        descriptionHtml
        sizeChart: metafield(namespace: "custom", key: "size_chart") {
          reference { ... on MediaImage { image { url altText } } }
        }
        featuredImage { url altText }
        images(first: 10) { edges { node { url altText } } }
        variants(first: 50) {
          edges { node { id priceV2 { amount currencyCode } selectedOptions { name value } } }
        }
        metafield: metafield(namespace: "custom", key: "color_gallery") {
          type
          value
        }
      }
    }
  `;
  // Передаем lang и в переменные GraphQL, и в функцию shopifyFetch
  return shopifyFetch<{ product: ProductFull }>(
    query, 
    { id: toShopifyProductGid(id), language: lang.toUpperCase() }, 
    lang
  );
}




interface ProductNode {
  id: string;
  title: string;
  productType: string;
  featuredImage?: {
    url: string;
    altText?: string | null;
  } | null;
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
            featuredImage {   
              url
              altText
            }
          }
        }
      }
    }
  `;

  let allProducts: ProductNode[] = [];
  let hasNextPage = true;
  let after: string | null = null;

  // Цикл для получения абсолютно всех товаров из магазина (пагинация)
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

  // Группировка товаров по типам
  const grouped: Record<string, ProductNode[]> = {};
  
  allProducts.forEach((product) => {
    // Если тип не указан в Shopify, помечаем как "Unknown"
    const type = product.productType || "Unknown";
    
    if (!grouped[type]) {
      grouped[type] = [];
    }
    
    // ПЕРЕДАЕМ ВЕСЬ ОБЪЕКТ: теперь здесь будут id, title и featuredImage
    grouped[type].push(product);
  });

  return grouped;
}




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
        orders(first: 10, sortKey: PROCESSED_AT, reverse: true) {
          edges {
            node {
              id
              orderNumber
              processedAt
              financialStatus    # Статус оплаты (PAID, PENDING)
              fulfillmentStatus  # Статус доставки (FULFILLED, UNFULFILLED)
              totalPriceV2 {
                amount
                currencyCode
              }
              lineItems(first: 5) { # Что именно заказал
                edges {
                  node {
                    title
                    quantity
                    variant { image { url } }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;
  return shopifyFetch<{ customer: any }>(query, { customerAccessToken: accessToken });
}

export interface CustomerRecoverResponse {
  customerRecover: {
    customerUserErrors: CustomerUserError[];
  };
}

export async function recoverCustomerPassword(email: string) {
  const query = `
    mutation customerRecover($email: String!) {
      customerRecover(email: $email) {
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
      variables: { email },
    }),
  });

  if (!res.ok) {
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




export async function createCart(lang: string = "UK") {
  const mutation = `
    mutation cartCreate($language: LanguageCode) @inContext(language: $language) {
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
                    id title priceV2 { amount currencyCode } image { url altText }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;
  // Передаем пустые переменные {}, и lang третьим аргументом
  return shopifyFetch<{ cartCreate: { cart: Cart } }>(mutation, {}, lang);
}


export async function addToCart(
  cartId: string, 
  merchandiseId: string, 
  quantity: number, 
  attributes: { key: string; value: string }[] = [],
  lang: string = "UK"
) {
  const mutation = `
    mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!, $language: LanguageCode) @inContext(language: $language) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart { id checkoutUrl lines(first: 20) { edges { node { 
          id quantity attributes { key value }
          merchandise { ... on ProductVariant { id title priceV2 { amount currencyCode } image { url altText } } }
        } } } }
      }
    }
  `;
  // ВАЖНО: lang идет ПОСЛЕ объекта переменных
  return shopifyFetch<{ cartLinesAdd: { cart: Cart } }>(
    mutation, 
    { cartId, lines: [{ merchandiseId, quantity, attributes }] }, 
    lang 
  );
}



export async function updateCartLine(
  cartId: string, 
  lineId: string, 
  quantity: number, 
  attributes: { key: string; value: string }[] = [],
  lang: string = "UK"
) {
  const mutation = `
    mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!, $language: LanguageCode) @inContext(language: $language) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart { id checkoutUrl lines(first: 20) { edges { node { 
          id quantity attributes { key value }
          merchandise { ... on ProductVariant { id title priceV2 { amount currencyCode } image { url altText } } }
        } } } }
      }
    }
  `;
  return shopifyFetch<{ cartLinesUpdate: { cart: Cart } }>(
    mutation, 
    { cartId, lines: [{ id: lineId, quantity, attributes }] }, 
    lang // Вынесли из объекта переменных
  );
}


export async function removeFromCart(cartId: string, lineIds: string[], lang: string = "UK") {
  const mutation = `
    mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!, $language: LanguageCode) @inContext(language: $language) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart { id checkoutUrl lines(first: 10) { edges { node { id quantity } } } }
      }
    }
  `;
  return shopifyFetch<{ cartLinesRemove: { cart: Cart } }>(mutation, { cartId, lineIds }, lang);
}


export async function getCart(cartId: string, lang: string = "UK") {
  const query = `
    query cart($id: ID!, $language: LanguageCode) @inContext(language: $language) {
      cart(id: $id) {
        id
        checkoutUrl
        lines(first: 20) {
          edges {
            node {
              id
              quantity
              attributes { key value }
              merchandise {
                ... on ProductVariant {
                  id
                  title # Вернется на языке из $language
                  priceV2 { amount currencyCode }
                  image { url altText }
                }
              }
            }
          }
        }
      }
    }
  `;
  return shopifyFetch<{ cart: Cart }>(query, { id: cartId }, lang);
}
const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!;
const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_TOKEN!;
const endpoint = `https://${domain}/api/2024-07/graphql.json`;

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

export interface CartLine {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title?: string;
    priceV2?: { amount: string; currencyCode: string };
    image?: { url: string; altText?: string | null };
    product: {
      title: string;
      featuredImage?: { url: string; altText?: string | null } | null;
    };
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

export interface ProductFull {
  id: string;
  title: string;
  handle: string;
  description: string;
  sizeChart?: { reference?: { image?: { url: string; altText: string | null } } };
  featuredImage?: { url: string; altText?: string | null } | null;
  images?: {
    edges: { node: { url: string; altText?: string | null } }[];
  };
  variants?: {
    edges: { node: ProductVariant }[];
  };
  colorGallery?: {
    type: string;
    value: string; 
  };
}

export interface ProductsResponse {
  products: {
    edges: { node: Product }[];
  };
}

const CART_FRAGMENT = `
  id
  checkoutUrl
  lines(first: 20) {
    edges {
      node {
        id
        quantity
        attributes { key value }
        merchandise {
          ... on ProductVariant {
            id
            title
            priceV2 { amount currencyCode }
            image { url altText }
            product {
              title
              featuredImage { url altText }
            }
          }
        }
      }
    }
  }
`;

export async function shopifyFetch<T>(
  query: string,
  variables: Record<string, unknown> = {},
  lang: string = "UK"
): Promise<T> {
  const shopifyLang = lang.toUpperCase() === 'EN' ? 'EN' : 'UK';
  
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "X-Shopify-Storefront-Access-Token": token,
      "Content-Type": "application/json",
      "Accept-Language": shopifyLang,
    },
    body: JSON.stringify({ 
      query, 
      variables: { ...variables, language: shopifyLang } 
    }),
    next: { revalidate: 0 },
  });

  if (!res.ok) throw new Error(`Shopify API error: ${res.statusText}`);
  const json = (await res.json()) as { data: T };
  return json.data;
}

export function getProductNumericId(gid: string) {
  return gid.split("/").pop() || gid;
}

export function toShopifyProductGid(id: string | number) {
  return `gid://shopify/Product/${id}`;
}

export async function searchProducts(queryText: string, lang: string = "EN") {
  const query = `
    query Products($query: String!, $language: LanguageCode) @inContext(language: $language) {
      products(first: 10, query: $query) {
        edges {
          node {
            id
            title
            handle
            featuredImage { url altText }
          }
        }
      }
    }
  `;
  const language = lang.toLowerCase() === 'en' ? 'EN' : 'UK';
  return shopifyFetch<ProductsResponse>(query, { query: queryText, language }, language);
}

export async function getProductById(id: string | number, lang: string = "EN") {
  const query = `
    query Product($id: ID!, $language: LanguageCode) @inContext(language: $language) {
      product(id: $id) {
        id
        title
        handle
        description
        descriptionHtml
        sizeChart: metafield(namespace: "custom", key: "size_chart") {
          reference { ... on MediaImage { image { url altText } } }
        }
        featuredImage { url altText }
        images(first: 10) { edges { node { url altText } } }
        variants(first: 50) {
          edges { node { id priceV2 { amount currencyCode } selectedOptions { name value } } }
        }
        metafield: metafield(namespace: "custom", key: "color_gallery") {
          type
          value
        }
      }
    }
  `;
  return shopifyFetch<{ product: ProductFull }>(
    query, 
    { id: toShopifyProductGid(id), language: lang.toUpperCase() }, 
    lang
  );
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
            featuredImage {   
              url
              altText
            }
          }
        }
      }
    }
  `;

  let allProducts: any[] = [];
  let hasNextPage = true;
  let after: string | null = null;

  while (hasNextPage) {
    const response: any = await shopifyFetch<any>(query, { first: 250, after });
    const products = response.products.edges.map((edge: any) => edge.node);
    allProducts = allProducts.concat(products);
    hasNextPage = response.products.pageInfo.hasNextPage;
    after = response.products.pageInfo.endCursor;
  }

  const grouped: Record<string, any[]> = {};
  allProducts.forEach((product) => {
    const type = product.productType || "Unknown";
    if (!grouped[type]) grouped[type] = [];
    grouped[type].push(product);
  });
  return grouped;
}

export async function createCustomer(email: string, password: string, firstName?: string, lastName?: string) {
  const mutation = `
    mutation customerCreate($input: CustomerCreateInput!) {
      customerCreate(input: $input) {
        customer { id email firstName lastName }
        customerUserErrors { field message }
      }
    }
  `;
  return shopifyFetch<CustomerCreateResponse>(mutation, { input: { email, password, firstName, lastName } });
}

export async function loginCustomer(email: string, password: string) {
  const mutation = `
    mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
      customerAccessTokenCreate(input: $input) {
        customerAccessToken { accessToken expiresAt }
        customerUserErrors { field message }
      }
    }
  `;
  return shopifyFetch<CustomerAccessTokenResponse>(mutation, { input: { email, password } });
}

export async function addCustomerAddress(accessToken: string, address: Omit<CustomerAddress, "id">) {
  const mutation = `
    mutation customerAddressCreate($customerAccessToken: String!, $address: MailingAddressInput!) {
      customerAddressCreate(customerAccessToken: $customerAccessToken, address: $address) {
        customerAddress { id firstName lastName address1 address2 city province country zip phone }
        customerUserErrors { field message }
      }
    }
  `;
  return shopifyFetch<CustomerAddressCreateResponse>(mutation, { customerAccessToken: accessToken, address });
}

export async function getCustomerAddresses(accessToken: string) {
  const query = `
    query customer($customerAccessToken: String!) {
      customer(customerAccessToken: $customerAccessToken) {
        addresses(first: 10) {
          edges {
            node { id firstName lastName address1 address2 city province country zip phone }
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
        customerUserErrors { field message }
      }
    }
  `;
  return shopifyFetch<any>(mutation, { customerAccessToken: accessToken, id: addressId });
}

export async function updateCustomerAddress(accessToken: string, addressId: string, address: Omit<CustomerAddress, "id">) {
  const mutation = `
    mutation customerAddressUpdate($customerAccessToken: String!, $id: ID!, $address: MailingAddressInput!) {
      customerAddressUpdate(customerAccessToken: $customerAccessToken, id: $id, address: $address) {
        customerAddress { id firstName lastName address1 address2 city province country zip phone }
        customerUserErrors { field message }
      }
    }
  `;
  return shopifyFetch<any>(mutation, { customerAccessToken: accessToken, id: addressId, address });
}

export async function getCustomer(accessToken: string) {
  const query = `
    query customer($customerAccessToken: String!) {
      customer(customerAccessToken: $customerAccessToken) {
        id email firstName lastName
        orders(first: 10, sortKey: PROCESSED_AT, reverse: true) {
          edges {
            node {
              id orderNumber processedAt financialStatus fulfillmentStatus
              totalPriceV2 { amount currencyCode }
              lineItems(first: 5) {
                edges { node { title quantity variant { image { url } } } }
              }
            }
          }
        }
      }
    }
  `;
  return shopifyFetch<{ customer: any }>(query, { customerAccessToken: accessToken });
}

export async function recoverCustomerPassword(email: string) {
  const query = `
    mutation customerRecover($email: String!) {
      customerRecover(email: $email) {
        customerUserErrors { code field message }
      }
    }
  `;
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Shopify-Storefront-Access-Token": token },
    body: JSON.stringify({ query, variables: { email } }),
  });
  return res.json();
}

export async function customerResetByUrl(resetUrl: string, password: string) {
  const mutation = `
    mutation customerResetByUrl($resetUrl: URL!, $password: String!) {
      customerResetByUrl(resetUrl: $resetUrl, password: $password) {
        customerUserErrors { field message code }
        customer { id }
      }
    }
  `;
  return shopifyFetch<any>(mutation, { resetUrl, password });
}

// --- Cart Core Functions ---

export async function createCart(lang: string = "UK") {
  const mutation = `
    mutation cartCreate($language: LanguageCode) @inContext(language: $language) {
      cartCreate {
        cart { ${CART_FRAGMENT} }
      }
    }
  `;
  return shopifyFetch<any>(mutation, { language: lang.toUpperCase() }, lang);
}

export async function getCart(cartId: string, lang: string = "UK") {
  const query = `
    query cart($id: ID!, $language: LanguageCode) @inContext(language: $language) {
      cart(id: $id) { ${CART_FRAGMENT} }
    }
  `;
  return shopifyFetch<any>(query, { id: cartId, language: lang.toUpperCase() }, lang);
}

export async function addToCart(cartId: string, merchandiseId: string, quantity: number, attributes: any[] = [], lang: string = "UK") {
  const mutation = `
    mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!, $language: LanguageCode) @inContext(language: $language) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart { ${CART_FRAGMENT} }
      }
    }
  `;
  return shopifyFetch<any>(mutation, { cartId, lines: [{ merchandiseId, quantity, attributes }], language: lang.toUpperCase() }, lang);
}

export async function updateCartLine(cartId: string, lineId: string, quantity: number, attributes: any[] = [], lang: string = "UK") {
  const mutation = `
    mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!, $language: LanguageCode) @inContext(language: $language) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart { ${CART_FRAGMENT} }
      }
    }
  `;
  return shopifyFetch<any>(mutation, { cartId, lines: [{ id: lineId, quantity, attributes }], language: lang.toUpperCase() }, lang);
}

export async function removeFromCart(cartId: string, lineIds: string[], lang: string = "UK") {
  const mutation = `
    mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!, $language: LanguageCode) @inContext(language: $language) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart { ${CART_FRAGMENT} }
      }
    }
  `;
  return shopifyFetch<any>(mutation, { cartId, lineIds, language: lang.toUpperCase() }, lang);
}
*/
const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!;
const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_TOKEN!;
const endpoint = `https://${domain}/api/2024-07/graphql.json`;

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

// Ключевой фрагмент для корзины: тянем данные и варианта, и основного товара
const CART_LINE_FRAGMENT = `
  id
  quantity
  attributes { key value }
  merchandise {
    ... on ProductVariant {
      id
      title
      priceV2 { amount currencyCode }
      image { url altText }
      product {
        title
        handle
        featuredImage { url altText }
      }
    }
  }
`;

const CART_FRAGMENT = `
  id
  checkoutUrl
  lines(first: 20) {
    edges {
      node {
        ${CART_LINE_FRAGMENT}
      }
    }
  }
`;

export async function shopifyFetch<T>(
  query: string,
  variables: Record<string, unknown> = {},
  lang: string = "UK"
): Promise<T> {
  const shopifyLang = lang.toUpperCase() === 'EN' ? 'EN' : 'UK';
  
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "X-Shopify-Storefront-Access-Token": token,
      "Content-Type": "application/json",
      "Accept-Language": shopifyLang,
    },
    body: JSON.stringify({ 
      query, 
      variables: { ...variables, language: shopifyLang } 
    }),
    next: { revalidate: 0 },
  });

  if (!res.ok) throw new Error(`Shopify API error: ${res.statusText}`);
  const json = (await res.json()) as { data: T; errors?: any };
  if (json.errors) console.error("Shopify GraphQL Errors:", json.errors);
  return json.data;
}

// --- Функции Товаров ---

export function getProductNumericId(gid: string) {
  return gid.split("/").pop() || gid;
}

export function toShopifyProductGid(id: string | number) {
  return `gid://shopify/Product/${id}`;
}

export async function searchProducts(queryText: string, lang: string = "EN") {
  const query = `
    query Products($query: String!, $language: LanguageCode) @inContext(language: $language) {
      products(first: 10, query: $query) {
        edges {
          node {
            id
            title
            handle
            featuredImage { url altText }
          }
        }
      }
    }
  `;
  const language = lang.toLowerCase() === 'en' ? 'EN' : 'UK';
  return shopifyFetch<any>(query, { query: queryText, language }, language);
}

export async function getProductById(id: string | number, lang: string = "EN") {
  const query = `
    query Product($id: ID!, $language: LanguageCode) @inContext(language: $language) {
      product(id: $id) {
        id
        title
        handle
        description
        descriptionHtml
        sizeChart: metafield(namespace: "custom", key: "size_chart") {
          reference { ... on MediaImage { image { url altText } } }
        }
        featuredImage { url altText }
        images(first: 10) { edges { node { url altText } } }
        variants(first: 50) {
          edges { node { id priceV2 { amount currencyCode } selectedOptions { name value } } }
        }
        metafield: metafield(namespace: "custom", key: "color_gallery") {
          type
          value
        }
      }
    }
  `;
  return shopifyFetch<any>(
    query, 
    { id: toShopifyProductGid(id), language: lang.toUpperCase() }, 
    lang
  );
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
            featuredImage { url altText }
          }
        }
      }
    }
  `;

  let allProducts: any[] = [];
  let hasNextPage = true;
  let after: string | null = null;

  while (hasNextPage) {
    const response: any = await shopifyFetch<any>(query, { first: 250, after });
    const products = response.products.edges.map((edge: any) => edge.node);
    allProducts = allProducts.concat(products);
    hasNextPage = response.products.pageInfo.hasNextPage;
    after = response.products.pageInfo.endCursor;
  }

  const grouped: Record<string, any[]> = {};
  allProducts.forEach((product) => {
    const type = product.productType || "Unknown";
    if (!grouped[type]) grouped[type] = [];
    grouped[type].push(product);
  });
  return grouped;
}

// --- Функции Клиента и Адресов ---

export async function createCustomer(email: string, password: string, firstName?: string, lastName?: string) {
  const mutation = `
    mutation customerCreate($input: CustomerCreateInput!) {
      customerCreate(input: $input) {
        customer { id email firstName lastName }
        customerUserErrors { field message }
      }
    }
  `;
  return shopifyFetch<any>(mutation, { input: { email, password, firstName, lastName } });
}

export async function loginCustomer(email: string, password: string) {
  const mutation = `
    mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
      customerAccessTokenCreate(input: $input) {
        customerAccessToken { accessToken expiresAt }
        customerUserErrors { field message }
      }
    }
  `;
  return shopifyFetch<any>(mutation, { input: { email, password } });
}

export async function addCustomerAddress(accessToken: string, address: Omit<CustomerAddress, "id">) {
  const mutation = `
    mutation customerAddressCreate($customerAccessToken: String!, $address: MailingAddressInput!) {
      customerAddressCreate(customerAccessToken: $customerAccessToken, address: $address) {
        customerAddress { id firstName lastName address1 address2 city province country zip phone }
        customerUserErrors { field message }
      }
    }
  `;
  return shopifyFetch<any>(mutation, { customerAccessToken: accessToken, address });
}

export async function getCustomerAddresses(accessToken: string) {
  const query = `
    query customer($customerAccessToken: String!) {
      customer(customerAccessToken: $customerAccessToken) {
        addresses(first: 10) {
          edges {
            node { id firstName lastName address1 address2 city province country zip phone }
          }
        }
      }
    }
  `;
  return shopifyFetch<any>(query, { customerAccessToken: accessToken });
}

export async function deleteCustomerAddress(accessToken: string, addressId: string) {
  const mutation = `
    mutation customerAddressDelete($customerAccessToken: String!, $id: ID!) {
      customerAddressDelete(customerAccessToken: $customerAccessToken, id: $id) {
        deletedCustomerAddressId
        customerUserErrors { field message }
      }
    }
  `;
  return shopifyFetch<any>(mutation, { customerAccessToken: accessToken, id: addressId });
}

export async function updateCustomerAddress(accessToken: string, addressId: string, address: Omit<CustomerAddress, "id">) {
  const mutation = `
    mutation customerAddressUpdate($customerAccessToken: String!, $id: ID!, $address: MailingAddressInput!) {
      customerAddressUpdate(customerAccessToken: $customerAccessToken, id: $id, address: $address) {
        customerAddress { id firstName lastName address1 address2 city province country zip phone }
        customerUserErrors { field message }
      }
    }
  `;
  return shopifyFetch<any>(mutation, { customerAccessToken: accessToken, id: addressId, address });
}

export async function getCustomer(accessToken: string) {
  const query = `
    query customer($customerAccessToken: String!) {
      customer(customerAccessToken: $customerAccessToken) {
        id email firstName lastName
        orders(first: 10, sortKey: PROCESSED_AT, reverse: true) {
          edges {
            node {
              id orderNumber processedAt financialStatus fulfillmentStatus
              totalPriceV2 { amount currencyCode }
              lineItems(first: 5) {
                edges { node { title quantity variant { image { url } } } }
              }
            }
          }
        }
      }
    }
  `;
  return shopifyFetch<any>(query, { customerAccessToken: accessToken });
}

export async function recoverCustomerPassword(email: string) {
  const query = `
    mutation customerRecover($email: String!) {
      customerRecover(email: $email) {
        customerUserErrors { code field message }
      }
    }
  `;
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Shopify-Storefront-Access-Token": token },
    body: JSON.stringify({ query, variables: { email } }),
  });
  return res.json();
}

export async function customerResetByUrl(resetUrl: string, password: string) {
  const mutation = `
    mutation customerResetByUrl($resetUrl: URL!, $password: String!) {
      customerResetByUrl(resetUrl: $resetUrl, password: $password) {
        customerUserErrors { field message code }
        customer { id }
      }
    }
  `;
  return shopifyFetch<any>(mutation, { resetUrl, password });
}

// --- Функции Корзины ---

export async function createCart(lang: string = "UK") {
  const mutation = `
    mutation cartCreate($language: LanguageCode) @inContext(language: $language) {
      cartCreate {
        cart { ${CART_FRAGMENT} }
      }
    }
  `;
  return shopifyFetch<any>(mutation, { language: lang.toUpperCase() }, lang);
}

export async function getCart(cartId: string, lang: string = "UK") {
  const query = `
    query cart($id: ID!, $language: LanguageCode) @inContext(language: $language) {
      cart(id: $id) { ${CART_FRAGMENT} }
    }
  `;
  return shopifyFetch<any>(query, { id: cartId, language: lang.toUpperCase() }, lang);
}

export async function addToCart(
  cartId: string, 
  merchandiseId: string, 
  quantity: number, 
  attributes: { key: string; value: string }[] = [],
  lang: string = "UK"
) {
  const mutation = `
    mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!, $language: LanguageCode) @inContext(language: $language) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart { ${CART_FRAGMENT} }
      }
    }
  `;
  return shopifyFetch<any>(
    mutation, 
    { cartId, lines: [{ merchandiseId, quantity, attributes }], language: lang.toUpperCase() }, 
    lang 
  );
}

export async function updateCartLine(
  cartId: string, 
  lineId: string, 
  quantity: number, 
  attributes: { key: string; value: string }[] = [],
  lang: string = "UK"
) {
  const mutation = `
    mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!, $language: LanguageCode) @inContext(language: $language) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart { ${CART_FRAGMENT} }
      }
    }
  `;
  return shopifyFetch<any>(
    mutation, 
    { cartId, lines: [{ id: lineId, quantity, attributes }], language: lang.toUpperCase() }, 
    lang
  );
}

export async function removeFromCart(cartId: string, lineIds: string[], lang: string = "UK") {
  const mutation = `
    mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!, $language: LanguageCode) @inContext(language: $language) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart { ${CART_FRAGMENT} }
      }
    }
  `;
  return shopifyFetch<any>(mutation, { cartId, lineIds, language: lang.toUpperCase() }, lang);
}