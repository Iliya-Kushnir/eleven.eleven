"use client";

import { Form, Formik, Field, ErrorMessage, FormikHelpers } from "formik";
import { formConfigs } from "./helper";
import { toast } from "react-toastify";
import DefaultButton from "../defaultButton/defaultButton";
import styles from "./registration.module.scss";
import { createCustomer, loginCustomer, addCustomerAddress } from "@/lib/shopify";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

type RegisterValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address1: string;
  address2?: string;
  city: string;
  province?: string;
  country: string;
  zip: string;
  phone?: string;
};

type LoginValues = {
  email: string;
  password: string;
};

type AddressValues = {
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

type Mode = "register" | "logIn" | "address";

type FormValuesMap = {
  register: RegisterValues;
  logIn: LoginValues;
  address: AddressValues;
};

interface EmailFormProps<T extends Mode> {
  mode: T;
  label?: string;
}

const EmailForm = <T extends Mode>({ mode, label }: EmailFormProps<T>) => {
  const { initialValues, schema, fields } = formConfigs[mode];
  const router = useRouter();

  const handleSubmit = async (
    values: FormValuesMap[T], // 👈 теперь тип зависит от mode
    { resetForm }: FormikHelpers<FormValuesMap[T]>
  ) => {
    try {
      if (mode === "register") {
        const registerValues = values as RegisterValues; // 👈 сужаем тип
        console.log("📩 Register with values:", registerValues);

        const createRes = await createCustomer(
          registerValues.email,
          registerValues.password,
          registerValues.firstName,
          registerValues.lastName
        );

        const createErrors = createRes?.customerCreate?.customerUserErrors || [];
        if (createErrors.length > 0) {
          toast.error(createErrors[0].message);
          return;
        }

        const customer = createRes?.customerCreate?.customer;
        if (!customer) {
          toast.error("❌ Failed to create customer");
          return;
        }

        const loginRes = await loginCustomer(
          registerValues.email,
          registerValues.password
        );
        const accessToken =
          loginRes?.customerAccessTokenCreate?.customerAccessToken?.accessToken;

        if (!accessToken) {
          const loginErrors =
            loginRes?.customerAccessTokenCreate?.customerUserErrors || [];
          toast.error(
            loginErrors[0]?.message || "❌ Failed to login after registration"
          );
          return;
        }

        const addressInput = {
          firstName: registerValues.firstName,
          lastName: registerValues.lastName,
          address1: registerValues.address1,
          address2: registerValues.address2,
          city: registerValues.city,
          province: registerValues.province,
          country: registerValues.country,
          zip: registerValues.zip,
          phone: registerValues.phone,
        };

        const addressRes = await addCustomerAddress(accessToken, addressInput);
        const addrErrors =
          addressRes?.customerAddressCreate?.customerUserErrors || [];
        if (addrErrors.length > 0) {
          toast.error(addrErrors[0].message);
          return;
        }

        toast.success("✅ Account and address created successfully!");
        resetForm();
      } else if (mode === "logIn") {
        const loginValues = values as LoginValues; // 👈 сужаем
        console.log("🔑 LogIn with values:", loginValues);

        const loginRes = await loginCustomer(
          loginValues.email,
          loginValues.password
        );
        const accessToken =
          loginRes?.customerAccessTokenCreate?.customerAccessToken?.accessToken;

        if (!accessToken) {
          const loginErrors =
            loginRes?.customerAccessTokenCreate?.customerUserErrors || [];
          toast.error(loginErrors[0]?.message || "❌ Failed to login");
          return;
        }

        Cookies.set("shopifyToken", accessToken, { expires: 7 });
        toast.success("✅ Logged in successfully!");
        resetForm();
      } else if (mode === "address") {
        const addressValues = values as AddressValues; // 👈 сужаем
        console.log("🏠 Add address with values:", addressValues);

        const accessToken = Cookies.get("shopifyToken");
        if (!accessToken) {
          toast.error("❌ You must be logged in to add an address");
          return;
        }

        const addressRes = await addCustomerAddress(accessToken, addressValues);
        const addrErrors =
          addressRes?.customerAddressCreate?.customerUserErrors || [];
        if (addrErrors.length > 0) {
          toast.error(addrErrors[0].message);
          return;
        }

        toast.success("✅ Address added successfully!");
        resetForm();
        router.refresh()
      }
    } catch (err: unknown) {
      console.error("🔥 Caught error:", err);
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <Formik<FormValuesMap[T]>
      initialValues={initialValues as FormValuesMap[T]}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form className={styles.formWrapper}>
          {label && <h1 className={styles.heading}>{label}</h1>}

          {fields.includes("firstName") && (
            <div className={styles.fieldError}>
              <h2 className={styles.label}>FIRST NAME</h2>
              <Field className={styles.input} type="text" name="firstName" />
              <ErrorMessage
                name="firstName"
                component="span"
                className={styles.error}
              />
            </div>
          )}

          {fields.includes("lastName") && (
            <div className={styles.fieldError}>
              <h2 className={styles.label}>LAST NAME</h2>
              <Field className={styles.input} type="text" name="lastName" />
              <ErrorMessage
                name="lastName"
                component="span"
                className={styles.error}
              />
            </div>
          )}

          {fields.includes("email") && (
            <div className={styles.fieldError}>
              <h2 className={styles.label}>EMAIL</h2>
              <Field className={styles.input} type="email" name="email" />
              <ErrorMessage
                name="email"
                component="span"
                className={styles.error}
              />
            </div>
          )}

          {fields.includes("password") && (
            <div className={styles.fieldError}>
              <h2 className={styles.label}>PASSWORD</h2>
              <Field className={styles.input} type="password" name="password" />
              <ErrorMessage
                name="password"
                component="span"
                className={styles.error}
              />
            </div>
          )}

          {fields.includes("address1") && (
            <div className={styles.fieldError}>
              <h2 className={styles.label}>ADDRESS 1</h2>
              <Field className={styles.input} type="text" name="address1" />
              <ErrorMessage
                name="address1"
                component="span"
                className={styles.error}
              />
            </div>
          )}

          {fields.includes("address2") && (
            <div className={styles.fieldError}>
              <h2 className={styles.label}>ADDRESS 2</h2>
              <Field className={styles.input} type="text" name="address2" />
              <ErrorMessage
                name="address2"
                component="span"
                className={styles.error}
              />
            </div>
          )}

          {fields.includes("city") && (
            <div className={styles.fieldError}>
              <h2 className={styles.label}>CITY</h2>
              <Field className={styles.input} type="text" name="city" />
              <ErrorMessage
                name="city"
                component="span"
                className={styles.error}
              />
            </div>
          )}

          {fields.includes("province") && (
            <div className={styles.fieldError}>
              <h2 className={styles.label}>PROVINCE</h2>
              <Field className={styles.input} type="text" name="province" />
              <ErrorMessage
                name="province"
                component="span"
                className={styles.error}
              />
            </div>
          )}

          {fields.includes("country") && (
            <div className={styles.fieldError}>
              <h2 className={styles.label}>COUNTRY</h2>
              <Field className={styles.input} type="text" name="country" />
              <ErrorMessage
                name="country"
                component="span"
                className={styles.error}
              />
            </div>
          )}

          {fields.includes("zip") && (
            <div className={styles.fieldError}>
              <h2 className={styles.label}>ZIP</h2>
              <Field className={styles.input} type="text" name="zip" />
              <ErrorMessage
                name="zip"
                component="span"
                className={styles.error}
              />
            </div>
          )}

          {fields.includes("phone") && (
            <div className={styles.fieldError}>
              <h2 className={styles.label}>PHONE</h2>
              <Field className={styles.input} type="text" name="phone" />
              <ErrorMessage
                name="phone"
                component="span"
                className={styles.error}
              />
            </div>
          )}

          <div className={styles.submitWrapper}>
            <DefaultButton type="submit" label="Submit" />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default EmailForm;
