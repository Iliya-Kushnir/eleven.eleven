"use client";
import { useState, useEffect } from "react";
import FeedItem from "./feedItem/feedItem";
import { getCustomerAddresses, deleteCustomerAddress, updateCustomerAddress } from "@/lib/shopify";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import styles from "./addressesFeed.module.scss";
import EditForm from "../EditAddressesForm/EditAddressesForm";
import { useRouter } from "next/navigation";

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
    const router = useRouter()
  const [addresses, setAddresses] = useState<CustomerAddress[]>([]);
  const [editingAddress, setEditingAddress] = useState<CustomerAddress | null>(null);
  const token = Cookies.get("shopifyToken");

  useEffect(() => {
    async function loadAddresses() {
      try {
        const data = await getCustomerAddresses(token || "");
        const customerAddresses = data.customer.addresses.edges.map(
          (edge) => edge.node
        );
        setAddresses(customerAddresses);
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
                  setAddresses((prev) =>
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

  const handleUpdate = async (values: Omit<CustomerAddress, "id">) => {
    if (!token || !editingAddress) return;
  
    try {
      const res = await updateCustomerAddress(token, editingAddress.id, values);
  
      if (res.customerAddressUpdate.customerUserErrors.length > 0) {
        toast.error(res.customerAddressUpdate.customerUserErrors[0].message);
        return;
      }
  
      // Обновляем локальный state сразу
      setAddresses(prev =>
        prev.map(addr =>
          addr.id === editingAddress.id ? { ...addr, ...values } : addr
        )
      );
  
      toast.success("✅ Адрес обновлён");
      setEditingAddress(null); // закрываем форму
  
      // router.refresh(); // уже не нужен
    } catch (err) {
      console.error("Error updating address:", err);
      toast.error("❌ Ошибка при обновлении адреса");
    }
  };
  

  if (!addresses || addresses.length === 0) {
    return <h1 className={styles.heading}>NO CURRENT ADDRESSES</h1>;
  }

  return (
    <div className={styles.feedWrapper}>
      {addresses.map((addr) => (
        <div key={addr.id}>
          {editingAddress?.id === addr.id ? (
            <EditForm
              initialValues={{
                firstName: addr.firstName ?? "",
                lastName: addr.lastName ?? "",
                address1: addr.address1 ?? "",
                address2: addr.address2 ?? "",
                city: addr.city ?? "",
                province: addr.province ?? "",
                country: addr.country ?? "",
                zip: addr.zip ?? "",
                phone: addr.phone ?? "",
              }}
              onSubmit={handleUpdate}
              onCancel={() => setEditingAddress(null)}
            />
          ) : (
            <FeedItem
              heading={addr.firstName || ""}
              firstName={addr.firstName || ""}
              lastName={addr.lastName || ""}
              city={addr.city}
              zip={addr.zip}
              country={addr.country}
              province={addr.province || ""}
              onDelete={() => confirmDelete(addr.id)}
              onEdit={() => setEditingAddress(addr)}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default AddressesFeed;
