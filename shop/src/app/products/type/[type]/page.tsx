"use client";

import ProductsFeed from "@/components/ProductsFeed/ProductsFeed";
import { use } from "react"; 
import { useLanguage } from "@/context/LanguageContext"; // Импортируем язык

interface ProductTypePageProps {
  params: Promise<{ type: string }>;
}

// Мапа переводов для заголовков
const typeTranslations: Record<string, Record<string, string>> = {
  en: {
    "hoodie": "Hoodies",
    "t-shirt": "T-Shirts",
    "pants": "Pants",
    "long sleeve": "Long sleeves",
    "accessories": "Accessories",
  },
  uk: {
    "hoodie": "Худі",
    "худі": "Худі",
    "t-shirt": "Футболки",
    "футболка": "Футболки",
    "pants": "Штани",
    "штани": "Штани",
    "long sleeve": "Лонгсліви",
    "Лонгсліви": "Лонгсліви",
    "accessories": "Аксесуари",
  }
};

export default function ProductTypePage({ params }: ProductTypePageProps) {
  const { type } = use(params); 
  const { language } = useLanguage();
  
  const decodedType = decodeURIComponent(type).toLowerCase();
  const currentLang = (language === 'en' || language === 'uk') ? language : 'uk';

  // Получаем красивое название для заголовка
  const displayName = typeTranslations[currentLang][decodedType] || decodedType;

  return (
    <div className="w-full max-w-[1440px] mx-auto p-5 md:px-10 py-10 md:py-20">
      <h1 className="text-2xl md:text-3xl font-bold mb-10 tracking-[0.15em] uppercase text-[#1a1a1a]">
        {displayName}
      </h1>
      
      {/* Передаем decodedType. 
          Внутри ProductsFeed теперь есть мапа, которая поймет этот тип на любом языке.
      */}
      <ProductsFeed type={decodedType} />
    </div>
  );
}