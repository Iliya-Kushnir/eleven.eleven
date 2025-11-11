"use client";
import { Form, Formik, Field, ErrorMessage, FormikHelpers } from "formik";
import DefaultButton from "@/components/defaultButton/defaultButton";
import { initialValues, schemas } from "./helper";
import { toast } from "react-toastify";
import styles from "./Form.module.scss";

interface FormValues {
  email: string;
}

const EmailForm = () => {
  const handleSubmit = (
    values: FormValues,
    { resetForm }: FormikHelpers<FormValues>
  ) => {
    const success = true;

    if (success) {
      toast.success("Operation runed successefull");
      resetForm();
    } else {
      toast.error("Unkown Problem");
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
          <div className={styles.Logo}>
          <p className={styles.name}>{'eleven..eleven'}</p>
          <p className={styles.country}>{'ukraine'}</p>
          </div>

          <p className={styles.labelForInput}>
            BE THE FIRST TO KNOW WHEN OUR PRODUCTS RESTOCK, NEW DROP LAUNCHES
            AND GET EARLY ACCESS.
          </p>

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
          <div className={styles.buttonWrapper}>
            <DefaultButton type="submit" label="SUBMIT"/>
          </div>      
          <button type="submit" style={{ display: "none" }} />
        </Form>
      )}
    </Formik>
  );
};

export default EmailForm;
