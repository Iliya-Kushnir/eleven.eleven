"use client";

import { useEffect, useState } from "react";
import { fetchCustomerFromCookies } from "@/lib/customer";
import styles from "./PrivatData.module.scss";
import Link from "next/link";
import Image from "next/image";
import Cookies from "js-cookie";
import { getCustomerAddresses, CustomerAddress } from "@/lib/shopify";

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
  const token = Cookies.get("shopifyToken");

  useEffect(() => {
    async function loadCustomer() {
      const data = await fetchCustomerFromCookies();
      if (data) setCustomer(data as Customer);
    }

    async function addressesCounter() {
      if (!token) return;
      try {
        const data = await getCustomerAddresses(token);
        const addresses: CustomerAddress[] = data.customer.addresses.edges.map(edge => edge.node);
        setAddressCount(addresses.length);
      } catch (err) {
        console.error("Something with address counter went wrong!", err);
      }
    }

    loadCustomer();
    addressesCounter();
  }, [token]);

  if (!customer) {
    return <p>User is not logged in</p>;
  }

  return (
    <div className={styles.dataWrapper}>
      <h2 className={styles.heading}>ACCOUNT</h2>
      <Link
        onClick={() => Cookies.remove("shopifyToken")}
        className={styles.linkWrapper}
        href="/"
      >
        <Image
          className={styles.icon}
          alt="account icon"
          src="/images/user.png"
          width={15}
          height={15}
        />
        <p className={styles.par}>LOG OUT</p>
      </Link>

      <h2 className={styles.heading}>ORDER HISTORY</h2>
      {customer.orders.edges.length === 0 ? (
        <p className={styles.paragraph}>YOU HAVEN&apos;T PLACED ANY ORDERS YET.</p>
      ) : (
        <ul>
          {customer.orders.edges.map(order => (
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
      <p className={styles.paragraph}>{customer.email}</p>

      <Link href="/adresses">
        <p className={styles.par}>View addresses ({addressCount})</p>
      </Link>
    </div>
  );
}
