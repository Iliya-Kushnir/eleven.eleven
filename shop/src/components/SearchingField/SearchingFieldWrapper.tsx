"use client"; // Делаем этот файл клиентским

import dynamic from "next/dynamic";

// Переносим динамический импорт с отключенным SSR сюда
const SearchingFeedNoSSR = dynamic(
  () => import("@/components/SearchingField/SearchingField"),
  { ssr: false }
);

export default function SearchingFieldWrapper() {
  return <SearchingFeedNoSSR />;
}