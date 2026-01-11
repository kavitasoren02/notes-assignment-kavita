import { useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { Menu } from "lucide-react"

const getTitle = (pathname) => {
    switch (pathname) {
        case "/":
            return "Dashboard"
        case "/profile":
            return "Profile"
        default:
            return "Dashboard"
    }
}

const Header = ({onMenuClick}) => {
    const { logout } = useAuth()
    const { pathname } = useLocation();

    return (
        <header className="h-16 bg-white flex items-center justify-between px-6">
            <div className="flex gap-4 items-center">
                <Menu 
                    onClick={onMenuClick}
                    className="w-5 h-5 cursor-pointer md:hidden"
                />
                <h1 className="font-semibold">{getTitle(pathname)}</h1>
            </div>
            <button
                onClick={logout}
                className="text-sm text-red-600 hover:underline cursor-pointer"
            >
                Logout
            </button>
        </header>
    )
}

export default Header
