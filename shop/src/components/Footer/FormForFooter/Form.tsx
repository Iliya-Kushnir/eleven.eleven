"use client"
import { Form, Formik, Field, ErrorMessage } from "formik";
import { initialValues, schemas } from "./helper";
import styles from "./Form.module.scss";

const EmailForm = () => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schemas.custom}
      onSubmit={(values) => {
        console.log("logged data:", values);
      }}
    >
      {({ errors, touched }) => (
        <Form className={styles.formWrapper}>
          <div className={styles.Logo}></div>

          <p className={styles.labelForInput}>
          BE THE FIRST TO KNOW WHEN OUR PRODUCTS RESTOCK, NEW DROP LAUNCHES AND GET EARLY ACCESS.
          </p>

          <Field
            className={styles.input}
            type="text"
            name="email" 
            placeholder="E-mail"
          />
          <ErrorMessage name="email" component="span" className={styles.error} />


          <button type="submit" style={{ display: "none" }} />
        </Form>
      )}
    </Formik>
  );
};

export default EmailForm;
