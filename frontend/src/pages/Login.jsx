import { useFormik } from "formik"
import Input from "../components/ui/Input"
import Button from "../components/ui/Button"
import Card from "../components/ui/Card"
import { loginSchema } from "../validations/authValidation"
import { useAuth } from "../context/AuthContext"
import { Link } from "react-router-dom"

const Login = () => {
    const { login } = useAuth()

    const handleLogin = async(data) => {
        try {
            await login(data)
        }
        catch (error) {
            const errorMessage = error.response?.data?.message || "Something went wrong"
            formik.setErrors({password: errorMessage})
        }
    }

    const formik = useFormik({
        initialValues: { email: "", password: "" },
        validationSchema: loginSchema,
        onSubmit: handleLogin
    })

    return (
        <div className="min-h-screen flex items-center justify-center">
            <Card className="w-96">
                <form onSubmit={formik.handleSubmit} className="space-y-4">
                    <h1 className="text-xl font-bold text-center">Login</h1>

                    <Input label="Email" name="email" formik={formik} />
                    <Input label="Password" name="password" type="password" formik={formik} />

                    <Button type="submit" loading={formik.isSubmitting} className="w-full">
                        Login
                    </Button>
                    <p className="text-sm text-center text-gray-600">
                        Don’t have an account?{" "}
                        <Link to="/register" className="text-blue-600 font-medium">
                            Create one
                        </Link>
                    </p>
                </form>
            </Card>
        </div>
    )
}

export default Login
