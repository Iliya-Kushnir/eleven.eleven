import React from "react";
import { notFound } from "next/navigation";
import Carousel from "@/components/Carousel/Carousel";
import SizeComponent from "@/components/SizeComponent/SizeComponent";
import DefaultButton from "@/components/defaultButton/defaultButton";
import ProductsFeed from "@/components/ProductsFeed/ProductsFeed";
import ColorsComp from "@/components/ColorsComp/ColorsComp";
import Accordion from "@/components/Accordion/Accordion";
import styles from "./page.module.scss";

// Пример данных продуктов (можно потом заменить на API)
const products = [
  { id: "1", name: "1000 GSM 'ANTHRACITE' DOUBLE HOODIE", price: "100.00$" },
  { id: "2", name: "3000 GSM 'ANTHRACITE' DOUBLE ZIP-HOODIE", price: "200.00$" },
];

type Product = {
  id: string;
  name: string;
  price: string;
};

// Сделаем страницу async, как требует Next.js 15 для динамических маршрутов
export default async function ProductPage({ params }: { params: { id: string } }) {
  const product: Product | undefined = products.find((p) => p.id === params.id);

  if (!product) {
    return notFound(); // 404 страница
  }

  return (
    <div className="font-sans flex flex-col items-center justify-items-center p-2.5 pb-2.5 sm:p-20">
      <Carousel showNavigation={true} showPagination={true} />

      <h1 className={styles.productName}>{product.name}</h1>
      <span className={styles.price}>{product.price}</span>

      <h1 className={styles.secondaryText}>SIZE</h1>
      <SizeComponent />

      <h1 className={styles.secondaryText}>SIZE GUIDE</h1>
      <DefaultButton label="ADD TO CART" />

      <h1 className={styles.secondaryText}>COLOR</h1>
      <ColorsComp />

      <Accordion />
      <ProductsFeed />
    </div>
  );
}
