"use client";

import { Form, Formik, Field, ErrorMessage, FormikHelpers } from "formik";
import { initialValues, schemas } from "./helper";
import { toast } from "react-toastify";
import DefaultButton from "../defaultButton/defaultButton";
import styles from "./RecoverPassword.module.scss";
import Link from "next/link";
import { recoverCustomerPassword } from "@/lib/shopify";

interface FormValues {
  email: string;
}

const Recover = () => {
  const handleSubmit = async (
    values: FormValues,
    { resetForm }: FormikHelpers<FormValues>
  ) => {
    try {
      // 👉 redirectUrl — ссылка на твою страницу смены пароля
      const redirectUrl = "https://your-vercel-app.vercel.app/account/change-password";

      // Вызов Shopify API
      const res = await recoverCustomerPassword(values.email);

      console.log("Shopify response:", res);

      const errors = res?.customerRecover?.customerUserErrors || [];
     // const success = res?.customerRecover?.customer;

      if (errors.length > 0) {
        console.log("RecoverPassword.tsx:", res)
        toast.error(errors[0].message);
      } else {
        toast.success("📧 Письмо для восстановления пароля отправлено!");
        console.log("RecoverPassword.tsx:", "Succes", res)
        resetForm();
      }
    } catch (err: unknown) {
      console.error("🔥 Caught error:", err);
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Что-то пошло не так. Попробуйте позже.");
      }
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
          <h1 className={styles.heading}>RESET PASSWORD</h1>

          <div className={styles.fieldError}>
            <h2 className={styles.label}>
              WE WILL SEND YOU AN EMAIL TO RESET YOUR PASSWORD
            </h2>
            <Field className={styles.input} type="text" name="email" />
            <ErrorMessage
              name="email"
              component="span"
              className={styles.error}
            />
          </div>

          <div className={styles.submitWrapper}>
            <DefaultButton
              href=""
              type="submit"
              label={isSubmitting ? "SENDING..." : "SUBMIT"}
              disabled={isSubmitting}
            />
            <Link className={styles.createLink} href="/account/login">
              CANCEL
            </Link>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Recover;
