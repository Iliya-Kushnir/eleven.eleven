import { useState, useEffect } from "react";
import {
  createCart,
  addToCart as addToCartServer,
  updateCartLine,
  removeFromCart,
  getCart,
} from "@/lib/shopify";

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
// Обработка любого cart ответа
const processCart = (cart: Cart) => {
    setCheckoutUrl(cart.checkoutUrl || null);
  
    const edges = cart.lines?.edges || [];
    setLines(
      edges.map((edge) => {
        const node = edge.node;
  
        return {
          id: node.id,
          quantity: node.quantity ?? 0, // фикс: всегда есть число
          merchandise: {
            id: node.merchandise.id,
            title: node.merchandise.title,
            priceV2: node.merchandise.priceV2,
            image: node.merchandise.image || undefined,
            selectedOptions: node.merchandise.selectedOptions || [],
          },
        };
      })
    );
  };
  

  // Инициализация корзины
  useEffect(() => {
    const initCart = async () => {
      try {
        // Сначала проверяем localStorage
        const savedCartId = localStorage.getItem("cartId");
        if (savedCartId) {
          setCartId(savedCartId);
          const res = await getCart(savedCartId);
          if (res.cart) processCart(res.cart);
          return;
        }

        // Если нет сохранённого cartId, создаём новый
        const res: CartCreateResponse = await createCart();
        if (!res.cartCreate?.cart) return;
        setCartId(res.cartCreate.cart.id);
        localStorage.setItem("cartId", res.cartCreate.cart.id);
        processCart(res.cartCreate.cart);
      } catch (err) {
        console.error("Error initializing cart:", err);
      }
    };
    initCart();
  }, []);

  const addItem = async (
    merchandiseId: string,
    quantity = 1,
    selectedOptions?: { name: string; value: string }[]
  ) => {
    if (!cartId) return;
    try {
      const res = await addToCartServer(cartId, merchandiseId, quantity);
      if (!res.cart) return;
      processCart(res.cart);
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
