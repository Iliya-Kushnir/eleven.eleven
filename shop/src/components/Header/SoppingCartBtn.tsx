"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./ShoppingCartBtn.module.scss";
import { useCartContext } from "@/context/CartContext";
import Link from "next/link";
import DefaultButton from "../defaultButton/defaultButton";
import { useRouter } from "next/navigation";

const ShoppingCart = () => {
  const [open, setOpen] = useState(false);
  const { lines, removeItem, updateItem, checkoutUrl } = useCartContext();
  const [isPaying, setIsPaying] = useState(false);
  const router = useRouter();
  

  const totalQty = lines.reduce((sum, line) => sum + (line.quantity || 0), 0);

  const total = lines.reduce((acc, line) => {
    const price = parseFloat(line.merchandise.priceV2?.amount ?? "0");
    const qty = line.quantity ?? 0;
    return acc + price * qty;
  }, 0);

  const handleUpdateItem = (lineId: string, quantity: number) => {
    const currentLine = lines.find(line => line.id === lineId);
    const currentAttributes = currentLine?.attributes ?? [];
    updateItem(lineId, quantity, currentAttributes);
  };

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
  console.log("LINE:", lines)


  const handleFondyCheckout = async () => {
    setIsPaying(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: total,
          orderId: `ORD-${Date.now()}`,
          email: "customer@email.com",
          address: { city: "", postOffice: "" }
        })
      });
  
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Server error");
      }
  
      const data = await res.json();
  
      // ГЛАВНОЕ ИСПРАВЛЕНИЕ: Проверяем наличие URL перед переходом
      if (data.checkout_url && data.checkout_url.startsWith('http')) {
        window.location.assign(data.checkout_url); 
      } else {
        console.error("Invalid URL received:", data.checkout_url);
        throw new Error("Invalid payment URL");
      }
    } catch (err: unknown) {
      // Типизируем ошибку: проверяем, является ли err экземпляром встроенного класса Error
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
      
      console.error("Full Checkout Error:", err);
      alert(`Ошибка: ${errorMessage}`);
    } finally {
      setIsPaying(false);
    }
  };
  
  console.log(typeof(total), total);

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
        {lines.length > 0 ? <h2 className={styles.heading}>CART</h2> : (<> </>)}
        

       
        {lines.length === 0 ? (
          <div className={styles.emptyWrapper}>
            <h2 className={styles.heading}>YOUR CART IS EMPTY</h2>
            <div className={styles.buttonWrapper}>
              <DefaultButton href="/products" label="CONTINUE SHOPPING" />
            <div/>
              <h2 className={styles.heading}>HAVE AN ACCOUNT?</h2>
              <div className={styles.textWrapper}>
                <Link className={styles.link} href="account/login">
                  <span className={styles.text}>LOG IN TO CHECK OUT FASTER </span>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <>
            
            <ul className={styles.itemsWrapper}>
              {lines.map(line => {
                const { merchandise, quantity } = line;

                const selectedImageAttr = Array.isArray(line.attributes)
                  ? line.attributes.find(attr => attr.key === "selectedImage")
                  : null;

                let customImage: { src: string; alt?: string } | null = null;
                if (selectedImageAttr) {
                  try {
                    customImage = JSON.parse(selectedImageAttr.value);
                  } catch (e) {
                    console.error("Ошибка парсинга selectedImage:", e);
                  }
                }

                const imageSrc =
                  customImage?.src ||
                  merchandise.image?.url ||
                  "/images/placeholder.png";
                const imageAlt =
                  customImage?.alt ||
                  merchandise.image?.altText ||
                  merchandise.title ||
                  "";

                const ProductResult =
                  Number(merchandise.priceV2?.amount || 0) * (quantity ?? 0);

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
                        <div className={styles.titleWrapper} style={{ display: 'flex', flexDirection: 'column' }}>
                          {(() => {
                            const text = merchandise.image?.altText || merchandise.title || "";
                            const parts = text.split("/").map(part => part.trim());
                            return parts.map((part, index) => (
                              <p
                                key={index}
                                className={styles.title} 
                              >
                                {part}
                              </p>
                            ));
                          })()}
                        </div>







                        <div className={styles.manipulateBtnsWrapper}>
                          <div className={styles.quantityWrapper}>
                            <button
                              className={styles.quantityBtn}
                              onClick={() =>
                                handleUpdateItem(line.id, quantity - 1)
                              }
                            >
                              -
                            </button>
                            <span className={styles.quantity}>{quantity}</span>
                            <button
                              className={styles.quantityBtn}
                              onClick={() =>
                                handleUpdateItem(line.id, quantity + 1)
                              }
                            >
                              +
                            </button>
                          </div>
                          <button
                            className={styles.removeBtn}
                            onClick={() => removeItem(line.id)}
                          >
                            <Image
                              className={styles.img}
                              src="/images/delete.png"
                              alt=""
                              width={20}
                              height={20}
                            />
                          </button>
                        </div>
                      </div>
                      <p className={styles.price}>
                        {ProductResult.toLocaleString()}{" "}
                        {merchandise.priceV2?.currencyCode || "UAH"}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>

           
            <div className={styles.checkoutWrapper}>
              <div className={styles.wrapperPrice}>
                <p className={styles.subtotal}>SUBTOTAL</p>
                <p className={styles.total}>
                  {!isNaN(total)
                    ? total.toLocaleString()
                    : "0"}{" "}
                  {lines[0]?.merchandise.priceV2?.currencyCode || "UAH"}
                </p>
              </div>
              <div className={styles.defaultBtn}>
                {checkoutUrl && (
                  <DefaultButton
                    onClick={handleFondyCheckout}
                    label={isPaying ? "LOADING..." : "CHECKOUT"}
                    disabled={isPaying} // Желательно добавить в DefaultButton пропс disabled
                  />
                )}
              </div>
            </div>
          </>
        )}
      </aside>
    </>
  );
};

export default ShoppingCart;
