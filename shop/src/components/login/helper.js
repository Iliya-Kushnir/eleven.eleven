import * as Yup from 'yup';

const regx = {
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
}

export const schemas = {
    custom: Yup.object().shape({
        email: Yup.string()
        .matches(regx.email, "This is  not an email")
        .required('Enter your email'),
        password: Yup.string()
        .min(6, "Too Short!")
        .required("Required"),
    })
}


export const initialValues = {
    email: "",
    password: ""
}