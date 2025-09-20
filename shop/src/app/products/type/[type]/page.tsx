"use client";

import ProductsFeed from "@/components/ProductsFeed/ProductsFeed";
import { use } from "react"; // react 18+ для unwrap promise

interface ProductTypePageProps {
  params: Promise<{ type: string }>;
}

export default function ProductTypePage({ params }: ProductTypePageProps) {
  const { type } = use(params); // распаковываем promise
  const decodedType = decodeURIComponent(type);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4 ">{decodedType.toUpperCase()}</h1>
      <ProductsFeed type={decodedType} />
    </div>
  );
}
