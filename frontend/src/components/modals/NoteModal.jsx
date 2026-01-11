import { useFormik } from "formik"
import Input from "../ui/Input"
import Button from "../ui/Button"
import api from "../../api/axios"
import { noteSchema } from "../../validations/noteValidation"

const NoteModal = ({ open, mode, note, onClose, onSuccess }) => {
    if (!open) return null

    const isView = mode === "view"

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: note?.title || "",
            content: note?.content || ""
        },
        validationSchema: isView ? null : noteSchema,
        onSubmit: async (values) => {
            if (mode === "edit") {
                await api.put(`/notes/${note._id}`, values)
            } else {
                await api.post("/notes", values)
            }
            onSuccess()
            onClose()
        }
    })

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-md rounded-xl p-6 space-y-4">
                <h2 className="text-xl font-semibold capitalize">
                    {mode} Note
                </h2>

                <form onSubmit={formik.handleSubmit} className="space-y-3">
                    <Input
                        label="Title"
                        name="title"
                        formik={formik}
                        disabled={isView}
                    />

                    <Input
                        type="textarea"
                        label="Content"
                        name="content"
                        formik={formik}
                        disabled={isView}
                    />

                    <div className="flex justify-end gap-2 pt-4">
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={onClose}
                        >
                            Close
                        </Button>

                        {!isView && (
                            <Button type="submit" loading={formik.isSubmitting}>
                                Save
                            </Button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default NoteModal
