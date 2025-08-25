"use client";

const Accordion = () => {
  return (
    <div className="w-full mx-auto bg-white rounded mb-[50px]">
      <div
           id="accordion-flush" 
           data-accordion="collapse" 
           data-active-classes="bg-white text-gray-900"
           data-inactive-classes="text-gray-500"
           className=" "
           >
            

        {/* DETAILS */}
        <h2 id="accordion-flush-heading-1">
          <button
            type="button"
            className="flex justify-between items-center py-5 w-full font-medium text-left text-gray-900 rounded-t-xl border-b border-gray-200 cursor-pointer"
            data-accordion-target="#accordion-flush-body-1"
            aria-expanded="true"
            aria-controls="accordion-flush-body-1"
          >
            <span>DETAILS</span>
            <svg data-accordion-icon className="w-6 h-6 rotate-180 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
            </svg>
          </button>
        </h2>
        <div id="accordion-flush-body-1" aria-labelledby="accordion-flush-heading-1">
          <div className="py-5 border-b border-gray-200">
            <p className="mb-2 text-gray-500">INTRODUCING OUR 600 GSM SERIES, THE PERFECT BLEND BETWEEN HIGH END CRAFTSMANSHIP AND SUSTAINABILITY. METICULOUSLY HANDCRAFTED BY OUR TEAM OF TEXTILE ARTISANS, EACH STITCH IS A TESTAMENT TO THEIR DEDICATION. MADE FROM THE FINEST HEAVYWEIGHT FRENCH TERRY COTTON, EACH GARMENT IS CAREFULLY CUT & SEWN IN-HOUSE FOR A FLAWLESS FINISH AND LATER GARMENT-DYED FOR A SLIGHTLY FADED, WORN-IN LOOK AND FEEL


INFORMATION

- 600 GSM (22OZ)
- 100% ORGANIC COTTON
- ADJUSTABLE WAIST DRAWSTRINGS
- REINFORCED DOUBLE STITCHED SEAMS
- OVERSIZED FIT, FEATURING BOTTOM LEG CUFFS


CARE INFO: WASH COLD, BELOW 20 DEGREES (°C). DO NOT IRON OR BLEACH.

KEEP IN MIND EACH PRODUCT RANGE ACQUIRES A DIFFERENT COLOR SHADE DUE TO ITS FABRIC COMPOSITION DIFFERENCES, MEANING COLORS WILL NOT MATCH TO PERFECTION WHEN COMBINED WITHIN DIFFERENT FABRIC TYPES. WE RECOMMEND PURCHASING PRODUCTS FROM THE SAME FABRIC / RANGE FOR A MORE ADJUSTED COLOR MATCH.</p>
          </div>
        </div>

        {/* SIZE GUIDE */}
        <h2 id="accordion-flush-heading-2">
          <button
            type="button"
            className="flex justify-between items-center py-5 w-full font-medium text-left text-gray-500 border-b border-gray-200 cursor-pointer"
            data-accordion-target="#accordion-flush-body-2"
            aria-expanded="false"
            aria-controls="accordion-flush-body-2"
          >
            <span>SIZE GUIDE</span>
            <svg data-accordion-icon className="w-6 h-6 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
            </svg>
          </button>
        </h2>
        <div id="accordion-flush-body-2" className="hidden" aria-labelledby="accordion-flush-heading-2">
          <div className="py-5 border-b border-gray-200">
            <p className="mb-2 text-gray-500">PLEASE ALLOW 1-3CM DIFFERENCE BETWEEN EACH OF THE MESUREMENTS AS EVERY PIECE IS HAND-CRAFTED INDIVIDUALLY.</p>
          </div>
        </div>

        {/* SHIPPING */}
        <h2 id="accordion-flush-heading-3">
          <button
            type="button"
            className="flex justify-between items-center py-5 w-full font-medium text-left text-gray-500 border-b border-gray-200 cursor-pointer"
            data-accordion-target="#accordion-flush-body-3"
            aria-expanded="false"
            aria-controls="accordion-flush-body-3"
          >
            <span>SHIPPING</span>
            <svg data-accordion-icon className="w-6 h-6 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
            </svg>
          </button>
        </h2>
        <div id="accordion-flush-body-3" className="hidden" aria-labelledby="accordion-flush-heading-3">
          <div className="py-5 border-b border-gray-200">
            <p className="mb-2 text-gray-500">PLEASE ALLOW 1-5 (BUSINESS DAYS) FOR OUR WAREHOUSE TEAM TO PROCESS AND DISPATCH EVERY ORDER FROM OUR RETAIL STORE. ONCE SHIPPED, THE PACKAGE WILL BE DELIVERED WITHIN 24-72 HOURS.</p>
          </div>
        </div>

      </div>
      {/* Подключение скрипта Flowbite для работы аккордеона */}
      <script src="https://unpkg.com/flowbite@1.3.3/dist/flowbite.js"></script>
    </div>
  );
};

export default Accordion;
