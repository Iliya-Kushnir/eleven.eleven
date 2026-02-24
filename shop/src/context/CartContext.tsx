/*
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
import { useLanguage } from "@/context/LanguageContext"; // Импортируем язык

interface CartContextType {
  cartId: string | null;
  lines: CartLineFull[];
  checkoutUrl: string | null;
  addItem: (
    merchandiseId: string,
    quantity?: number,
    selectedImage?: { src: string; alt: string | null }
  ) => void;
  removeItem: (lineId: string) => void;
  updateItem: (lineId: string, quantity: number, attributes?: { key: string; value: string }[]) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartId, setCartId] = useState<string | null>(null);
  const [lines, setLines] = useState<CartLineFull[]>([]);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
  const { language } = useLanguage(); // Получаем текущий язык ("uk" или "en")

  const processCart = (cart: Cart) => {
    if (!cart || !cart.lines) {
      setLines([]);
      setCheckoutUrl(null);
      return;
    }
  
    setCheckoutUrl(cart.checkoutUrl || null);
    const edges = cart.lines.edges ?? [];

    const newLines: CartLineFull[] = edges.map((edge) => {
      const node = edge.node;
      const selectedImageAttr = node.attributes?.find((a) => a.key === "selectedImage");
      
      let selectedImage = null;
      if (selectedImageAttr?.value) {
        try {
          selectedImage = JSON.parse(selectedImageAttr.value);
        } catch (e) {
          console.error("Error parsing image attr:", e);
        }
      }
  
      return {
        id: node.id,
        quantity: node.quantity ?? 1,
        merchandise: {
          id: node.merchandise.id,
          // Берем title напрямую от Shopify (он будет переведен благодаря @inContext)
          title: node.merchandise.title, 
          priceV2: node.merchandise.priceV2,
          image: selectedImage || node.merchandise.image,
          selectedOptions: node.merchandise.selectedOptions || [],
        },
        attributes: node.attributes ?? [],
      };
    });
  
    setLines(newLines);
  };

  // Инициализация корзины
  useEffect(() => {
    const initCart = async () => {
      if (typeof window === "undefined") return;
      try {
        const savedCartId = localStorage.getItem("cartId");
        if (savedCartId) {
          const res = await getCart(savedCartId, language);
          if (res?.cart) {
            setCartId(savedCartId);
            processCart(res.cart);
            return;
          }
          localStorage.removeItem("cartId");
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

  // ОБНОВЛЕНИЕ КОРЗИНЫ ПРИ СМЕНЕ ЯЗЫКА
  useEffect(() => {
    const refreshCartLanguage = async () => {
      if (cartId) {
        const res = await getCart(cartId, language);
        if (res?.cart) processCart(res.cart);
      }
    };
    refreshCartLanguage();
  }, [language, cartId]);

  const addItem = async (
    merchandiseId: string,
    quantity: number = 1,
    selectedImage?: { src: string; alt: string | null }
  ) => {
    if (!cartId) return;
  
    try {
      const attributes: { key: string; value: string }[] = [];
      if (selectedImage) {
        attributes.push({ key: "selectedImage", value: JSON.stringify(selectedImage) });
      }
  
      const res = await addToCart(cartId, merchandiseId, quantity, attributes, language);
      // ИСПРАВЛЕНИЕ: res — это уже результат cartLinesAdd из lib/shopify
      if (res?.cartLinesAdd.cart) processCart(res.cartLinesAdd.cart);
    } catch (err) {
      console.error("Error adding item:", err);
    }
  };

  const removeItem = async (lineId: string) => {
    if (!cartId) return;
    setLines(prev => prev.filter(line => line.id !== lineId));
    try {
      const res = await removeFromCart(cartId, [lineId]);
      if (res?.cartLinesRemove?.cart) processCart(res.cartLinesRemove.cart);
    } catch (err) {
      const res = await getCart(cartId, language);
      if (res?.cart) processCart(res.cart);
    }
  };

  const updateItem = async (
    lineId: string,
    quantity: number,
    attributes: { key: string; value: string }[] = []
  ) => {
    if (!cartId || quantity < 1) return;
    try {
      const res = await updateCartLine(cartId, lineId, quantity, attributes, language);
      if (res?.cartLinesUpdate?.cart) processCart(res.cartLinesUpdate.cart);
    } catch (err) {
      const res = await getCart(cartId, language);
      if (res?.cart) processCart(res.cart);
    }
  };

  return (
    <CartContext.Provider value={{ cartId, lines, checkoutUrl, addItem, removeItem, updateItem }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCartContext must be used within CartProvider");
  return context;
};

"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import {
  createCart,
  addToCart,
  removeFromCart,
  updateCartLine,
  getCart,
} from "@/lib/shopify";
import type { CartLineFull } from "@/hooks/useCart";
import { useLanguage } from "@/context/LanguageContext";

interface CartContextType {
  cartId: string | null;
  lines: CartLineFull[];
  checkoutUrl: string | null;
  addItem: (
    merchandiseId: string,
    quantity?: number,
    selectedImage?: { src: string; alt: string | null }
  ) => void;
  removeItem: (lineId: string) => void;
  updateItem: (lineId: string, quantity: number, attributes?: { key: string; value: string }[]) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartId, setCartId] = useState<string | null>(null);
  const [lines, setLines] = useState<CartLineFull[]>([]);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
  const { language } = useLanguage();

  const processCart = (cart: any) => {
    if (!cart || !cart.lines) {
      setLines([]);
      setCheckoutUrl(null);
      return;
    }
  
    setCheckoutUrl(cart.checkoutUrl || null);
    const edges = cart.lines.edges ?? [];

    const newLines: CartLineFull[] = edges.map((edge: any) => {
      const node = edge.node;
      const variant = node.merchandise;
      const product = variant.product;

      // Склеиваем название товара и название варианта (если это не Default Title)
      const fullTitle = product?.title 
        ? `${product.title}${variant.title && variant.title !== 'Default Title' ? ` - ${variant.title}` : ''}` 
        : variant.title;

      // Логика картинки: Атрибут -> Фото варианта -> Фото товара
      const selectedImageAttr = node.attributes?.find((a: any) => a.key === "selectedImage");
      let displayImage = variant.image || product?.featuredImage;
      
      if (selectedImageAttr?.value) {
        try {
          displayImage = JSON.parse(selectedImageAttr.value);
        } catch (e) {
          console.error("Error parsing image attr:", e);
        }
      }
  
      return {
        id: node.id,
        quantity: node.quantity ?? 1,
        merchandise: {
          id: variant.id,
          title: fullTitle, 
          priceV2: variant.priceV2,
          image: displayImage,
          selectedOptions: variant.selectedOptions || [],
        },
        attributes: node.attributes ?? [],
      };
    });
  
    setLines(newLines);
  };

  useEffect(() => {
    const initCart = async () => {
      if (typeof window === "undefined") return;
      try {
        const savedCartId = localStorage.getItem("cartId");
        if (savedCartId) {
          const res = await getCart(savedCartId, language);
          if (res?.cart) {
            setCartId(savedCartId);
            processCart(res.cart);
            return;
          }
          localStorage.removeItem("cartId");
        }
  
        const res = await createCart(language);
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

  useEffect(() => {
    const refreshCartLanguage = async () => {
      if (cartId) {
        const res = await getCart(cartId, language);
        if (res?.cart) processCart(res.cart);
      }
    };
    refreshCartLanguage();
  }, [language, cartId]);

  const addItem = async (
    merchandiseId: string,
    quantity: number = 1,
    selectedImage?: { src: string; alt: string | null }
  ) => {
    if (!cartId) return;
    try {
      const attributes: { key: string; value: string }[] = [];
      if (selectedImage) {
        attributes.push({ key: "selectedImage", value: JSON.stringify(selectedImage) });
      }
      const res = await addToCart(cartId, merchandiseId, quantity, attributes, language);
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
      const res = await getCart(cartId, language);
      if (res?.cart) processCart(res.cart);
    }
  };

  const updateItem = async (
    lineId: string,
    quantity: number,
    attributes: { key: string; value: string }[] = []
  ) => {
    if (!cartId || quantity < 1) return;
    try {
      const res = await updateCartLine(cartId, lineId, quantity, attributes, language);
      if (res?.cartLinesUpdate?.cart) processCart(res.cartLinesUpdate.cart);
    } catch (err) {
      const res = await getCart(cartId, language);
      if (res?.cart) processCart(res.cart);
    }
  };

  return (
    <CartContext.Provider value={{ cartId, lines, checkoutUrl, addItem, removeItem, updateItem }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCartContext must be used within CartProvider");
  return context;
};
*/
"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import {
  createCart,
  addToCart,
  removeFromCart,
  updateCartLine,
  getCart,
} from "@/lib/shopify";
import { useLanguage } from "@/context/LanguageContext";

