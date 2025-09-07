"use client";
import { useState } from "react";
import Image from "next/image";
import styles from "./ShoppingCartBtn.module.scss";
import { useCart } from "@/hooks/useCart";

const ShoppingCart = () => {
  const [open, setOpen] = useState(false);
  const { lines, addItem, removeItem, updateItem } = useCart();

  // Обновление количества товара
  const handleUpdateItem = (lineId: string, quantity: number) => {
    if (quantity <= 0) return removeItem(lineId);
    updateItem(lineId, quantity);
  };

  // Общая сумма корзины
  const total = lines.reduce((acc, line) => {
    const price = Number(line.merchandise.priceV2?.amount || 0);
    return acc + price * line.quantity;
  }, 0);

  return (
    <>
      {/* Кнопка корзины */}
      <button
        onClick={() => setOpen(!open)}
        className={`${styles.shoppingButton} ${open ? styles.open : ""}`}
      >
        <Image src="/images/parcel.png" alt="shoppingCart" width={30} height={30} />
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
          {lines.map((line) => {
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
                  <p>{merchandise.title}</p>



                  {/* Опции (например размер, цвет) */}


                  {/* Цена */}
                  <p>Цена: ${price.toFixed(2)}</p>

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
        <p className={styles.total}>Итого: ${total.toFixed(2)}</p>

        {/* Кнопка перехода к чекауту */}
        <button
          className={styles.checkoutButton}
          onClick={() => window.open(lines.length ? lines[0].merchandise.id : "#")}
        >
          Перейти к оформлению
        </button>

        {/* Добавление тестового товара */}
        <button
          className={styles.addTestButton}
          onClick={() => addItem("gid://shopify/ProductVariant/12345", 1)}
        >
          Добавить тестовый товар
        </button>
      </aside>
    </>
  );
};

export default ShoppingCart;



/*

                  {merchandise.selectedOptions?.length > 0 && (
                    <p className={styles.options}>
                      {merchandise.selectedOptions.map((opt) => (
                        <span key={opt.name}>
                          {opt.name}: {opt.value}{" "}
                        </span>
                      ))}
                    </p>
                  )}

*/