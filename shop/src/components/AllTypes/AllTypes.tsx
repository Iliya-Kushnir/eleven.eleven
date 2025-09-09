// pages/products/types.tsx
"use client";
import Link from "next/link";
import { getProductsGroupedByType } from "@/lib/shopify";
import { useEffect, useState } from "react";

interface ProductType {
  id: string;
  title: string;
}

export default function ProductTypesPage() {
  const [groupedProducts, setGroupedProducts] = useState<Record<string, ProductType[]>>({});

  useEffect(() => {
    async function loadGrouped() {
      const grouped = await getProductsGroupedByType();
      setGroupedProducts(grouped);
    }

    loadGrouped();
  }, []);

  return (
    <div>
      <h1>Product Types</h1>
      {Object.keys(groupedProducts).map((type) => (
        <Link key={type} href={`/products?type=${encodeURIComponent(type)}`}>
          {type} ({groupedProducts[type].length})
        </Link>
      ))}
    </div>
  );
}
