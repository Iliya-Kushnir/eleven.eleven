"use client";
import { useState } from "react";
import styles from "./ShoppingCartBtn.module.scss";
import Image from "next/image";
import { useCart } from "@/hooks/useCart";

const ShoppingCart = () => {
  const [open, setOpen] = useState(false);
  const { lines, addItem, removeItem, updateItem } = useCart();

  // обновление количества
  const handleUpdateItem = (lineId: string, quantity: number) => {
    if (quantity <= 0) return removeItem(lineId);
    updateItem(lineId, quantity);
  };

  const total = lines.reduce((acc, line) => {
    const price = Number(line.merchandise.priceV2?.amount || 0);
    return acc + price * line.quantity;
  }, 0);

  return (
    <>
      <button onClick={() => setOpen(!open)} className={`${styles.shoppingButton} ${open ? styles.open : ""}`}>
        <Image src="/images/parcel.png" alt="shoppingCart" width={30} height={30} />
      </button>

      {open && <div className={styles.overlay} onClick={() => setOpen(false)} />}

      <aside className={`${styles.sidebar} ${open ? styles.show : ""}`}>
        <h2>Корзина</h2>
        {lines.length === 0 && <p>Корзина пуста</p>}
        <ul>
          {lines.map(line => (
            <li key={line.id} className={styles.cartItem}>
              <Image
                src={line.merchandise.image?.url || "/images/placeholder.png"}
                alt={line.merchandise.title || ""}
                width={50}
                height={50}
              />
              <div className={styles.itemInfo}>
                <p>{line.merchandise.title}</p>
                <p>Цена: ${line.merchandise.priceV2?.amount || "0"}</p>
                <div className={styles.quantity}>
                  <button onClick={() => handleUpdateItem(line.id, line.quantity - 1)}>-</button>
                  <span>{line.quantity}</span>
                  <button onClick={() => handleUpdateItem(line.id, line.quantity + 1)}>+</button>
                </div>
                <button onClick={() => removeItem(line.id)}>Удалить</button>
              </div>
            </li>
          ))}
        </ul>
        <p className={styles.total}>Итого: ${total.toFixed(2)}</p>
        <button
          className={styles.checkoutButton}
          onClick={() => window.open(lines.length ? lines[0].merchandise.id : "#")}
        >
          Перейти к оформлению
        </button>

        {/* пример добавления тестового товара */}
        <button onClick={() => addItem("gid://shopify/ProductVariant/12345", 1)}>
          Добавить тестовый товар
        </button>
      </aside>
    </>
  );
};

export default ShoppingCart;
