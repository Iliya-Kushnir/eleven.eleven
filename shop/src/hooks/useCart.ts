"use client";
import { useState, useEffect } from "react";
import {
  createCart,
  addToCart as addToCartServer,
  updateCartLine,
  removeFromCart,
  getCart,
} from "@/lib/shopify";
import { useLanguage } from "@/context/LanguageContext"; // Импортируем язык

// --- Интерфейсы ---
export interface Merchandise {
  id: string;
  title?: string;
  priceV2?: { amount: string; currencyCode: string };
  image?: { url: string; altText?: string | null };
  selectedOptions?: { name: string; value: string }[];
}

export interface CartLineFull {
  id: string;
  quantity: number;
  merchandise: Merchandise;
  attributes?: { key: string; value: string }[];
}

interface CartEdge {
  node: CartLineFull;
}

export interface Cart {
  id: string;
  checkoutUrl?: string;
  lines?: { edges: CartEdge[] };
}

export function useCart() {
  const [cartId, setCartId] = useState<string | null>(null);
  const [lines, setLines] = useState<CartLineFull[]>([]);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
  
  // Получаем текущий язык ("uk" или "en")
  const { language } = useLanguage();

  const processCart = (cart: Cart) => {
    setCheckoutUrl(cart.checkoutUrl || null);
    const edges = cart.lines?.edges || [];
    setLines(
      edges.map((edge) => ({
        id: edge.node.id,
        quantity: edge.node.quantity ?? 0,
        merchandise: {
          id: edge.node.merchandise.id,
          title: edge.node.merchandise.title,
          priceV2: edge.node.merchandise.priceV2,
          image: edge.node.merchandise.image,
          selectedOptions: edge.node.merchandise.selectedOptions || [],
        },
        attributes: edge.node.attributes || [],
      }))
    );
  };

  // Инициализация и обновление при смене языка
  useEffect(() => {
    const initCart = async () => {
      try {
        const savedCartId = localStorage.getItem("cartId");
        if (savedCartId) {
          setCartId(savedCartId);
          // Передаем language, чтобы получить переведенные названия
          const res = await getCart(savedCartId, language);
          if (res?.cart) processCart(res.cart);
          return;
        }

        const res = await createCart(language);
        if (!res?.cartCreate?.cart) return;
        setCartId(res.cartCreate.cart.id);
        localStorage.setItem("cartId", res.cartCreate.cart.id);
        processCart(res.cartCreate.cart);
      } catch (err) {
        console.error("Error initializing cart:", err);
      }
    };
    initCart();
  }, [language]); // Перезагружаем при смене языка

  const addItem = async (
    merchandiseId: string,
    quantity = 1,
    attributes: { key: string; value: string }[] = []
  ) => {
    if (!cartId) return;
    try {
      // Исправлено: передаем attributes четвертым аргументом, а language - пятым
      const res = await addToCartServer(cartId, merchandiseId, quantity, attributes, language);
      if (res?.cartLinesAdd.cart) processCart(res.cartLinesAdd.cart);
    } catch (err) {
      console.error("Error adding item:", err);
    }
  };

  const removeItem = async (lineId: string) => {
    if (!cartId) return;
    try {
      const res = await removeFromCart(cartId, [lineId], language);
      if (res?.cartLinesRemove?.cart) processCart(res.cartLinesRemove.cart);
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  const updateItem = async (
    lineId: string, 
    quantity: number, 
    attributes: { key: string; value: string }[] = []
  ) => {
    if (!cartId) return;
    try {
      const res = await updateCartLine(cartId, lineId, quantity, attributes, language);
      if (res?.cartLinesUpdate?.cart) processCart(res.cartLinesUpdate.cart);
    } catch (err) {
      console.error("Error updating item:", err);
    }
  };

  return { cartId, lines, checkoutUrl, addItem, removeItem, updateItem };
}