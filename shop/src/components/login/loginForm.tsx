"use client";
import { Form, Formik, Field, ErrorMessage, FormikHelpers } from "formik";
import { initialValues, schemas } from "./helper";
import Link from "next/link";
import { toast } from "react-toastify";
import DefaultButton from "../defaultButton/defaultButton";
import { loginCustomer } from "@/lib/shopify";
import Cookies from "js-cookie";
import styles from "./loginForm.module.scss";

interface FormValues {
  email: string;
  password: string;
}

interface CustomerAccessToken {
  accessToken: string;
  expiresAt: string;
}

interface CustomerUserError {
  field: string[];
  message: string;
}

interface LoginResponse {
  customerAccessTokenCreate: {
    customerAccessToken: CustomerAccessToken | null;
    customerUserErrors: CustomerUserError[];
  };
}

const EmailForm = () => {
  const handleSubmit = async (
    values: FormValues,
    { resetForm }: FormikHelpers<FormValues>
  ) => {
    try {
      const res: LoginResponse = await loginCustomer(values.email, values.password);

      const tokenData = res.customerAccessTokenCreate.customerAccessToken;
      const errors = res.customerAccessTokenCreate.customerUserErrors;

      if (tokenData?.accessToken) {
        Cookies.set("shopifyToken", tokenData.accessToken, { expires: 7 });
        toast.success("You have logged in to profile");
        resetForm();
      } else if (errors.length > 0) {
        toast.error(errors[0].message);
      } else {
        toast.error("WRONG E-MAIL OR PASSWORD");
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
        <div className={styles.fieldError}>
          <Field className={styles.input} type="text" name="email" placeholder="E-mail" />
          <ErrorMessage name="email" component="span" className={styles.error} />
        </div>

        <div className={styles.fieldError}>
          <Field className={styles.input} type="password" name="password" placeholder="PASSWORD" />
          <ErrorMessage name="password" component="span" className={styles.error} />
        </div>

        <Link className={styles.createLink} href="/">FORGOT YOUR PASSWORD</Link>

        <div className={styles.submitWrapper}>
          <DefaultButton type="submit" label="SIGN IN" />
          <Link className={styles.createLink} href="/account/create-acc">CREATE ACCOUNT</Link>
        </div>
      </Form>
    </Formik>
  );
};

export default EmailForm;
