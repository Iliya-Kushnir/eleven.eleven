/* src/components/Accordion/Accordion.tsx */
"use client";
import { useState } from "react";

interface AccordionProps {
  descriptionHtml?: string;
  sizeGuide?: {
    reference?: {
      image?: {
        url: string;
        altText: string | null;
      };
    };
  };
}

const Accordion: React.FC<AccordionProps> = ({ descriptionHtml, sizeGuide }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Извлекаем URL картинки
  const sizeChartUrl = sizeGuide?.reference?.image?.url;

  return (
    <div className="w-full mx-auto bg-white rounded mb-[50px]">
      {/* Секция Details */}
      <h2 id="accordion-heading-1">
        <button
          type="button"
          className="flex justify-between items-center py-5 w-full font-medium text-left text-gray-900 border-b border-gray-200 cursor-pointer"
          onClick={() => toggle(0)}
        >
          <span className="uppercase text-sm tracking-widest">Details</span>
          <svg className={`w-4 h-4 transition-transform ${openIndex === 0 ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </h2>
      <div className={openIndex === 0 ? "block py-5 border-b border-gray-200" : "hidden"}>
        <div 
          className="text-xs uppercase leading-relaxed text-gray-600" 
          dangerouslySetInnerHTML={{ __html: descriptionHtml || "" }} 
        />
      </div>

      {/* Секция Size Guide - появится только если есть картинка */}
      {sizeChartUrl && (
        <>
          <h2 id="accordion-heading-2">
            <button
              type="button"
              className="flex justify-between items-center py-5 w-full font-medium text-left text-gray-900 border-b border-gray-200 cursor-pointer"
              onClick={() => toggle(1)}
            >
              <span className="uppercase text-sm tracking-widest">Size Guide</span>
              <svg className={`w-4 h-4 transition-transform ${openIndex === 1 ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </h2>
          <div className={openIndex === 1 ? "block py-5 border-b border-gray-200" : "hidden"}>
            <img 
              src={sizeChartUrl} 
              alt={sizeGuide?.reference?.image?.altText || "Size Chart"} 
              className="w-full h-auto object-contain"
            />
          </div>
        </>
      )}

      {/* Секция Shipping */}
      <h2 id="accordion-heading-3">
        <button
          type="button"
          className="flex justify-between items-center py-5 w-full font-medium text-left text-gray-900 border-b border-gray-200 cursor-pointer"
          onClick={() => toggle(2)}
        >
          <span className="uppercase text-sm tracking-widest">Shipping</span>
          <svg className={`w-4 h-4 transition-transform ${openIndex === 2 ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </h2>
      <div className={openIndex === 2 ? "block py-5 border-b border-gray-200" : "hidden"}>
        <p className="text-xs uppercase leading-relaxed text-gray-600">
          Please allow 1-5 business days for our warehouse team to process every order.
        </p>
      </div>
    </div>
  );
};

export default Accordion;