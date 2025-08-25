"use client";
import { useState } from "react";

const Accordion = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full mx-auto bg-white rounded mb-[50px]">
      {/* DETAILS */}
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
        <p className="mb-2 text-gray-500">
        PREMIUM DOUBLE LAYERED HOODIE, EXTRA PADDED AND REVERSIBLE. THIS IS THE THICKEST PIECE FROM OUR CURATED SELECTION, MADE OUT OF THE HIGHEST QUALITY COTTON SUSTAINABLY DEVELOPED FOR A BUTTERY HAND FEEL.

MANUFACTURED IN SPAIN

THIS PIECE'S ORGANIC COTTON IS SPECIALLY DEVELOPED AND PREPARED FOR ANY TYPE OF PRINTING (SCREEN PRINTING OR DGT) IN ORDER TO OBTAIN THE BEST AND MOST ACCURATE COLOR RESULT.

INFORMATION

- 52 OZ / PIECE 100% ORGANIC COTTON
- 1000 GSM
- PRE-SHRUNK (0-3%)

FEATURES

- HEAVYWEIGHT FABRIC
- PADDED AND REVERSIBLE
- DOUBLE STITCHED SHOULDERS, SLEEVES AND BOTTOM CUFFS
- THICK RIBBING
- DOUBLE LINED HOOD
- KANGAROO POCKET
- PLAIN / UNTAGGED

CARE INFO: WASH COLD, BELOW 20 DEGREES (°C). DO NOT IRON OR BLEACH.

KEEP IN MIND EACH PRODUCT RANGE ACQUIRES A DIFFERENT COLOR SHADE DUE TO ITS FABRIC COMPOSITION DIFFERENCES, MEANING COLORS WILL NOT MATCH TO PERFECTION WHEN COMBINED WITHIN DIFFERENT FABRIC TYPES. WE RECOMMEND PURCHASING PRODUCTS FROM THE SAME FABRIC / RANGE FOR A MORE ADJUSTED COLOR MATCH.
        </p>
      </div>

      {/* SIZE GUIDE */}
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
        <p className="mb-2 text-gray-500">
        PLEASE ALLOW 1-3CM DIFFERENCE BETWEEN EACH OF THE MESUREMENTS AS EVERY PIECE IS HAND-CRAFTED INDIVIDUALLY.
        </p>
      </div>

      {/* SHIPPING */}
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
