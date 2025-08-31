// components/CustomerInfo.tsx
"use client";
import { useEffect, useState } from "react";
import { fetchCustomerFromCookies } from "@/lib/customer";
import styles from "./PrivatData.module.scss"

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

  useEffect(() => {
    async function loadCustomer() {
      const data = await fetchCustomerFromCookies();
      setCustomer(data as Customer);
    }
    loadCustomer();
  }, []);

  if (!customer) {
    return <p>Пользователь не залогинен</p>;
  }

  return (
    <div className={styles.dataWrapper}>
      <h2 className={styles.heading}>ACCOUNT</h2>
        <div className={styles.link}>
            
        </div>

        <h2 className={styles.heading}>ORDER HISTORY</h2>
      {customer.orders.edges.length === 0 ? (
        <p className={styles.paragraph}>YOU HAVEN&apos;T PLACED ANY ORDERS YET.</p>
      ) : (
        <ul>
          {customer.orders.edges.map((order) => (
            
            <li className={styles.paragraph} key={order.node.id}>
              Заказ №{order.node.orderNumber} — {order.node.totalPriceV2.amount}{" "}
              {order.node.totalPriceV2.currencyCode}
            </li>
          ))}
        </ul>
      )}

      <h2 className={styles.heading}>ACCOUNT DETAILS</h2>
      <p className={styles.paragraph}>{customer.firstName}</p>
      <p className={styles.paragraph}>{customer.lastName}</p>
      <p className={styles.paragraph}> {customer.email}</p>
    </div>
  );
}
