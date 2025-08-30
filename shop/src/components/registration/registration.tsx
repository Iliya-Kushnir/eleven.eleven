"use client";
import { Form, Formik, Field, ErrorMessage, FormikHelpers } from "formik";
import { initialValues, schemas } from "./helper";
import { toast } from "react-toastify";
import DefaultButton from "../defaultButton/defaultButton";
import styles from "./registration.module.scss";
import { createCustomer } from "@/lib/shopify";

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
      const res = await createCustomer(
        values.email,
        values.password,
        values.firstName,
        values.lastName
      );

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
    } catch (err: unknown) {
        if (err instanceof Error) {
          toast.error(err.message);
        } else {
          toast.error("Something went wrong");
        }
      }
  };

  return (
    <Formik<FormValues>
      initialValues={initialValues as FormValues}
      validationSchema={schemas.custom}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form className={styles.formWrapper}>
          <h1 className={styles.heading}>CREATE ACCOUNT</h1>

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

          <div className={styles.submitWrapper}>
            <DefaultButton type="submit" label="CREATE ACCOUNT" />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default EmailForm;
