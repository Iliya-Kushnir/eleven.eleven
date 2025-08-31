/*
"use client";
import { createContext, useContext, ReactNode } from "react";
import { useCart as useCartInternal } from "@/hooks/useCart";

const CartContext = createContext<unknown>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const cart = useCartInternal();
  return <CartContext.Provider value={cart}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
*/