"use client";
import { Form, Formik, Field, ErrorMessage, FormikHelpers } from "formik";
import DefaultButton from "@/components/defaultButton/defaultButton";
import { initialValues, schemas } from "./helper";
import { toast } from "react-toastify";
import styles from "./Form.module.scss";
import { useLanguage } from "@/context/LanguageContext";

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

  const { t } = useLanguage();

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
          <p className={styles.country}>{t('common.footer.form.country')}</p>
          </div>

          <p className={styles.labelForInput}>
            {t('common.footer.form.paragraph')}
          </p>

          <Field
            className={styles.input}
            type="text"
            name="email"
            placeholder={t('common.footer.form.email_placeholder')}
          />
          <ErrorMessage
            name="email"
            component="span"
            className={styles.error}
          />
          <div className={styles.buttonWrapper}>
            <DefaultButton type="submit" label={t('common.footer.form.submit')}/>
          </div>      
          <button type="submit" style={{ display: "none" }} />
        </Form>
      )}
    </Formik>
  );
};

export default EmailForm;
