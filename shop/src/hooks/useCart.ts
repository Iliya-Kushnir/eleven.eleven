import { useState, useEffect } from "react";
import { createCart, addToCart, removeFromCart, updateCartLine } from "@/lib/shopify";

// Типы для товаров в корзине
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
}

interface CartEdge {
  node: CartLineFull;
}

export interface Cart {
  id: string;
  checkoutUrl?: string;
  lines?: { edges: CartEdge[] };
}

export interface CartCreateResponse {
  cartCreate: { cart: Cart };
}

export interface CartLinesAddResponse {
  cartLinesAdd: { cart: Cart };
}

export interface CartLinesUpdateResponse {
  cartLinesUpdate: { cart: Cart };
}

export interface CartLinesRemoveResponse {
  cartLinesRemove: { cart: Cart };
}

export function useCart() {
  const [cartId, setCartId] = useState<string | null>(null);
  const [lines, setLines] = useState<CartLineFull[]>([]);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);

  // Обработка любого cart ответа
  const processCart = (cart: Cart) => {
    setCheckoutUrl(cart.checkoutUrl || null);
    const edges = cart.lines?.edges || [];
    setLines(
      edges.map((edge) => ({
        ...edge.node,
        merchandise: {
          ...edge.node.merchandise,
          priceV2: edge.node.merchandise.priceV2,
          image: edge.node.merchandise.image || undefined,
          selectedOptions: edge.node.merchandise.selectedOptions || [],
        },
      }))
    );
  };

  // Инициализация корзины
  useEffect(() => {
    const initCart = async () => {
      if (!cartId) {
        try {
          const res: CartCreateResponse = await createCart();
          if (!res.cartCreate?.cart) return;
          setCartId(res.cartCreate.cart.id);
          processCart(res.cartCreate.cart);
        } catch (err) {
          console.error("Error initializing cart:", err);
        }
      }
    };
    initCart();
  }, [cartId]);

  const addItem = async (
    merchandiseId: string,
    quantity = 1,
    selectedOptions?: { name: string; value: string }[]
  ) => {
    if (!cartId) return;
    try {
      // Важно: теперь addToCart возвращает весь объект CartLinesAddResponse
      const res: CartLinesAddResponse = await addToCart(cartId, merchandiseId, quantity, selectedOptions);
      if (!res.cartLinesAdd?.cart) return;
      processCart(res.cartLinesAdd.cart);
    } catch (err) {
      console.error("Error adding item:", err);
    }
  };

  const removeItem = async (lineId: string) => {
    if (!cartId) return;
    try {
      const res: CartLinesRemoveResponse = await removeFromCart(cartId, [lineId]);
      if (!res.cartLinesRemove?.cart) return;
      processCart(res.cartLinesRemove.cart);
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  const updateItem = async (lineId: string, quantity: number) => {
    if (!cartId) return;
    try {
      const res: CartLinesUpdateResponse = await updateCartLine(cartId, lineId, quantity);
      if (!res.cartLinesUpdate?.cart) return;
      processCart(res.cartLinesUpdate.cart);
    } catch (err) {
      console.error("Error updating item:", err);
    }
  };

  return { cartId, lines, checkoutUrl, addItem, removeItem, updateItem };
}
