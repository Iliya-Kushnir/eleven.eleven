import React from "react";
import { notFound } from "next/navigation";

// Пример данных продуктов (можно потом с API)
const products = [
  { id: "1", name: "Product 1", price: 100 },
  { id: "2", name: "Product 2", price: 200 },
];

type Product = {
  id: string;
  name: string;
  price: number;
};

type PageProps = {
  params: { id: string };
};

export default function ProductPage({ params }: PageProps) {
  const product: Product | undefined = products.find(
    (p) => p.id === params.id
  );

  if (!product) {
    return notFound(); // 404 страница
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <p className="mt-2">Цена: ${product.price}</p>
      <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
        Добавить в корзину
      </button>
    </div>
  );
}
