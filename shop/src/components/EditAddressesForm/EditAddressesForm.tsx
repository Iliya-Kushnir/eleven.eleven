"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import DefaultButton from "../defaultButton/defaultButton";
import styles from "./EditAddressesForm.module.scss";
import { schema, AddressValues } from "./helper";
import { useLanguage } from "@/context/LanguageContext";

type Props = {
  initialValues: AddressValues;
  onSubmit: (values: AddressValues) => void;
  onCancel: () => void;
};

const EditForm = ({ initialValues, onSubmit, onCancel }: Props) => {
    console.log(initialValues)
    const { t } = useLanguage();
  return (
    <div className={styles.modalWrapper}>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={onSubmit}
      >
        {() => (
          <Form className={styles.formWrapper}>
            <div className={styles.fieldError}>
              <h2 className={styles.label}>{t('addresses.first_name')}</h2>
              <Field className={styles.input} placeholder={initialValues.firstName} type="text" name="firstName" />
              <ErrorMessage name="firstName" component="span" className={styles.error} />
            </div>
            <div className={styles.fieldError}> 
            <h2 className={styles.label}>{t('addresses.last_name')}</h2> 
            <Field className={styles.input} 
            type="text" 
            name="lastName" 
            /> 
            <ErrorMessage 
            name="lastName" 
            component="span" 
            className={styles.error} 
            /> 
        </div> 
            <div className={styles.fieldError}> 
            <h2 className={styles.label}>{t('addresses.address_line_1')}</h2>
            <Field className={styles.input} type="text" name="address1" />
            <ErrorMessage name="address1" component="span" className={styles.error} />
            </div> 
    <div className={styles.fieldError}> 
    <h2 className={styles.label}>{t('addresses.address_line_2')}</h2> 
    <Field className={styles.input} type="text" name="address2" /> 
    <ErrorMessage name="address2" component="span" className={styles.error} /> 
    </div> 

        <div className={styles.fieldError}> 
        <h2 className={styles.label}>{t('addresses.city')}</h2> 
        <Field className={styles.input} type="text" name="city" /> 
        <ErrorMessage name="city" component="span" className={styles.error} /> 
        </div> 
        <div className={styles.fieldError}> 
            <h2 className={styles.label}>{t('addresses.province')}</h2> 
            <Field className={styles.input} type="text" name="province" /> 
            <ErrorMessage name="province" component="span" className={styles.error} /> 
        </div> 
            <div className={styles.fieldError}> 
                <h2 className={styles.label}>{t('addresses.state')}</h2> 
                <Field className={styles.input} type="text" name="country" /> 
                <ErrorMessage name="country" component="span" className={styles.error} /> 
                </div> 
            <div className={styles.fieldError}> 
                <h2 className={styles.label}>{t('addresses.zip_code')}</h2> 
                <Field className={styles.input} type="text" name="zip" /> 
                <ErrorMessage name="zip" component="span" className={styles.error} /> 
            </div> 
                <div className={styles.fieldError}> 
                    <h2 className={styles.label}>{t('addresses.phone')}</h2> 
                    <Field className={styles.input} type="text" name="phone" /> 
                    <ErrorMessage name="phone" component="span" className={styles.error} /> 
                </div> 
            <div className={styles.submitWrapper}>
              <DefaultButton type="submit" label={t('addresses.submit')} />
              <DefaultButton type="button" label={t('addresses.cancel')} onClick={onCancel} />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditForm;
