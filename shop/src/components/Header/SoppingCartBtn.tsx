"use client";
import { useState } from "react";
import Image from "next/image";
import styles from "./ShoppingCartBtn.module.scss";
import { useCartContext } from "@/context/CartContext";
import type { CartLineFull } from "@/hooks/useCart";

const ShoppingCart = () => {
  const [open, setOpen] = useState(false);
  const { lines, removeItem, updateItem, checkoutUrl } = useCartContext();

  const totalQty = (lines || []).reduce((sum, line) => sum + (line.quantity || 0), 0);

  // Общая сумма корзины
  const total = lines.reduce((acc, line) => {
    const price = Number(line.merchandise.priceV2?.amount || 0);
    return acc + price * line.quantity;
  }, 0);

  // Обновление количества товара (минимум 1)
  const handleUpdateItem = (lineId: string, quantity: number) => {
    if (quantity < 1) return; // не разрешаем меньше 1
    updateItem(lineId, quantity);
  };

  return (
    <>
      {/* Кнопка корзины */}
      <button
        onClick={() => setOpen(!open)}
        className={`${styles.shoppingButton} ${open ? styles.open : ""}`}
      >
        <Image src="/images/parcel.png" alt="shoppingCart" width={30} height={30} />

        {totalQty > 0 && (
          <span className={styles.counter} aria-label={`${totalQty} items in cart`}>
            {totalQty}
          </span>
        )}
      </button>



      {/* Фон при открытии */}
      {open && <div className={styles.overlay} onClick={() => setOpen(false)} />}

      {/* Боковая панель корзины */}
      <aside className={`${styles.sidebar} ${open ? styles.show : ""}`}>
        <h2>Корзина</h2>

        {/* Если корзина пуста */}
        {lines.length === 0 && <p>Корзина пуста</p>}

        {/* Список товаров */}
        <ul>
          {lines.map((line: CartLineFull) => {
            const { merchandise, quantity } = line;
            const price = Number(merchandise.priceV2?.amount || 0);

            return (
              <li key={line.id} className={styles.cartItem}>
                {/* Изображение товара */}
                <Image
                  src={merchandise.image?.url || "/images/placeholder.png"}
                  alt={merchandise.title || ""}
                  width={50}
                  height={50}
                />

                <div className={styles.itemInfo}>
                  {/* Название товара */}
                  <p className={styles.title}>{merchandise.title}</p>

                  {/* Опции (цвет, размер и т.д.) */}
                  {merchandise.selectedOptions && merchandise.selectedOptions.length > 0 && (
                    <p className={styles.options}>
                      {merchandise.selectedOptions.map((opt) => (
                        <span
                          key={opt.name}
                          className={opt.name.toLowerCase() === "size" ? styles.size : ""}
                        >
                          {opt.name}: {opt.value}{" "}
                        </span>
                      ))}
                    </p>
                  )}

                  {/* Цена */}
                  <p>
                    Цена: {price.toLocaleString()}{" "}
                    {merchandise.priceV2?.currencyCode || "UAH"}
                  </p>

                  {/* Количество */}
                  <div className={styles.quantity}>
                    <button onClick={() => handleUpdateItem(line.id, quantity - 1)}>-</button>
                    <span>{quantity}</span>
                    <button onClick={() => handleUpdateItem(line.id, quantity + 1)}>+</button>
                  </div>

                  {/* Удалить товар */}
                  <button className={styles.removeBtn} onClick={() => removeItem(line.id)}>
                    Удалить
                  </button>
                </div>
              </li>
            );
          })}
        </ul>

        {/* Общая сумма */}
        {lines.length > 0 && (
          <p className={styles.total}>
            Итого: {total.toLocaleString()}{" "}
            {lines[0]?.merchandise.priceV2?.currencyCode || "UAH"}
          </p>
        )}

        {/* Кнопка перехода к чекауту */}
        {lines.length > 0 && checkoutUrl && (
          <button
            className={styles.checkoutButton}
            onClick={() => window.open(checkoutUrl)}
          >
            Перейти к оформлению
          </button>
        )}
      </aside>
    </>
  );
};

export default ShoppingCart;
