"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import {
  createCart,
  addToCart,
  removeFromCart,
  updateCartLine,
  getCart,
} from "@/lib/shopify";
import type { Cart, CartLineFull } from "@/hooks/useCart";

interface CartContextType {
  cartId: string | null;
  lines: CartLineFull[];
  checkoutUrl: string | null;
  addItem: (
    merchandiseId: string,
    quantity?: number,
    selectedOptions?: { name: string; value: string }[]
  ) => void;
  removeItem: (lineId: string) => void;
  updateItem: (lineId: string, quantity: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartId, setCartId] = useState<string | null>(null);
  const [lines, setLines] = useState<CartLineFull[]>([]);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);

// Универсальная функция для обновления состояния корзины
const processCart = (cart: Cart) => {
    if (!cart) {
      setLines([]);
      setCheckoutUrl(null);
      return;
    }
  
    setCheckoutUrl(cart.checkoutUrl || null);
  
    const edges = cart.lines?.edges ?? [];
    const newLines: CartLineFull[] = edges.map((edge) => {
      const node = edge.node;
  
      // Сохраняем старое количество, если сервер не прислал
      const oldLine = lines.find(line => line.id === node.id);
  
      return {
        id: node.id,
        quantity: node.quantity ?? oldLine?.quantity ?? 1, // fallback к старому количеству или 1
        merchandise: {
          id: node.merchandise.id,
          title: node.merchandise.title,
          priceV2: node.merchandise.priceV2,
          image: node.merchandise.image || undefined,
          selectedOptions: node.merchandise.selectedOptions || [],
        },
      };
    });
  
    setLines(newLines);
  };
  

  // Инициализация корзины
  useEffect(() => {
    const initCart = async () => {
      try {
        const savedCartId = localStorage.getItem("cartId");
        if (savedCartId) {
          setCartId(savedCartId);
          const res = await getCart(savedCartId);
          if (res?.cart) processCart(res.cart);
          return;
        }

        const res = await createCart();
        if (res?.cartCreate?.cart) {
          const newCart = res.cartCreate.cart;
          setCartId(newCart.id);
          localStorage.setItem("cartId", newCart.id);
          processCart(newCart);
        }
      } catch (err) {
        console.error("Error initializing cart:", err);
      }
    };

    initCart();
  }, []);

  // Добавление товара
  const addItem = async (
    merchandiseId: string,
    quantity = 1,
    selectedOptions?: { name: string; value: string }[]
  ) => {
    if (!cartId) return;
    try {
      const res = await addToCart(cartId, merchandiseId, quantity, selectedOptions || []);
      if (!res?.cart) return;
      processCart(res.cart);
    } catch (err) {
      console.error("Error adding item:", err);
    }
  };

// Удаление товара
const removeItem = async (lineId: string) => {
    if (!cartId) return;
  
    // Оптимистичное обновление состояния
    setLines(prev => prev.filter(line => line.id !== lineId));
  
    try {
      const res = await removeFromCart(cartId, [lineId]);
      if (res?.cartLinesRemove?.cart) {
        processCart(res.cartLinesRemove.cart);
      }
    } catch (err) {
      console.error("Error removing item:", err);
      // если ошибка, можно вернуть состояние обратно
      const res = await getCart(cartId);
      if (res?.cart) processCart(res.cart);
    }
  };
  
  
  // Обновление количества
  const updateItem = async (lineId: string, quantity: number) => {
    if (!cartId || quantity < 1) return;
  
    // Оптимистичное обновление
    setLines(prev =>
      prev.map(line =>
        line.id === lineId ? { ...line, quantity } : line
      )
    );
  
    try {
      const res = await updateCartLine(cartId, lineId, quantity);
      if (res?.cartLinesUpdate?.cart) {
        processCart(res.cartLinesUpdate.cart);
      }
    } catch (err) {
      console.error("Error updating item:", err);
      // восстановление данных с сервера
      const res = await getCart(cartId);
      if (res?.cart) processCart(res.cart);
    }
  };
  
  

  return (
    <CartContext.Provider
      value={{ cartId, lines, checkoutUrl, addItem, removeItem, updateItem }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCartContext must be used within CartProvider");
  return context;
};
