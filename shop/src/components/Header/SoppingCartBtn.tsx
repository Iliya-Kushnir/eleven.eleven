
"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./ShoppingCartBtn.module.scss";
import { useCartContext } from "@/context/CartContext";
import DefaultButton from "../defaultButton/defaultButton";

const ShoppingCart = () => {
  const [open, setOpen] = useState(false);
  const { lines, removeItem, updateItem, checkoutUrl } = useCartContext();

  

  console.log("ALL PRODUCTS:", lines)

  const totalQty = lines.reduce((sum, line) => sum + (line.quantity || 0), 0);

  const total = lines.reduce((acc, line) => {
    const price = parseFloat(line.merchandise.priceV2?.amount ?? "0");
    const qty = line.quantity ?? 0;
    return acc + price * qty;
  }, 0);

  const handleUpdateItem = (lineId: string, quantity: number) => {
    if (quantity < 1) return;
    updateItem(lineId, quantity);
  };

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className={`${styles.shoppingButton} ${open ? styles.open : ""}`}
      >
        <Image src="/images/parcel.png" alt="shoppingCart" width={30} height={30} />
        {totalQty > 0 && <span className={styles.counter}>{totalQty}</span>}
      </button>

      {open && <div className={styles.overlay} onClick={() => setOpen(false)} />}

      <aside className={`${styles.sidebar} ${open ? styles.show : ""}`}>
        <h2 className={styles.heading}>CART</h2>

        {lines.length === 0 && <p>Корзина пуста</p>}

        <ul className={styles.itemsWrapper}>
        {lines.map(line => {
        const { merchandise, quantity } = line;

        console.log("EACH PRODUCT:", line)

  const selectedImageAttr = line.attributes?.find(attr => attr.key === "selectedImage");
  let customImage: { src: string; alt?: string } | null = null;

  if (selectedImageAttr) {
    try {
      customImage = JSON.parse(selectedImageAttr.value);
    } catch (e) {
      console.error("Ошибка парсинга selectedImage:", e);
    }
  }

  // 2. Берём кастомное изображение или fallback
  const imageSrc = customImage?.src || merchandise.image?.url || "/images/placeholder.png";
  const imageAlt = customImage?.alt || merchandise.image?.altText || merchandise.title || "";

  const ProductResult = Number(merchandise.priceV2?.amount || 0) * (quantity ?? 0);
  console.log(merchandise.image?.altText)
  const alt = merchandise.image?.altText
  const formatedAlt = alt?.split((" - ")[0])
  console.log(formatedAlt)

  //const title = merchandise.image?.alt.split(" - ")[0] || " ";

  //console.log("title", title)

  return (
    <li key={line.id} className={styles.cartItem}>
      <Image
        className={styles.image}
        src={imageSrc}
        alt={imageAlt}
        width={50}
        height={50}
      />
      <div className={styles.itemInfo}>
        <div className={styles.infoWrapper}>
        <p className={styles.title}>
          {(merchandise.image?.altText || merchandise.title || "")
            .split(" - ")[0]}
        </p>
          <p className={styles.size}>
          {(merchandise.image?.altText || merchandise.title || "")
            .split(" - ")[0]}
          </p>

          {merchandise.selectedOptions && (
            <p className={styles.options}>
              {merchandise.selectedOptions.map(opt => (
                <span
                  key={opt.name}
                  className={opt.name.toLowerCase() === "size" ? styles.size : ""}
                >
                  {opt.name}: {opt.value}{" "}
                </span>
              ))}
            </p>
          )}

          <div className={styles.manipulateBtnsWrapper}>
            <div className={styles.quantityWrapper}>
              <button
                className={styles.quantityBtn}
                onClick={() => handleUpdateItem(line.id, quantity - 1)}
              >
                -
              </button>
              <span className={styles.quantity}>{quantity}</span>
              <button
                className={styles.quantityBtn}
                onClick={() => handleUpdateItem(line.id, quantity + 1)}
              >
                +
              </button>
            </div>
            <button className={styles.removeBtn} onClick={() => removeItem(line.id)}>
              <Image className={styles.img} src="/images/delete.png" alt="" width={20} height={20} />
            </button>
          </div>
        </div>
        <p className={styles.price}>
          {ProductResult.toLocaleString()} {merchandise.priceV2?.currencyCode || "UAH"}
        </p>
      </div>
    </li>
  );
})}

        </ul>

        <div className={styles.checkoutWrapper}>
          <div className={styles.wrapperPrice}>
            <p className={styles.subtotal}>SUBTOTAL</p>
            {lines.length > 0 && (
              <p className={styles.total}>
                {!isNaN(total) ? total.toLocaleString() : "0"} {lines[0]?.merchandise.priceV2?.currencyCode || "UAH"}
              </p>
            )}
          </div>
          <div className={styles.defaultBtn}>
            {lines.length > 0 && checkoutUrl && (
              <DefaultButton onClick={() => window.open(checkoutUrl, "_blank")} label="checkout" />
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default ShoppingCart;