export interface CartLineFull {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    priceV2?: { amount: string; currencyCode: string };
    image?: { url: string; altText?: string | null };
    selectedOptions?: { name: string; value: string }[];
  };
  attributes: { key: string; value: string }[];
}

interface CartContextType {
  cartId: string | null;
  lines: CartLineFull[];
  checkoutUrl: string | null;
  addItem: (
    merchandiseId: string,
    quantity?: number,
    selectedImage?: { url: string; altText: string | null }
  ) => void;
  removeItem: (lineId: string) => void;
  updateItem: (lineId: string, quantity: number, attributes?: { key: string; value: string }[]) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartId, setCartId] = useState<string | null>(null);
  const [lines, setLines] = useState<CartLineFull[]>([]);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
  const { language } = useLanguage();

  const processCart = (cart: any) => {
    if (!cart || !cart.lines) {
      setLines([]);
      setCheckoutUrl(null);
      return;
    }
  
    setCheckoutUrl(cart.checkoutUrl || null);
    const edges = cart.lines.edges ?? [];

    const newLines: CartLineFull[] = edges.map((edge: any) => {
      const node = edge.node;
      const variant = node.merchandise;
      const product = variant.product;

      // 1. Формируем полное название (Товар + Вариант)
      const fullTitle = product?.title 
        ? `${product.title}${variant.title && variant.title !== 'Default Title' ? ` - ${variant.title}` : ''}` 
        : variant.title;

      // 2. Логика выбора изображения (Атрибут -> Фото варианта -> Фото товара)
      const selectedImageAttr = node.attributes?.find((a: any) => a.key === "selectedImage");
      let displayImage = variant.image || product?.featuredImage;
      
      if (selectedImageAttr?.value) {
        try {
          const parsed = JSON.parse(selectedImageAttr.value);
          if (parsed?.url) displayImage = parsed;
        } catch (e) {
          console.error("Error parsing image attribute:", e);
        }
      }
  
      return {
        id: node.id,
        quantity: node.quantity ?? 1,
        merchandise: {
          id: variant.id,
          title: fullTitle, 
          priceV2: variant.priceV2,
          image: displayImage,
          selectedOptions: variant.selectedOptions || [],
        },
        attributes: node.attributes ?? [],
      };
    });
  
    setLines(newLines);
  };

  useEffect(() => {
    const initCart = async () => {
      if (typeof window === "undefined") return;
      try {
        const savedCartId = localStorage.getItem("cartId");
        if (savedCartId) {
          const res = await getCart(savedCartId, language);
          if (res?.cart) {
            setCartId(savedCartId);
            processCart(res.cart);
            return;
          }
          localStorage.removeItem("cartId");
        }
  
        const res = await createCart(language);
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

  // Синхронизация при смене языка
  useEffect(() => {
    const refreshCartLanguage = async () => {
      if (cartId) {
        const res = await getCart(cartId, language);
        if (res?.cart) processCart(res.cart);
      }
    };
    refreshCartLanguage();
  }, [language, cartId]);

  const addItem = async (
    merchandiseId: string,
    quantity: number = 1,
    selectedImage?: { url: string; altText: string | null }
  ) => {
    if (!cartId) return;
    try {
      const attributes: { key: string; value: string }[] = [];
      if (selectedImage) {
        attributes.push({ key: "selectedImage", value: JSON.stringify(selectedImage) });
      }
      const res = await addToCart(cartId, merchandiseId, quantity, attributes, language);
      if (res?.cartLinesAdd?.cart) processCart(res.cartLinesAdd.cart);
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
      const res = await getCart(cartId, language);
      if (res?.cart) processCart(res.cart);
    }
  };

  const updateItem = async (
    lineId: string,
    quantity: number,
    attributes: { key: string; value: string }[] = []
  ) => {
    if (!cartId || quantity < 1) return;
    try {
      const res = await updateCartLine(cartId, lineId, quantity, attributes, language);
      if (res?.cartLinesUpdate?.cart) processCart(res.cartLinesUpdate.cart);
    } catch (err) {
      const res = await getCart(cartId, language);
      if (res?.cart) processCart(res.cart);
    }
  };

  return (
    <CartContext.Provider value={{ cartId, lines, checkoutUrl, addItem, removeItem, updateItem }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCartContext must be used within CartProvider");
  return context;
};