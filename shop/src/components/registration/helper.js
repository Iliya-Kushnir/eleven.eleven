import * as Yup from 'yup';

const regx = {
    name: /^[a-zA-Zа-яА-ЯёЁіІїЇєЄ'\- ]{2,50}$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/,
    company: /^[a-zA-Zа-яА-ЯёЁіІїЇєЄ0-9&\-.,' ]{2,100}$/,
    address: /^[a-zA-Zа-яА-ЯёЁіІїЇєЄ0-9\s,.'\-]{5,100}$/,
    city: /^[a-zA-Zа-яА-ЯёЁіІїЇєЄ\- ]{2,50}$/,
    postal: /^[0-9]{4,10}$/,
    phone: /^\+?[0-9]{7,15}$/
}

export const schemas = {
    custom: Yup.object().shape({
        firstName: Yup.string()
        .matches(regx.name, "Invalid first name")
        .required("Enter your first name"),
      lastName: Yup.string()
        .matches(regx.name, "Invalid last name")
        .required("Enter your last name"),
      email: Yup.string()
        .matches(regx.email, "This is not a valid email")
        .required("Enter your email"),
      password: Yup.string()
        .matches(regx.password, "Password must be at least 6 characters and include numbers")
        .required("Enter your password"),
      company: Yup.string()
        .matches(regx.company, "Invalid company name")
        .notRequired(),
      adress1: Yup.string()
        .matches(regx.address, "Invalid address")
        .required("Enter your address"),
      adress2: Yup.string()
        .matches(regx.address, "Invalid address")
        .notRequired(),
      city: Yup.string()
        .matches(regx.city, "Invalid city")
        .required("Enter your city"),
      postal: Yup.string()
        .matches(regx.postal, "Invalid postal code")
        .required("Enter your postal code"),
      phone: Yup.string()
        .matches(regx.phone, "Invalid phone number")
        .required("Enter your phone number")
    })
}


export const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    company: "", 
    adress1: "",
    adress2: "",
    city: "",
    postal: "",
    phone: ""
}