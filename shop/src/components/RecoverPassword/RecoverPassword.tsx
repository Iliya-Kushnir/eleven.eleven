"use client"
import { Form, Formik, Field, ErrorMessage, FormikHelpers } from "formik"
import { initialValues, schemas } from "./helper";
import { toast } from "react-toastify";
import DefaultButton from "../defaultButton/defaultButton";
import styles from "./RecoverPassword.module.scss";
import { recoverCustomerPassword } from "@/lib/shopify";
import Link from "next/link";

interface FormValues {
    email: string;
}

const Recover = () => {
    const handleSubmit = async (
        values: FormValues,
        { resetForm }: FormikHelpers<FormValues>
    ) => {
        try {
            const res = await recoverCustomerPassword( values.email)

            console.log("Shopif repose:", res)

            if (res?.customerRecover) {
                const errors = res.customerRecover.customerUserErrors;
                const customer = res.customerRecover

                console.log("Errors:", errors)
                console.log("customer:", customer)

                if (errors?.length > 0) {
                    toast.error(errors[0].message);
                  } else if (customer) {
                    toast.success("✅ User created successfully!");
                    resetForm();
                  } else {
                    toast.error("Something went wrong: customerCreate returned null");
                  }
                } else {
                  console.error("❌ No customerCreate in response");
                  toast.error("Something went wrong: response is empty or unauthorized");
                }
            } catch (err: unknown) {
            console.error("🔥 Caught error:", err);
        
            if (err instanceof Error) {
              toast.error(err.message);
            } else {
              toast.error("Something went wrong");
            }
          }
    }

    return (
        <Formik<FormValues>
        initialValues={initialValues as FormValues}
        validationSchema={schemas.custom}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className={styles.formWrapper}>
            <h1 className={styles.heading}>CREATE ACCOUNT</h1>
  
            <div className={styles.fieldError}>
              <h2 className={styles.label}>WE WILL SEND YOU AN EMAIL TO RESET YOUR PASSWORD</h2>
              <Field className={styles.input} type="text" name="email" />
              <ErrorMessage name="email" component="span" className={styles.error} />
            </div>
  
            <div className={styles.submitWrapper}>

            <DefaultButton href="/account" type="submit" label="SUBMIT"/>
            <Link className={styles.createLink} href="/account/login">
              CANCEL
            </Link>
              
            </div>
          </Form>
        )}
      </Formik>
    )
}

export default Recover