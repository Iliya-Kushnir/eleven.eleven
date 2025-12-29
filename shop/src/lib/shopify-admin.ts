const domain = process.env.SHOPIFY_STORE_DOMAIN;
const adminToken = process.env.SHOPIFY_ADMIN_API_TOKEN; // shpat_...

async function shopifyAdminFetch<T>(query: string, variables = {}): Promise<T | null> {
  try {
    const endpoint = `https://${domain}/admin/api/2024-01/graphql.json`;
    
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": adminToken!,
      },
      body: JSON.stringify({ query, variables }),
      next: { revalidate: 0 }, // Не кэшируем запросы админки
    });

    const body = await res.json();

    if (body.errors) {
      console.error("Shopify Admin API Errors:", body.errors);
      return null;
    }

    return body.data;
  } catch (error) {
    console.error("Shopify Admin Fetch Error:", error);
    return null;
  }
}

export async function createShopifyOrder(orderData: any) {
  const mutation = `
    mutation orderCreate($input: OrderInput!) {
      orderCreate(input: $input) {
        order {
          id
          name
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  // Преобразуем данные из Webhook в формат Shopify
  const variables = {
    input: {
      lineItems: orderData.lineItems.map((item: any) => ({
        variantId: item.merchandiseId || item.merchandise.id,
        quantity: item.quantity,
      })),
      shippingAddress: {
        firstName: orderData.shippingAddress.firstName,
        lastName: orderData.shippingAddress.lastName,
        address1: orderData.shippingAddress.address1,
        city: orderData.shippingAddress.city,
        zip: orderData.shippingAddress.zip,
        country: orderData.shippingAddress.country,
      },
      email: orderData.customer.email,
      financialStatus: "PAID", // Т.к. Webhook пришел после оплаты
      tags: ["FONDY", `FondyID-${orderData.orderId}`],
    },
  };

  const res = await shopifyAdminFetch<any>(mutation, variables);
  
  if (res?.orderCreate?.userErrors?.length > 0) {
    console.error("Order Creation Errors:", res.orderCreate.userErrors);
    return null;
  }

  return res?.orderCreate?.order;
}