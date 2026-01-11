const Input = ({ label, formik, name, className, ...props }) => {
    const error = formik.touched[name] && formik.errors[name]

    return (
        <div className="space-y-1">
            {label && <label className="text-sm font-medium">{label}</label>}
            {props.type === "textarea" && <textarea
                {...formik.getFieldProps(name)}
                {...props}
                rows={10}
                className={`resize-none w-full px-3 py-2 border rounded-md focus:outline-none
                ${error ? "border-red-500" : "border-gray-300"} 
                ${className || ""}`}
            />}
            {props.type !== "textarea" && <input
                {...formik.getFieldProps(name)}
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
