"use client"
import { useState, useEffect } from "react";
import FeedItem from "./feedItem/feedItem";
import { getCustomerAddresses, deleteCustomerAddress } from "@/lib/shopify";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import styles from "./addressesFeed.module.scss";

interface CustomerAddress {
  id: string;
  firstName?: string;
  lastName?: string;
  address1: string;
  address2?: string;
  city: string;
  province?: string;
  country: string;
  zip: string;
  phone?: string;
}

const AddressesFeed = () => {
  const [address, setIsAddresses] = useState<CustomerAddress[]>([]);
  const token = Cookies.get("shopifyToken");

  useEffect(() => {
    async function loadAddresses() {
      try {
        const data = await getCustomerAddresses(token || "");
        const customerAddresses = data.customer.addresses.edges.map(
          (edge) => edge.node
        );
        setIsAddresses(customerAddresses);
      } catch (err) {
        console.error("Error loading addresses:", err);
      }
    }
    loadAddresses();
  }, [token]);

  const confirmDelete = (id: string) => {
    toast(
      ({ closeToast }) => (
        <div>
          <p>❓ Удалить этот адрес?</p>
          <div className="flex gap-2 mt-2">
            <button
              onClick={async () => {
                try {
                  if (!token) return;
                  await deleteCustomerAddress(token, id);
                  setIsAddresses((prev) =>
                    prev.filter((addr) => addr.id !== id)
                  );
                  toast.success("✅ Адрес удалён");
                } catch (err) {
                  console.error("Error deleting address:", err);
                  toast.error("❌ Ошибка при удалении адреса");
                }
                closeToast();
              }}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Да
            </button>
            <button
              onClick={closeToast}
              className="bg-gray-300 px-3 py-1 rounded"
            >
              Нет
            </button>
          </div>
        </div>
      ),
      { autoClose: false }
    );
  };

  if (!address || address.length === 0) {
    return <h1 className={styles.heading}>NO CURRENT ADDRESSES</h1>;
  }

  return (
    <div className={styles.feedWrapper}>
      {address.map((addr) => (
        <FeedItem
          key={addr.id}
          heading={addr.firstName || ""}
          firstName={addr.firstName || ""}
          lastName={addr.lastName || ""}
          city={addr.city}
          zip={addr.zip}
          country={addr.country}
          province={addr.province || ""}
          onDelete={() => confirmDelete(addr.id)}
        />
      ))}
    </div>
  );
};

export default AddressesFeed;
