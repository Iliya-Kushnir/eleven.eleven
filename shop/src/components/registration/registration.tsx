"use client";
import { Form, Formik, Field, ErrorMessage, FormikHelpers } from "formik";
import { initialValues, schemas } from "./helper";
import Link from "next/link";
import { toast } from "react-toastify";
import DefaultButton from "../defaultButton/defaultButton";
import styles from "./registration.module.scss";

// Опиши интерфейс значений формы
interface FormValues {
  email: string;
  password: string;
}

const EmailForm = () => {
  const handleSubmit = (
    values: FormValues,
    { resetForm }: FormikHelpers<FormValues>
  ) => {
    // твоя логика отправки
    const success = true; // допустим, всё ок
    console.log(values)

    if (success) {
      toast.success("You have logged in to profile");
      resetForm();
    } else {
      toast.error("WRONG E-MAIL OR PASSWORD");
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
        <div className={styles.fieldError}>
        <Field
            className={styles.input}
            type="text"
            name="email"
            placeholder="E-mail"
        />
        
        <ErrorMessage
            name="email"
            component="span"
            className={styles.error}
        />
        </div>


        <div className={styles.fieldError}>
        <Field
            className={styles.input}
            type="password"
            name="password"
            placeholder="PASSWORD"
        />

        <ErrorMessage
            name="password"
            component="span"
            className={styles.error}
        />
        </div>

        <Link className={styles.createLink} href="/">FORGOT YOUR PASSWORD</Link>

        <div className={styles.submitWrapper}>
        <DefaultButton type="submit" label="SIGN IN"/>

        <Link className={styles.createLink} href="/">CREATE ACCOUNT</Link>
        </div>
        </Form>
      )}
    </Formik>
  );
};

export default EmailForm;
