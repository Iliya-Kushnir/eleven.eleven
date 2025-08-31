// lib/customer.ts
import Cookies from "js-cookie";
import { getCustomer } from "@/lib/shopify";

export async function fetchCustomerFromCookies() {
  const token = Cookies.get("shopifyToken");
  if (!token) {
    return null; // нет токена => пользователь не залогинен
  }

  try {
    const response = await getCustomer(token);
    return response.customer; // вернем объект customer
  } catch (error) {
    console.error("Ошибка получения данных клиента:", error);
    return null;
  }
}
