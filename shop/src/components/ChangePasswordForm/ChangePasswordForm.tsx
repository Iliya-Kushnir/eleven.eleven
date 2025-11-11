"use client";

import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { resetPasswordConfig } from "./helper";
import { toast } from "react-toastify";
import  DefaultButton  from "@/components/defaultButton/defaultButton"
import styles from "./ChangePasswordForm.module.scss";

interface ResetPasswordFormProps {
  resetUrl: string;
}

interface FormValues {
  password: string;
  confirmPassword: string;
}

export default function ResetPasswordForm({ resetUrl }: ResetPasswordFormProps) {
  const handleSubmit = async (
    values: FormValues,
    { resetForm }: FormikHelpers<FormValues>
  ) => {
    const { password, confirmPassword } = values;

    if (password !== confirmPassword) {
      toast.error("Пароли не совпадают!");
      return;
    }

    try {
      const res = await fetch("/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resetUrl, password }),
      });

      const data = await res.json();

      if (data?.customerResetByUrl?.customerUserErrors?.length > 0) {
        toast.error(data.customerResetByUrl.customerUserErrors[0].message);
        return;
      }

      toast.success("✅ Пароль успешно изменён!");
      resetForm();
      window.location.href = "/account/login";
    } catch (error) {
      console.error(error);
      toast.error("Произошла ошибка. Попробуйте позже.");
    }
  };

  return (
    <Formik<FormValues>
      initialValues={resetPasswordConfig.initialValues}
      validationSchema={resetPasswordConfig.schema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className={styles.formWrapper}>
          <div className={styles.fieldError}>
            <Field
              className={styles.input}
              type="password"
              name="password"
              placeholder="Введите новый пароль"
              required
            />
            <ErrorMessage
              name="password"
              component="span"
              className={styles.error}
            />
          </div>

          <div className={styles.fieldError}>
            <Field
              className={styles.input}
              type="password"
              name="confirmPassword"
              placeholder="Подтвердите пароль"
              required
            />
            <ErrorMessage
              name="confirmPassword"
              component="span"
              className={styles.error}
            />
          </div>

          <div className={styles.submitWrapper}>

          <DefaultButton
            label={isSubmitting ? "Смена..." : "Сменить пароль"}
            type="submit"
            disabled={isSubmitting}
          />
          </div>
        </Form>
      )}
    </Formik>
  );
}
