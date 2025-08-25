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


const domain = process.env.SHOPIFY_STORE_DOMAIN!;
const token = process.env.SHOPIFY_STOREFRONT_API_TOKEN!;
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
  return json.data;
}
