"use client";

import { useEffect, useState } from "react";
import { fetchCustomerFromCookies } from "@/lib/customer";
import styles from "./PrivatData.module.scss";
import Link from "next/link";
import Image from "next/image";
import Cookies from "js-cookie";
import { getCustomerAddresses, CustomerAddress } from "@/lib/shopify";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

// Интерфейсы остаются те же, убедись, что они соответствуют твоему GraphQL запросу
interface OrderNode {
  id: string;
  orderNumber: string;
  processedAt: string;
  financialStatus: string;
  fulfillmentStatus: string;
  totalPriceV2: { amount: string; currencyCode: string; };
  lineItems: {
    edges: { node: { title: string; quantity: number; variant: { image: { url: string } | null } } }[];
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
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { t } = useLanguage();

  useEffect(() => {
    async function loadData() {
      const token = Cookies.get("shopifyToken");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const data = await fetchCustomerFromCookies();
        if (data) {
          setCustomer(data as Customer);
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

  const handleLogOut = () => {
    Cookies.remove("shopifyToken");
    localStorage.removeItem("customerAccessToken");
    router.push("/");
    router.refresh();
  };

  if (loading) return <p className={styles.paragraph}>{t('common.cart.loading')}</p>;

  if (!customer) {
    return (
      <div className={styles.dataWrapper}>
        <p className={styles.paragraph}>{t('account.no_login')}</p>
        <Link href="/account/login" className={styles.par}>{t('account.go_to_login')}</Link>
      </div>
    );
  }

  return (
    <div className={styles.dataWrapper}>
      <h2 className={styles.heading}>{t('account.title')}</h2>
      
      <div onClick={handleLogOut} className={styles.linkWrapper} style={{ cursor: 'pointer', marginBottom: '20px' }}>
        <Image className={styles.icon} alt="account icon" src="/images/user.png" width={15} height={15} />
        <p className={styles.par}>{t('account.logout')}</p>
      </div>

      <h2 className={styles.heading}>{t('account.order_history')}</h2>
      
      {customer.orders.edges.length === 0 ? (
        <p className={styles.paragraph}>{t('account.no_orders')}</p>
      ) : (
        <div className="flex flex-col gap-6 mt-4">
          {customer.orders.edges.map(edge => {
            const order = edge.node;
            return (
              <div key={order.id} className="border border-black p-4 md:p-6 bg-white shadow-sm">
                {/* Шапка карточки: Номер и Дата */}
                <div className="flex justify-between items-start border-b border-gray-100 pb-4 mb-4">
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">
                      {new Date(order.processedAt).toLocaleDateString()}
                    </p>
                    <h3 className="text-sm font-bold uppercase tracking-tighter">
                      {t('account.order_number')} #{order.orderNumber}
                    </h3>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    {/* Статус оплаты */}
                    <span className={`text-[8px] px-2 py-1 font-bold uppercase tracking-widest ${
                      order.financialStatus === 'PAID' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {order.financialStatus}
                    </span>
                    {/* Статус доставки */}
                    <span className="text-[8px] px-2 py-1 bg-gray-100 text-gray-600 font-bold uppercase tracking-widest">
                      {order.fulfillmentStatus}
                    </span>
                  </div>
                </div>

                {/* Список товаров с фото */}
                <div className="flex flex-col gap-4 mb-6">
                  {order.lineItems.edges.map((item, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="relative w-16 h-16 border border-gray-100 bg-gray-50 overflow-hidden">
                        <Image 
                          src={item.node.variant?.image?.url || "/images/placeholder.png"} 
                          alt={item.node.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-[10px] font-bold uppercase leading-tight">{item.node.title}</p>
                        <p className="text-[9px] text-gray-500 uppercase mt-1">QTY: {item.node.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Итоговая сумма */}
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Total Amount</p>
                  <p className="text-sm font-black tracking-tighter">
                    {Number(order.totalPriceV2.amount).toLocaleString()} {order.totalPriceV2.currencyCode}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-12">
        <h2 className={styles.heading}>{t('account.account_details')}</h2>
        <p className={styles.paragraph}>{customer.firstName} {customer.lastName}</p>
        <p className={styles.paragraph}>{customer.email}</p>

        <Link href="/adresses">
          <p className={styles.par + " mt-4 inline-block"}>{t('account.addresses')} ({addressCount})</p>
        </Link>
      </div>
    </div>
  );
}