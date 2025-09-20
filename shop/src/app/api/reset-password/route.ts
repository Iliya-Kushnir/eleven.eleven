import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { resetUrl, newPassword } = await req.json();

  const query = `
    mutation customerResetByUrl($input: CustomerResetByUrlInput!) {
      customerResetByUrl(input: $input) {
        customer {
          id
          email
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
      resetUrl,        // тут полный URL из письма Shopify
      password: newPassword,
    },
  };

  const res = await fetch(
    `https://${process.env.SHOPIFY_STORE_DOMAIN}/api/2025-07/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": process.env.SHOPIFY_STOREFRONT_TOKEN!,
      },
      body: JSON.stringify({ query, variables }),
    }
  );

  const data = await res.json();
  return NextResponse.json(data.data);
}
