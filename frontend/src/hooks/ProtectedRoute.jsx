import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import FullScreenLoader from "../components/ui/FullScreenLoader"

const ProtectedRoute = ({ children }) => {
    const { user } = useAuth()
    if(user === undefined) {
        return <FullScreenLoader />
    }
    return user ? children : <Navigate to="/login" />
}

export default ProtectedRoute
