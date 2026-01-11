import Loader from "./Loader"

const FullScreenLoader = ({ text = "Loading..." }) => {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
            <Loader size="lg" />
            <p className="mt-4 text-sm text-gray-500">{text}</p>
        </div>
    )
}

export default FullScreenLoader
