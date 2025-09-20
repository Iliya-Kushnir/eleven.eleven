// app/api/reset-password/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { token, newPassword } = await req.json();

  const query = `
    mutation customerResetByUrl($input: CustomerResetByUrlInput!) {
      customerResetByUrl(input: $input) {
        customer {
          id
        }
        customerUserErrors {
          field
          message
        }
      }
    }
  `;

  const variables = {
    input: {
      resetUrl: `https://your-shop.myshopify.com/account/change-password/${token}`,
      password: newPassword,
    },
  };

  const res = await fetch("https://your-shop.myshopify.com/api/2025-07/graphql.json", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": process.env.SHOPIFY_STOREFRONT_TOKEN!,
    },
    body: JSON.stringify({ query, variables }),
  });

  const data = await res.json();
  return NextResponse.json(data.data);
}
