"use client"
import { Form, Formik, Field, ErrorMessage, FormikHelpers} from "formik"
import {toast} from "react-toastify"
import DefaultButton from "../defaultButton/defaultButton"
import styles from "./CreateAddressForm.module.scss"
import { addCustomerAddress } from "@/lib/shopify"
import Cookies from "js-cookie"
import { initialValues, schema, AddressValues } from "./helper"
import { useRouter } from "next/navigation"

type Props = {
  open: boolean;
  onClose: () => void;
};

const EmailAddress = ({ open, onClose }: Props) => {
  const router = useRouter();

  const handleSubmit = async (
    values: AddressValues,
    { resetForm }: FormikHelpers<AddressValues>
  ) => {
    try {
      const accessToken = Cookies.get("shopifyToken");
      if (!accessToken) {
        toast.error("❌ You must be logged in to add an address");
        return;
      }

      const addressRes = await addCustomerAddress(accessToken, values);
      const addrErrors =
        addressRes?.customerAddressCreate?.customerUserErrors || [];

      if (addrErrors.length > 0) {
        toast.error(addrErrors[0].message);
        return;
      }

      toast.success("✅ Address added successfully!");
      resetForm();
      onClose(); // закрыть после успешного добавления
      router.refresh();
    } catch (err: unknown) {
      console.error("🔥 Caught error:", err);
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  if (!open) return null; // если закрыто — ничего не рендерим

  return (
    <div className={styles.modalWrapper}>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className={styles.formWrapper}>

        <div className={styles.fieldError}>
            <h2 className={styles.label}>FIRST NAME</h2> 
            <Field className={styles.input} type="text" 
            name="firstName" /> 
            <ErrorMessage 
            name="firstName" 
            component="span" 
            className={styles.error} /> 
            </div> 
            <div className={styles.fieldError}> 
            <h2 className={styles.label}>LAST NAME</h2> 
            <Field className={styles.input} 
            type="text" 
            name="lastName" 
            /> 
            <ErrorMessage 
            name="lastName" 
            component="span" 
            className={styles.error} 
            /> 
        </div> 
            <div className={styles.fieldError}> 
            <h2 className={styles.label}>ADDRESS 1</h2>
            <Field className={styles.input} type="text" name="address1" />
            <ErrorMessage name="address1" component="span" className={styles.error} />
            </div> 
    <div className={styles.fieldError}> 
    <h2 className={styles.label}>ADDRESS 2</h2> 
    <Field className={styles.input} type="text" name="address2" /> 
    <ErrorMessage name="address2" component="span" className={styles.error} /> 
    </div> 

        <div className={styles.fieldError}> 
        <h2 className={styles.label}>CITY</h2> 
        <Field className={styles.input} type="text" name="city" /> 
        <ErrorMessage name="city" component="span" className={styles.error} /> 
        </div> 
        <div className={styles.fieldError}> 
            <h2 className={styles.label}>PROVINCE</h2> 
            <Field className={styles.input} type="text" name="province" /> 
            <ErrorMessage name="province" component="span" className={styles.error} /> 
        </div> 
            <div className={styles.fieldError}> 
                <h2 className={styles.label}>COUNTRY</h2> 
                <Field className={styles.input} type="text" name="country" /> 
                <ErrorMessage name="country" component="span" className={styles.error} /> 
                </div> 
            <div className={styles.fieldError}> 
                <h2 className={styles.label}>ZIP</h2> 
                <Field className={styles.input} type="text" name="zip" /> 
                <ErrorMessage name="zip" component="span" className={styles.error} /> 
            </div> 
                <div className={styles.fieldError}> 
                    <h2 className={styles.label}>PHONE</h2> 
                    <Field className={styles.input} type="text" name="phone" /> 
                    <ErrorMessage name="phone" component="span" className={styles.error} /> 
                </div> 
            <div className={styles.submitWrapper}>
              <DefaultButton type="submit" label="Submit" />
              <DefaultButton
                type="button"
                label="Cancel"
                onClick={onClose}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default EmailAddress
