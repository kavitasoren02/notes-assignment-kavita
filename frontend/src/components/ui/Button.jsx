const Button = ({ children, loading, className, ...props }) => {
    return (
        <button
            disabled={loading}
            className={`px-4 py-2 bg-blue-600 text-white rounded-md cursor-pointer hover:bg-blue-700 disabled:opacity-50 ${className}`}
            {...props}
        >
            {loading ? "Please wait..." : children}
        </button>
    )
}

export default Button
