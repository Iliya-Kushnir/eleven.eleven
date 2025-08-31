/*
import { useState, useEffect } from "react";
import { createCart, addToCart, removeFromCart, updateCartLine } from "@/lib/shopify";

// Типы для товаров в корзине
export interface Merchandise {
    id: string;
    title?: string;
    priceV2?: { amount: string; currencyCode: string };
    image?: { url: string; altText?: string }; // <-- исправлено
  }
  

export interface CartLineFull {
  id: string;
  quantity: number;
  merchandise: Merchandise;
}

interface CartEdge {
  node: CartLineFull;
}

interface CartResponseType {
  cartCreate?: {
    cart: {
      id: string;
      lines?: { edges: CartEdge[] };
    };
  };
  cartLinesAdd?: {
    cart: {
      id: string;
      lines?: { edges: CartEdge[] };
    };
  };
  cartLinesRemove?: {
    cart: {
      id: string;
      lines?: { edges: CartEdge[] };
    };
  };
  cartLinesUpdate?: {
    cart: {
      id: string;
      lines?: { edges: CartEdge[] };
    };
  };
}

export function useCart() {
  const [cartId, setCartId] = useState<string | null>(null);
  const [lines, setLines] = useState<CartLineFull[]>([]);

  // Инициализация корзины
  useEffect(() => {
    const initCart = async () => {
      if (!cartId) {
        const res: CartResponseType = await createCart();
        if (!res.cartCreate) return;

        setCartId(res.cartCreate.cart.id);
        const edges = res.cartCreate.cart.lines?.edges || [];
        setLines(
            edges.map((edge: CartEdge) => ({
              ...edge.node,
              merchandise: {
                ...edge.node.merchandise,
                priceV2: edge.node.merchandise.priceV2,
                featuredImage: edge.node.merchandise.image || undefined // <-- присваиваем image в featuredImage
              }
            }))
          );
          
      }
    };
    initCart();
  }, [cartId]);

  const addItem = async (merchandiseId: string, quantity = 1) => {
    if (!cartId) return;
    const res: CartResponseType = await addToCart(cartId, merchandiseId, quantity);
    const edges = res.cartLinesAdd?.cart.lines?.edges || [];
    setLines(
        edges.map((edge: CartEdge) => ({
          ...edge.node,
          merchandise: {
            ...edge.node.merchandise,
            priceV2: edge.node.merchandise.priceV2,
            featuredImage: edge.node.merchandise.image || undefined // <-- присваиваем image в featuredImage
          }
        }))
      );
      
  };

  const removeItem = async (lineId: string) => {
    if (!cartId) return;
    const res: CartResponseType = await removeFromCart(cartId, [lineId]);
    const edges = res.cartLinesRemove?.cart.lines?.edges || [];
    setLines(
        edges.map((edge: CartEdge) => ({
          ...edge.node,
          merchandise: {
            ...edge.node.merchandise,
            priceV2: edge.node.merchandise.priceV2,
            featuredImage: edge.node.merchandise.image || undefined // <-- присваиваем image в featuredImage
          }
        }))
      );
      
  };

  const updateItem = async (lineId: string, quantity: number) => {
    if (!cartId) return;
    const res: CartResponseType = await updateCartLine(cartId, lineId, quantity);
    const edges = res.cartLinesUpdate?.cart.lines?.edges || [];
    setLines(
        edges.map((edge: CartEdge) => ({
          ...edge.node,
          merchandise: {
            ...edge.node.merchandise,
            priceV2: edge.node.merchandise.priceV2,
            featuredImage: edge.node.merchandise.image || undefined // <-- присваиваем image в featuredImage
          }
        }))
      );      
  };

  return { cartId, lines, addItem, removeItem, updateItem };
}
*/