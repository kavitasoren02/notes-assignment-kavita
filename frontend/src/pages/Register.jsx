import { useFormik } from "formik"
import { registerSchema } from "../validations/authValidation"
import { useAuth } from "../context/AuthContext"
import Input from "../components/ui/Input"
import Button from "../components/ui/Button"
import { Link } from "react-router-dom"
import Card from "../components/ui/Card"

const Register = () => {
    const { register } = useAuth()

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: ""
        },
        validationSchema: registerSchema,
        onSubmit: register
    })

    return (
        <div className="min-h-screen flex items-center justify-center">
            <Card className="w-96">
                <form onSubmit={formik.handleSubmit} className="space-y-4">
                    <h1 className="text-xl font-bold text-center">Register</h1>

                    <Input
                        label="Full Name"
                        name="name"
                        formik={formik}
                    />

                    <Input
                        label="Email"
                        name="email"
                        type="email"
                        formik={formik}
                    />

                    <Input
                        label="Password"
                        name="password"
                        type="password"
                        formik={formik}
                    />

                    <Button type="submit" loading={formik.isSubmitting} className="w-full">
                        Create Account
                    </Button>

                    <p className="text-sm text-center text-gray-600">
                        Already have an account?{" "}
                        <Link to="/login" className="text-blue-600 font-medium">
                            Sign in
                        </Link>
                    </p>
                </form>
            </Card>
        </div>
    )
}

export default Register
