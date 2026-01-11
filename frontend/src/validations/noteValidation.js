import * as Yup from "yup"

export const noteSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    content: Yup.string().required("Content is required")
})
