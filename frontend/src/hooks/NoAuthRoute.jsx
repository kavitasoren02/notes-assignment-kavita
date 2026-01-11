import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import FullScreenLoader from "../components/ui/FullScreenLoader"

const NoAuthRoute = ({ children }) => {
    const { user } = useAuth()
    if (user === undefined) {
        return <FullScreenLoader />
    }
    return !user ? children : <Navigate to="/" />
}

export default NoAuthRoute
