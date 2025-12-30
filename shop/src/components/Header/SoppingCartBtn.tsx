"use client";
import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import styles from "./ShoppingCartBtn.module.scss";
import { useCartContext } from "@/context/CartContext";
import Link from "next/link";
import DefaultButton from "../defaultButton/defaultButton";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { getCustomerAddresses, CustomerAddress } from "@/lib/shopify";

const ShoppingCart = () => {
  const [open, setOpen] = useState(false);
  const [isAddrOpen, setIsAddrOpen] = useState(false); // Состояние аккордеона
  const { lines, removeItem, updateItem, checkoutUrl } = useCartContext();
  const [isPaying, setIsPaying] = useState(false);
  
  const [addresses, setAddresses] = useState<CustomerAddress[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string>("");

  const token = Cookies.get("shopifyToken") 

  const totalQty = lines.reduce((sum, line) => sum + (line.quantity || 0), 0);

  const total = lines.reduce((acc, line) => {
    const price = parseFloat(line.merchandise.priceV2?.amount ?? "0");
    const qty = line.quantity ?? 0;
    return acc + price * qty;
  }, 0);

  // Логика загрузки адресов
  useEffect(() => {
    async function loadAddresses() {
      if (!open || !token) return; 
      try {
        const data = await getCustomerAddresses(token);
        if (data?.customer?.addresses?.edges) {
          const customerAddresses = data.customer.addresses.edges.map((edge: any) => edge.node);
          setAddresses(customerAddresses);
          
          // Устанавливаем адрес только ОДИН РАЗ при первой загрузке, 
          // если он еще не был выбран вручную
          if (customerAddresses.length > 0 && !selectedAddressId) {
            setSelectedAddressId(customerAddresses[0].id);
          }
        }
      } catch (err) {
        console.error("Error loading addresses:", err);
      }
    }
    loadAddresses();
    // Оставляем только token и open. 
    // selectedAddressId здесь БЫТЬ НЕ ДОЛЖНО.
  }, [token, open]); // Добавлен selectedAddressId в зависимости

  // Проверка блокировки кнопки
  const isCheckoutDisabled = useMemo(() => {
    if (token && addresses.length > 0) {
      console.log("Selected Address ID:", addresses);
      return !selectedAddressId;
    }
    return false;
  }, [token, addresses, selectedAddressId]);

  const activeAddress = addresses.find(a => a.id === selectedAddressId);
  console.log("Active Address:", activeAddress);

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

  const handleFondyCheckout = async () => {
    if (lines.length === 0) return;

    if (token && addresses.length > 0 && !activeAddress) {
      alert("Please select a shipping address to continue.");
      return;
    }

    setIsPaying(true);
  
    try {
      const cartItems = lines.map(line => ({
        merchandiseId: line.merchandise.id,
        quantity: line.quantity
      }));
  
      const merchantData = {
        lines: cartItems,
        customer: { email: "customer@email.com" }, 
        address: activeAddress ? {
          firstName: activeAddress.firstName || "",
          lastName: activeAddress.lastName || "",
          address1: activeAddress.address1 || "",
          city: activeAddress.city || "",
          zip: activeAddress.zip || "",
          country: activeAddress.country || "Ukraine"
        } : null 
      };
  
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: Math.round(total * 100), 
          orderId: `MY-SHOP-TEST-${Date.now()}`,
          email: "customer@email.com",
          currency: lines[0]?.merchandise.priceV2?.currencyCode || "UAH",
          address: merchantData.address,
          merchant_data: JSON.stringify(merchantData)
        })
      });

      // Читаем ответ как текст для отладки
      const text = await res.text();
      console.log("Raw Server Response:", text);

      try {
        const data = JSON.parse(text);
        
        // ПРОВЕРКА: Берем только строку checkout_url
        if (data && data.checkout_url && typeof data.checkout_url === 'string') {
          console.log("Redirecting to URL:", data.checkout_url);
          window.location.href = data.checkout_url; // .href надежнее для редиректа
        } else if (data && data.error) {
          alert(`Fondy Error: ${data.error}`);
        } else {
          console.error("Unexpected JSON format:", data);
          alert("Server error: No checkout URL found in response.");
        }
      } catch (parseError) {
        console.error("JSON Parse Error. Server sent:", text);
        alert("Server returned invalid data. Check VS Code terminal.");
      }
      
    } catch (err) {
      console.error("Checkout Error:", err);
      alert("Network error. Please check your connection.");
    } finally {
      setIsPaying(false);
    }
  };

  return (
    <>
      <button onClick={() => setOpen(!open)} className={`${styles.shoppingButton} ${open ? styles.open : ""}`}>
        <Image src="/images/parcel.png" alt="shoppingCart" width={30} height={30} />
        {totalQty > 0 && <span className={styles.counter}>{totalQty}</span>}
      </button>

      {open && <div className={styles.overlay} onClick={() => setOpen(false)} />}

      <aside className={`${styles.sidebar} ${open ? styles.show : ""} flex flex-col`}>
        {lines.length > 0 ? <h2 className={styles.heading}>CART</h2> : <></>}

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
                const selectedImageAttr = Array.isArray(line.attributes) ? line.attributes.find(attr => attr.key === "selectedImage") : null;
                let customImage = null;
                if (selectedImageAttr) { try { customImage = JSON.parse(selectedImageAttr.value); } catch (e) {} }

                const imageSrc = customImage?.src || merchandise.image?.url || "/images/placeholder.png";
                const ProductResult = Number(merchandise.priceV2?.amount || 0) * (quantity ?? 0);

                return (
                  <li key={line.id} className={styles.cartItem}>
                    <Image className={styles.image} src={imageSrc} alt="" width={50} height={50} />
                    <div className={styles.itemInfo}>
                      <div className={styles.infoWrapper}>
                        <div className={styles.titleWrapper} style={{ display: 'flex', flexDirection: 'column' }}>
                          {String(merchandise.image?.altText || merchandise.title || "").split("/").map((part, i) => (
                            <p key={i} className={styles.title}>{part.trim()}</p>
                          ))}
                        </div>
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
          <div className="border-t border-gray-200 bg-white relative z-[99999] flex flex-col transition-[1s]">
            
            {/* Блок выбора адреса (Аккордеон) */}
            {token && addresses.length > 0 && (
              
              <div className="border-b border-black bg-gray-50 relative z-[160]">
                <button 
                  type="button"
                  onClick={() => setIsAddrOpen(!isAddrOpen)}
                  className="w-full p-4 flex justify-between items-center bg-white hover:bg-gray-100 transition-all duration-300 border-none outline-none cursor-pointer"
                >
                  <span className="text-[10px] font-bold uppercase tracking-widest text-black text-left">
                    {activeAddress 
                    
                      ? `SHIP TO: ${activeAddress.city}, ${activeAddress.address1}, ${activeAddress.zip}` 
                      : "SELECT SHIPPING ADDRESS" 
                      
                      }
                  </span>
                  <span className={`text-black transform transition-transform duration-300 ${isAddrOpen ? "rotate-180" : ""}`}>
                    ▲
                  </span>
                </button>

                {/* Список адресов */}
                <div className={`${isAddrOpen ? "block" : "hidden"} bg-white border-t border-gray-100`}>
                  <div className="max-h-48 overflow-y-auto">
                    {addresses.map((addr) => (
                      <label 
                        key={addr.id} 
                        className="flex items-start gap-3 p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors"
                      >
                        <input 
                          type="radio" 
                          name="cart_address"
                          className="mt-1 accent-black w-4 h-4 shrink-0"
                          checked={selectedAddressId === addr.id}
                          onChange={() => { 
                            setSelectedAddressId(addr.id); 
                            setIsAddrOpen(false); 
                          }}
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

            {/* Твой существующий блок цены и кнопка */}
            <div className={styles.checkoutWrapper}>
              <div className={styles.wrapperPrice}>
                <p className={styles.subtotal}>SUBTOTAL</p>
                <p className={styles.total}>
                  {!isNaN(total) ? total.toLocaleString() : "0"} {lines[0]?.merchandise.priceV2?.currencyCode || "UAH"}
                </p>
              </div>
              
              <div className={styles.defaultBtn}>
                <DefaultButton
                  onClick={handleFondyCheckout}
                  label={isPaying ? "LOADING..." : "CHECKOUT"}
                  disabled={isCheckoutDisabled || isPaying}
                />
              </div>

              {isCheckoutDisabled && (
                <p className="text-center text-red-600 text-[8px] font-bold uppercase mt-2 tracking-widest">
                  Please select a shipping address to continue
                </p>
              )}
            </div>
          </div>
        )}
        {/* --- КОНЕЦ ВСТАВКИ --- */}
      </aside>
    </>
  );
};

export default ShoppingCart;