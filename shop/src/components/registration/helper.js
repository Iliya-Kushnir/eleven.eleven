import * as Yup from "yup";

export const formConfigs = {
  register: {
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      address1: "",
      address2: "",
      city: "",
      province: "",
      country: "",
      zip: "",
      phone: "",
    },
    schema: Yup.object({
      firstName: Yup.string().required("Required"),
      lastName: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string().min(6).required("Required"),
      address1: Yup.string().required("Required"),
      city: Yup.string().required("Required"),
      country: Yup.string().required("Required"),
      zip: Yup.string().required("Required"),
    }),
    fields: ["firstName", "lastName", "email", "password", "address1", "address2", "city", "province", "country", "zip", "phone"],
  },

  logIn: {
    initialValues: {
      email: "",
      password: "",
    },
    schema: Yup.object({
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string().required("Required"),
    }),
    fields: ["email", "password"],
  },

  address: {
    initialValues: {
      firstName: "",
      lastName: "",
      address1: "",
      address2: "",
      city: "",
      province: "",
      country: "",
      zip: "",
      phone: "",
    },
    schema: Yup.object({
      firstName: Yup.string().required("Required"),
      lastName: Yup.string().required("Required"),
      address1: Yup.string().required("Required"),
      city: Yup.string().required("Required"),
      country: Yup.string().required("Required"),
      zip: Yup.string().required("Required"),
    }),
    fields: ["firstName", "lastName", "address1", "address2", "city", "province", "country", "zip", "phone"],
  },
};
