"use client";

import React, { useState } from "react";

const ShoppingCart = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
<div>
      {/* Бургер кнопка */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-50 w-8 h-8 flex flex-col justify-between items-center cursor-pointer"
      >
        <span
          className={`block h-1 w-8 bg-black rounded transform transition duration-300 origin-center ${
            isOpen ? "rotate-45 translate-y-2" : ""
          }`}
        />
        <span
          className={`block h-1 w-8 bg-black rounded transition duration-300 ${
            isOpen ? "opacity-0" : ""
          }`}
        />
        <span
          className={`block h-1 w-8 bg-black rounded transform transition duration-300 origin-center ${
            isOpen ? "-rotate-45 -translate-y-2" : ""
          }`}
        />
      </button>

      {/* Оверлей */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Меню</h2>
          <ul className="space-y-2">
            <li>
              <a href="#" className="block hover:text-blue-500">
                Главная
              </a>
            </li>
            <li>
              <a href="#" className="block hover:text-blue-500">
                О нас
              </a>
            </li>
            <li>
              <a href="#" className="block hover:text-blue-500">
                Контакты
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
