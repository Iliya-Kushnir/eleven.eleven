"use client";
import { Form, Formik, Field, ErrorMessage, FormikHelpers } from "formik";
import { initialValues, schemas } from "./helper";
import Link from "next/link";
import { toast } from "react-toastify";
import DefaultButton from "../defaultButton/defaultButton";
import styles from "./registration.module.scss";
import { createCustomer } from "@/lib/shopify";

/*
  company?: string;
  adress1: string;
  adress2?: string;
  city: string;
  postal: string;
  phone: string;
*/

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const EmailForm = () => {
  const handleSubmit = async (
    values: FormValues,
    
    { resetForm }: FormikHelpers<FormValues>
  ) => {
    try {
        console.log(values)
        const res = await createCustomer(
            values.email,
            values.password,
            values.firstName,
            values.lastName
          );
          

      // Безопасная проверка
      if (res?.customerCreate) {
        const errors = res.customerCreate.customerUserErrors;
        const customer = res.customerCreate.customer;

        if (errors?.length > 0) {
          toast.error(errors[0].message);
        } else if (customer) {
          toast.success("✅ User created successfully!");
          resetForm();
        } else {
          toast.error("Something went wrong: customerCreate returned null");
        }
      } else {
        toast.error("Something went wrong: response is empty or unauthorized");
      }
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    }
  };

  return (
    <Formik<FormValues>
      initialValues={initialValues as FormValues}
      validationSchema={schemas.custom}
      onSubmit={handleSubmit}
    >
      {({}) => (
        <Form className={styles.formWrapper}>
            <h1 className={styles.heading}>CREATE ACCAUNT</h1>
          {/* ВСЕ ИНПУТЫ ОСТАЮТСЯ БЕЗ ИЗМЕНЕНИЙ */}
          <div className={styles.fieldError}>
            <h2 className={styles.label}>FIRST NAME</h2>
            <Field className={styles.input} type="text" name="firstName" />
            <ErrorMessage name="firstName" component="span" className={styles.error} />
          </div>

          <div className={styles.fieldError}>
            <h2 className={styles.label}>LAST NAME</h2>
            <Field className={styles.input} type="text" name="lastName" />
            <ErrorMessage name="lastName" component="span" className={styles.error} />
          </div>

          <div className={styles.fieldError}>
            <h2 className={styles.label}>EMAIL</h2>
            <Field className={styles.input} type="email" name="email" />
            <ErrorMessage name="email" component="span" className={styles.error} />
          </div>

          <div className={styles.fieldError}>
            <h2 className={styles.label}>PASSWORD</h2>
            <Field className={styles.input} type="password" name="password" />
            <ErrorMessage name="password" component="span" className={styles.error} />
          </div>

          <div className={styles.fieldError}>
            <h2 className={styles.label}>COMPANY (OPTIONAL)</h2>
            <Field className={styles.input} type="text" name="company" />
            <ErrorMessage name="company" component="span" className={styles.error} />
          </div>

          <div className={styles.fieldError}>
            <h2 className={styles.label}>ADRESS 1</h2>
            <Field className={styles.input} type="text" name="adress1" />
            <ErrorMessage name="adress1" component="span" className={styles.error} />
          </div>

          <div className={styles.fieldError}>
            <h2 className={styles.label}>ADRESS 2 (OPTIONAL)</h2>
            <Field className={styles.input} type="text" name="adress2" />
            <ErrorMessage name="adress2" component="span" className={styles.error} />
          </div>

          <div className={styles.fieldError}>
            <h2 className={styles.label}>CITY</h2>
            <Field className={styles.input} type="text" name="city" />
            <ErrorMessage name="city" component="span" className={styles.error} />
          </div>

          <div className={styles.fieldError}>
            <h2 className={styles.label}>POSTAL / ZIP CODE</h2>
            <Field className={styles.input} type="text" name="postal" />
            <ErrorMessage name="postal" component="span" className={styles.error} />
          </div>

          <div className={styles.fieldError}>
            <h2 className={styles.label}>PHONE</h2>
            <Field className={styles.input} type="text" name="phone" />
            <ErrorMessage name="phone" component="span" className={styles.error} />
          </div>

          <div className={styles.submitWrapper}>
            <DefaultButton type="submit" label="CREATE ACCOUNT" />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default EmailForm;
