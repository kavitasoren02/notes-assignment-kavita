import { useFormik } from "formik"
import api from "../api/axios"
import { profileSchema } from "../validations/authValidation"
import Card from "../components/ui/Card"
import Input from "../components/ui/Input"
import Button from "../components/ui/Button"
import { useAuth } from "../context/AuthContext"
import { useState } from "react"

const ProfilePage = () => {
    const { user, setUser } = useAuth()
    const [edit, setEdit] = useState(false)

    const onClickHandlerRename = async (values) => {
        const res = await api.put("/auth/profile", values)
        setUser(res.data)
        setEdit(false)
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: user?.name || "",
            email: user?.email || ""
        },
        validationSchema: profileSchema,
        onSubmit: onClickHandlerRename
    })

    if (!user) return null

    return (
        <div className="w-full space-y-6">
            <h1 className="text-2xl font-bold">Profile</h1>

            <Card>
                {!edit ? (
                    <div className="space-y-4">
                        <div>
                            <p className="text-sm text-gray-500">Name</p>
                            <p className="font-medium">{user.name}</p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">Email</p>
                            <p className="font-medium">{user.email}</p>
                        </div>

                        <Button onClick={() => setEdit(true)}>Edit Profile</Button>
                    </div>
                ) : (
                    <form onSubmit={formik.handleSubmit} className="space-y-4">
                        <Input
                            label="Name"
                            name="name"
                            formik={formik}
                        />

                        <Input
                            label="Email"
                            name="email"
                            formik={formik}
                        />

                        <div className="flex gap-2 justify-end">
                            <Button
                                type="submit"
                                loading={formik.isSubmitting}
                            >
                                Save
                            </Button>

                            <Button
                                type="button"
                                onClick={() => setEdit(false)}
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                )}
            </Card>
        </div>
    )
}

export default ProfilePage
