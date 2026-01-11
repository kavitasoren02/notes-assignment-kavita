const Input = ({ label, formik, name, className, ...props }) => {
    const hasFormik = !!(formik && name)

    const error = hasFormik && formik.touched?.[name] && formik.errors?.[name]

    const fieldProps = hasFormik ? formik.getFieldProps(name) : {}

    return (
        <div className="space-y-1">
            {label && <label className="text-sm font-medium">{label}</label>}
            {props.type === "textarea" && <textarea
                {...fieldProps}
                {...props}
                rows={10}
                className={`resize-none w-full px-3 py-2 border rounded-md focus:outline-none
                ${error ? "border-red-500" : "border-gray-300"} 
                ${className || ""}`}
            />}
            {props.type !== "textarea" && <input
                {...fieldProps}
                {...props}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none
                ${error ? "border-red-500" : "border-gray-300"}
                ${className || ""}`}
            />}
            {error && <p className="text-xs text-red-500">{error}</p>}
        </div>
    )
}

export default Input
