"use client";
import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import styles from "./ShoppingCartBtn.module.scss";
import { useCartContext } from "@/context/CartContext";
import Link from "next/link";
import DefaultButton from "../defaultButton/defaultButton";
import Cookies from "js-cookie";
import { getCustomerAddresses, CustomerAddress } from "@/lib/shopify";
// 1. ИМПОРТИРУЕМ функцию для получения данных юзера
import { fetchCustomerFromCookies } from "@/lib/customer";

const ShoppingCart = () => {
  const [open, setOpen] = useState(false);
  const [isAddrOpen, setIsAddrOpen] = useState(false);
  const { lines, removeItem, updateItem } = useCartContext();
  const [isPaying, setIsPaying] = useState(false);
  
  const [addresses, setAddresses] = useState<CustomerAddress[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string>("");
  
  // 2. СОСТОЯНИЕ для хранения email юзера
  const [userEmail, setUserEmail] = useState<string>("guest@email.com");

  const token = Cookies.get("shopifyToken");

  const totalQty = lines.reduce((sum, line) => sum + (line.quantity || 0), 0);
  const total = lines.reduce((acc, line) => {
    const price = parseFloat(line.merchandise.priceV2?.amount ?? "0");
    const qty = line.quantity ?? 0;
    return acc + price * qty;
  }, 0);

  // 3. ЗАГРУЖАЕМ реальный email пользователя
  useEffect(() => {
    async function loadUserData() {
      if (!token) return;
      try {
        const customer = await fetchCustomerFromCookies();
        if (customer && (customer as any).email) {
          setUserEmail((customer as any).email);
        }
      } catch (err) {
        console.error("Failed to load user email:", err);
      }
    }
    loadUserData();
  }, [token]);

  // Загрузка сохраненных адресов
  useEffect(() => {
    async function loadAddresses() {
      if (!open || !token) return; 
      try {
        const data = await getCustomerAddresses(token);
        if (data?.customer?.addresses?.edges) {
          const customerAddresses = data.customer.addresses.edges.map((edge: any) => edge.node);
          setAddresses(customerAddresses);
          if (customerAddresses.length > 0 && !selectedAddressId) {
            setSelectedAddressId(customerAddresses[0].id);
          }
        }
      } catch (err) {
        console.error("Error loading addresses:", err);
      }
    }
    loadAddresses();
  }, [token, open]);

  const activeAddress = addresses.find(a => a.id === selectedAddressId);

  const isCheckoutDisabled = useMemo(() => {
    if (token && addresses.length > 0) {
      return !selectedAddressId;
    }
    return false;
  }, [token, addresses, selectedAddressId]);

  const handleUpdateItem = (lineId: string, quantity: number) => {
    if (quantity < 1) return;
    const currentLine = lines.find(line => line.id === lineId);
    const currentAttributes = currentLine?.attributes ?? [];
    updateItem(lineId, quantity, currentAttributes);
  };

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // ГЛАВНАЯ ФУНКЦИЯ
  const handleCheckoutRedirect = () => {
    if (lines.length === 0) return;

    if (token && addresses.length > 0 && !activeAddress) {
      alert("Please select a shipping address to continue.");
      return;
    }

    setIsPaying(true);

    const cartItems = lines.map(line => {
      const variantId = line.merchandise.id.split('/').pop();
      return `${variantId}:${line.quantity}`;
    }).join(',');

    const addressParams = activeAddress ? 
      `&checkout[shipping_address][first_name]=${encodeURIComponent(activeAddress.firstName || '')}` +
      `&checkout[shipping_address][last_name]=${encodeURIComponent(activeAddress.lastName || '')}` +
      `&checkout[shipping_address][address1]=${encodeURIComponent(activeAddress.address1 || '')}` +
      `&checkout[shipping_address][city]=${encodeURIComponent(activeAddress.city || '')}` +
      `&checkout[shipping_address][zip]=${encodeURIComponent(activeAddress.zip || '')}` +
      `&checkout[shipping_address][country]=${encodeURIComponent(activeAddress.country || 'Ukraine')}` 
      : '';

    const storeDomain = "firstpetproject.myshopify.com"; 
    
    // 4. ИСПОЛЬЗУЕМ динамический userEmail в ссылке
    const checkoutUrl = `https://${storeDomain}/cart/${cartItems}?checkout[email]=${encodeURIComponent(userEmail)}${addressParams}`;

    Cookies.remove("cartId");
    window.location.href = checkoutUrl;
  };

  return (
    <>
      {/* Отрисовка кнопки и корзины (без изменений) */}
      <button onClick={() => setOpen(!open)} className={`${styles.shoppingButton} ${open ? styles.open : ""}`}>
        <Image src="/images/parcel.png" alt="shoppingCart" width={30} height={30} />
        {totalQty > 0 && <span className={styles.counter}>{totalQty}</span>}
      </button>

      {open && <div className={styles.overlay} onClick={() => setOpen(false)} />}

      <aside className={`${styles.sidebar} ${open ? styles.show : ""} flex flex-col`}>
        {lines.length > 0 && <h2 className={styles.heading}>CART</h2>}

        <div className="flex-1 overflow-y-auto">
          {lines.length === 0 ? (
            <div className={styles.emptyWrapper}>
              <h2 className={styles.heading}>YOUR CART IS EMPTY</h2>
              <div className={styles.buttonWrapper}>
                <DefaultButton href="/products" label="CONTINUE SHOPPING" />
                <h2 className={styles.heading + " mt-8"}>HAVE AN ACCOUNT?</h2>
                <Link className={styles.link} href="account/login">
                  <span className={styles.text}>LOG IN TO CHECK OUT FASTER </span>
                </Link>
              </div>
            </div>
          ) : (
            <ul className={styles.itemsWrapper}>
              {lines.map(line => {
                const { merchandise, quantity } = line;
                const imageSrc = merchandise.image?.url || "/images/placeholder.png";
                const ProductResult = Number(merchandise.priceV2?.amount || 0) * (quantity ?? 0);

                return (
                  <li key={line.id} className={styles.cartItem}>
                    <Image className={styles.image} src={imageSrc} alt="" width={50} height={50} />
                    <div className={styles.itemInfo}>
                      <div className={styles.infoWrapper}>
                        <p className={styles.title}>{merchandise.title}</p>
                        <div className={styles.manipulateBtnsWrapper}>
                          <div className={styles.quantityWrapper}>
                            <button className={styles.quantityBtn} onClick={() => handleUpdateItem(line.id, quantity - 1)}>-</button>
                            <span className={styles.quantity}>{quantity}</span>
                            <button className={styles.quantityBtn} onClick={() => handleUpdateItem(line.id, quantity + 1)}>+</button>
                          </div>
                          <button className={styles.removeBtn} onClick={() => removeItem(line.id)}>
                            <Image src="/images/delete.png" alt="" width={20} height={20} />
                          </button>
                        </div>
                      </div>
                      <p className={styles.price}>{ProductResult.toLocaleString()} {merchandise.priceV2?.currencyCode}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {lines.length > 0 && (
          <div className="border-t border-gray-200 bg-white relative z-[99999] flex flex-col">
            {token && addresses.length > 0 && (
              <div className="border-b border-black bg-gray-50 relative z-[160]">
                <button 
                  type="button"
                  onClick={() => setIsAddrOpen(!isAddrOpen)}
                  className="w-full p-4 flex justify-between items-center bg-white hover:bg-gray-100 transition-all border-none cursor-pointer"
                >
                  <span className="text-[10px] font-bold uppercase tracking-widest text-black text-left">
                    {activeAddress 
                      ? `SHIP TO: ${activeAddress.city}, ${activeAddress.address1}` 
                      : "SELECT SHIPPING ADDRESS"}
                  </span>
                  <span className={`transition-transform duration-300 ${isAddrOpen ? "rotate-180" : ""}`}>▲</span>
                </button>
                <div className={`${isAddrOpen ? "block" : "hidden"} bg-white border-t border-gray-100`}>
                  <div className="max-h-48 overflow-y-auto">
                    {addresses.map((addr) => (
                      <label key={addr.id} className="flex items-start gap-3 p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50">
                        <input 
                          type="radio" 
                          name="cart_address"
                          className="mt-1 accent-black w-4 h-4"
                          checked={selectedAddressId === addr.id}
                          onChange={() => { setSelectedAddressId(addr.id); setIsAddrOpen(false); }}
                        />
                        <div className="flex flex-col text-[10px] uppercase text-black">
                          <span className="font-bold">{addr.firstName} {addr.lastName}</span>
                          <span className="text-gray-500 mt-1">{addr.city}, {addr.address1}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className={styles.checkoutWrapper}>
              <div className={styles.wrapperPrice}>
                <p className={styles.subtotal}>SUBTOTAL</p>
                <p className={styles.total}>
                  {total.toLocaleString()} {lines[0]?.merchandise.priceV2?.currencyCode || "UAH"}
                </p>
              </div>
              <div className={styles.defaultBtn}>
                <DefaultButton
                  onClick={handleCheckoutRedirect}
                  label={isPaying ? "REDIREKTING..." : "CHECKOUT"}
                  disabled={isCheckoutDisabled || isPaying}
                />
              </div>
              {isCheckoutDisabled && (
                <p className="text-center text-red-600 text-[8px] font-bold uppercase mt-2">
                  Please select a shipping address to continue
                </p>
              )}
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

export default ShoppingCart;