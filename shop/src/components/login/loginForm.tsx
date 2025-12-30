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

const EmailForm = () => {
  const handleSubmit = async (
    values: FormValues,
    { resetForm, setSubmitting }: FormikHelpers<FormValues>
  ) => {
    try {
      const res = await loginCustomer(values.email, values.password);
      
      if (res?.customerAccessTokenCreate) {
        const tokenData = res.customerAccessTokenCreate.customerAccessToken;
        const errors = res.customerAccessTokenCreate.customerUserErrors;

        if (tokenData?.accessToken) {
          // 1. Устанавливаем куку с экспирацией (например, 7 дней), чтобы она не пропадала
          Cookies.set("shopifyToken", tokenData.accessToken, { 
            path: '/', 
            expires: 7,
            sameSite: 'lax',
            secure: window.location.protocol === 'https:' 
          });

          toast.success("You have logged in to profile");
          resetForm();

          // 2. ИСПОЛЬЗУЕМ window.location вместо router.push
          // Это гарантирует, что страница аккаунта увидит куку сразу при загрузке
          window.location.href = "/account";
        } else if (errors?.length > 0) {
          toast.error(errors[0].message);
        } else {
          toast.error("WRONG E-MAIL OR PASSWORD");
        }
      } else {
        toast.error("Something went wrong with login response");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik<FormValues>
      initialValues={initialValues as FormValues}
      validationSchema={schemas.custom}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className={styles.formWrapper}>
          <div className={styles.fieldError}>
            <Field
              className={styles.input}
              type="text"
              name="email"
              placeholder="E-mail"
            />
            <ErrorMessage name="email" component="span" className={styles.error} />
          </div>

          <div className={styles.fieldError}>
            <Field
              className={styles.input}
              type="password"
              name="password"
              placeholder="PASSWORD"
            />
            <ErrorMessage name="password" component="span" className={styles.error} />
          </div>

          <Link className={styles.createLink} href="/account/recover">
            FORGOT YOUR PASSWORD
          </Link>

          <div className={styles.submitWrapper}>
            {/* ИСПРАВЛЕНИЕ: Убран href. Кнопка теперь только отправляет форму */}
            <DefaultButton 
              type="submit" 
              label={isSubmitting ? "SIGNING IN..." : "SIGN IN"} 
              disabled={isSubmitting} 
            />
            
            <Link className={styles.createLink} href="/account/create-acc">
              CREATE ACCOUNT
            </Link>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default EmailForm;