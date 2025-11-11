/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from "react";

interface AccordionProps {
  descriptionHtml?: string;
  sizeGuideHtml?: string;
}

const Accordion: React.FC<AccordionProps> = ({ descriptionHtml, sizeGuideHtml }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full mx-auto bg-white rounded mb-[50px]">


      <h2 id="accordion-flush-heading-1">
        <button
          type="button"
          className="flex justify-between items-center py-5 w-full font-medium text-left text-gray-900 rounded-t-xl border-b border-gray-200 cursor-pointer"
          aria-expanded={openIndex === 0}
          aria-controls="accordion-flush-body-1"
          onClick={() => toggle(0)}
        >
          <span>DETAILS</span>
          <svg
            className={`w-6 h-6 shrink-0 transition-transform ${
              openIndex === 0 ? "rotate-180" : ""
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </h2>

      <div
        id="accordion-flush-body-1"
        aria-labelledby="accordion-flush-heading-1"
        className={openIndex === 0 ? "block py-5 border-b border-gray-200" : "hidden"}
      >
        <div
          className="mb-2 text-gray-500"
          dangerouslySetInnerHTML={{ __html: descriptionHtml || "" }}
        />
      </div>


      <h2 id="accordion-flush-heading-2">
        <button
          type="button"
          className="flex justify-between items-center py-5 w-full font-medium text-left text-gray-500 border-b border-gray-200 cursor-pointer"
          aria-expanded={openIndex === 1}
          aria-controls="accordion-flush-body-2"
          onClick={() => toggle(1)}
        >
          <span>SIZE GUIDE</span>
          <svg
            className={`w-6 h-6 shrink-0 transition-transform ${
              openIndex === 1 ? "rotate-180" : ""
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </h2>

      <div
        id="accordion-flush-body-2"
        aria-labelledby="accordion-flush-heading-2"
        className={openIndex === 1 ? "block py-5 border-b border-gray-200" : "hidden"}
      >
        <div
          className="mb-2 text-gray-500"
          dangerouslySetInnerHTML={{ __html: sizeGuideHtml ?? "" }}
        />
      </div>
  
      <h2 id="accordion-flush-heading-3">
        <button
          type="button"
          className="flex justify-between items-center py-5 w-full font-medium text-left text-gray-500 border-b border-gray-200 cursor-pointer"
          aria-expanded={openIndex === 2}
          aria-controls="accordion-flush-body-3"
          onClick={() => toggle(2)}
        >
          <span>SHIPPING</span>
          <svg
            className={`w-6 h-6 shrink-0 transition-transform ${
              openIndex === 2 ? "rotate-180" : ""
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </h2>
      <div
        id="accordion-flush-body-3"
        aria-labelledby="accordion-flush-heading-3"
        className={openIndex === 2 ? "block py-5 border-b border-gray-200" : "hidden"}
      >
        <p className="mb-2 text-gray-500">
        PLEASE ALLOW 1-5 (BUSINESS DAYS) FOR OUR WAREHOUSE TEAM TO PROCESS AND DISPATCH EVERY ORDER FROM OUR RETAIL STORE. ONCE SHIPPED, THE PACKAGE WILL BE DELIVERED WITHIN 24-72 HOURS.
        </p>
      </div>
    </div>
  );
};

export default Accordion;


