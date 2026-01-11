import * as Yup from "yup"

export const loginSchema = Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string().required()
})

export const registerSchema = Yup.object({
    name: Yup.string().required(),
    email: Yup.string().email().required(),
    password: Yup.string().min(6).required()
})

export const profileSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
        .email("Invalid email")
        .required("Email is required")
})