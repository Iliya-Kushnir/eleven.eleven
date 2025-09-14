import * as Yup from "yup";

export type AddressValues = {
    firstName: string;
    lastName: string;
    address1: string;
    address2?: string;
    city: string;
    province?: string;
    country: string;
    zip: string;
    phone?: string;
  };

// Початкові значення
export const initialValues: AddressValues = {
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    city: "",
    province: "",
    country: "",
    zip: "",
    phone: "",
  };

// Схема валідації
export const schema = Yup.object({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  address1: Yup.string().required("Required"),
  city: Yup.string().required("Required"),
  country: Yup.string().required("Required"),
  zip: Yup.string().required("Required"),
});

// Поля форми
export const fields = [
  "firstName",
  "lastName",
  "address1",
  "address2",
  "city",
  "province",
  "country",
  "zip",
  "phone",
];
