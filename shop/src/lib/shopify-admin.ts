const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const adminToken = process.env.SHOPIFY_ADMIN_API_TOKEN;

export async function createShopifyOrder(orderData: any) {
  const mutation = `
    mutation orderCreate($input: OrderInput!) {
      orderCreate(input: $input) { order { id name } userErrors { field message } }
    }
  `;

  const variables = {
    input: {
      customerId: orderData.customerId, // Формат gid://shopify/Customer/...
      lineItems: orderData.lineItems.map((item: any) => ({
        variantId: item.merchandiseId,
        quantity: item.quantity,
      })),
      email: orderData.email,
      financialStatus: "PAID",
      shippingAddress: orderData.shippingAddress,
      inventoryBehaviour: "DECREMENT_IGNORING_POLICY"
    },
  };

  const res = await fetch(`https://${domain}/admin/api/2024-01/graphql.json`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Shopify-Access-Token": adminToken! },
    body: JSON.stringify({ query: mutation, variables }),
  }).then(r => r.json());

  return res.data?.orderCreate?.order;
}