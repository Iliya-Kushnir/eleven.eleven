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
  company?: string;
}

interface CustomerUserError {
  field: string[];
  message: string;
}

interface Customer {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

interface CustomerCreateResponse {
  customerCreate: {
    customer: Customer | null;
    customerUserErrors: CustomerUserError[];
  };
}

const EmailForm = () => {
  const handleSubmit = async (
    values: FormValues,
    { resetForm }: FormikHelpers<FormValues>
  ) => {
    try {
      const res: CustomerCreateResponse = await createCustomer(
        values.email,
        values.password,
        values.firstName,
        values.lastName
      );

      const { customer, customerUserErrors } = res.customerCreate;

      if (customerUserErrors.length > 0) {
        toast.error(customerUserErrors[0].message);
      } else if (customer) {
        toast.success("✅ User created successfully!");
        resetForm();
      } else {
        toast.error("Something went wrong: customerCreate returned null");
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
      <Form className={styles.formWrapper}>
        <h1 className={styles.heading}>CREATE ACCOUNT</h1>

        <div className={styles.fieldError}>
          <Field className={styles.input} type="text" name="firstName" placeholder="FIRST NAME" />
          <ErrorMessage name="firstName" component="span" className={styles.error} />
        </div>

        <div className={styles.fieldError}>
          <Field className={styles.input} type="text" name="lastName" placeholder="LAST NAME" />
          <ErrorMessage name="lastName" component="span" className={styles.error} />
        </div>

        <div className={styles.fieldError}>
          <Field className={styles.input} type="email" name="email" placeholder="EMAIL" />
          <ErrorMessage name="email" component="span" className={styles.error} />
        </div>

        <div className={styles.fieldError}>
          <Field className={styles.input} type="password" name="password" placeholder="PASSWORD" />
          <ErrorMessage name="password" component="span" className={styles.error} />
        </div>

        <div className={styles.fieldError}>
          <Field className={styles.input} type="text" name="company" placeholder="COMPANY (OPTIONAL)" />
          <ErrorMessage name="company" component="span" className={styles.error} />
        </div>

        <div className={styles.submitWrapper}>
          <DefaultButton type="submit" label="CREATE ACCOUNT" />
        </div>
      </Form>
    </Formik>
  );
};

export default EmailForm;
