"use client";

import { useEffect, useState } from "react";
import { fetchCustomerFromCookies } from "@/lib/customer";
import styles from "./PrivatData.module.scss";
import Link from "next/link";
import Image from "next/image";
import Cookies from "js-cookie";
import { getCustomerAddresses, CustomerAddress } from "@/lib/shopify";
import { useRouter } from "next/navigation";

interface OrderNode {
  id: string;
  orderNumber: string;
  totalPriceV2: {
    amount: string;
    currencyCode: string;
  };
}

interface OrderEdge {
  node: OrderNode;
}

interface Customer {
  firstName: string;
  lastName: string;
  email: string;
  orders: {
    edges: OrderEdge[];
  };
}

export default function CustomerInfo() {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [addressCount, setAddressCount] = useState<number>(0);
  const [loading, setLoading] = useState(true); // Добавляем стейт загрузки
  const router = useRouter();

  useEffect(() => {
    async function loadData() {
      const token = Cookies.get("shopifyToken");
      
      // Если токена нет, сразу прекращаем загрузку
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        // Загружаем данные пользователя
        const data = await fetchCustomerFromCookies();
        if (data) {
          setCustomer(data as Customer);
          
          // Параллельно загружаем количество адресов
          const addressData = await getCustomerAddresses(token);
          const addresses = addressData.customer.addresses.edges.map((edge: any) => edge.node);
          setAddressCount(addresses.length);
        }
      } catch (err) {
        console.error("Error loading account data:", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  // Функция выхода
  const handleLogOut = () => {
    Cookies.remove("shopifyToken");
    localStorage.removeItem("customerAccessToken"); // Очищаем для корзины
    router.push("/");
    router.refresh(); // Полное обновление роутов
  };

  if (loading) return <p className={styles.paragraph}>LOADING...</p>;

  if (!customer) {
    return (
      <div className={styles.dataWrapper}>
        <p className={styles.paragraph}>USER IS NOT LOGGED IN</p>
        <Link href="/account/login" className={styles.par}>GO TO LOGIN</Link>
      </div>
    );
  }

  return (
    <div className={styles.dataWrapper}>
      <h2 className={styles.heading}>ACCOUNT</h2>
      
      {/* Кнопка выхода через функцию */}
      <div onClick={handleLogOut} className={styles.linkWrapper} style={{ cursor: 'pointer' }}>
        <Image
          className={styles.icon}
          alt="account icon"
          src="/images/user.png"
          width={15}
          height={15}
        />
        <p className={styles.par}>LOG OUT</p>
      </div>

      {/* ... (остальной JSX без изменений) */}
      <h2 className={styles.heading}>ORDER HISTORY</h2>
      {customer.orders.edges.length === 0 ? (
        <p className={styles.paragraph}>YOU HAVEN&apos;T PLACED ANY ORDERS YET.</p>
      ) : (
        <ul>
          {customer.orders.edges.map(order => (
            <li className={styles.paragraph} key={order.node.id}>
              ЗАКАЗ №{order.node.orderNumber} — {order.node.totalPriceV2.amount} {order.node.totalPriceV2.currencyCode}
            </li>
          ))}
        </ul>
      )}

      <h2 className={styles.heading}>ACCOUNT DETAILS</h2>
      <p className={styles.paragraph}>{customer.firstName} {customer.lastName}</p>
      <p className={styles.paragraph}>{customer.email}</p>

      <Link href="/adresses">
        <p className={styles.par}>VIEW ADDRESSES ({addressCount})</p>
      </Link>
    </div>
  );
}