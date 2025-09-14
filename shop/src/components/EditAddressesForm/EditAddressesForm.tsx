"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import DefaultButton from "../defaultButton/defaultButton";
import styles from "./EditAddressesForm.module.scss";
import { schema, AddressValues } from "./helper";

type Props = {
  initialValues: AddressValues;
  onSubmit: (values: AddressValues) => void;
  onCancel: () => void;
};

const EditForm = ({ initialValues, onSubmit, onCancel }: Props) => {
    console.log(initialValues)
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
              <h2 className={styles.label}>FIRST NAME</h2>
              <Field className={styles.input} placeholder={initialValues.firstName} type="text" name="firstName" />
              <ErrorMessage name="firstName" component="span" className={styles.error} />
            </div>
            <div className={styles.fieldError}> 
            <h2 className={styles.label}>LAST NAME</h2> 
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
            <h2 className={styles.label}>ADDRESS 1</h2>
            <Field className={styles.input} type="text" name="address1" />
            <ErrorMessage name="address1" component="span" className={styles.error} />
            </div> 
    <div className={styles.fieldError}> 
    <h2 className={styles.label}>ADDRESS 2</h2> 
    <Field className={styles.input} type="text" name="address2" /> 
    <ErrorMessage name="address2" component="span" className={styles.error} /> 
    </div> 

        <div className={styles.fieldError}> 
        <h2 className={styles.label}>CITY</h2> 
        <Field className={styles.input} type="text" name="city" /> 
        <ErrorMessage name="city" component="span" className={styles.error} /> 
        </div> 
        <div className={styles.fieldError}> 
            <h2 className={styles.label}>PROVINCE</h2> 
            <Field className={styles.input} type="text" name="province" /> 
            <ErrorMessage name="province" component="span" className={styles.error} /> 
        </div> 
            <div className={styles.fieldError}> 
                <h2 className={styles.label}>COUNTRY</h2> 
                <Field className={styles.input} type="text" name="country" /> 
                <ErrorMessage name="country" component="span" className={styles.error} /> 
                </div> 
            <div className={styles.fieldError}> 
                <h2 className={styles.label}>ZIP</h2> 
                <Field className={styles.input} type="text" name="zip" /> 
                <ErrorMessage name="zip" component="span" className={styles.error} /> 
            </div> 
                <div className={styles.fieldError}> 
                    <h2 className={styles.label}>PHONE</h2> 
                    <Field className={styles.input} type="text" name="phone" /> 
                    <ErrorMessage name="phone" component="span" className={styles.error} /> 
                </div> 
            <div className={styles.submitWrapper}>
              <DefaultButton type="submit" label="Save" />
              <DefaultButton type="button" label="Cancel" onClick={onCancel} />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditForm;
