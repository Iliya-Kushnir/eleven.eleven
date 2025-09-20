import * as Yup from "yup";

export const resetPasswordConfig = {
  initialValues: {
    password: "",
    confirmPassword: "",
  },
  schema: Yup.object({
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Required"),
  }),
};
