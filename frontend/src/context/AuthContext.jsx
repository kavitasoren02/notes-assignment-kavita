import { createContext, useContext, useEffect, useState } from "react"
import api from "../api/axios"

const AuthContext = createContext(null)

const getToken = () => localStorage.getItem("token");

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(undefined);
    const [token, setToken] = useState(getToken());

    const login = async (data) => {
        const res = await api.post("/auth/login", data)
        localStorage.setItem("token", res.data.token)
        setToken(res.data.token)
    }

    const register = async (data) => {
        const res = await api.post("/auth/register", data)
        localStorage.setItem("token", res.data.token)
        setToken(res.data.token)
    }

    const logout = () => {
        localStorage.removeItem("token")
        setToken(null)
        setUser(undefined)
    }

    const getUserInfo = async () => {
        try {
            const { data } = await api.get("/auth/info");
            setUser(data)
        } catch (error) {
            console.error("Failed to fetch user info:", error);
            setUser(null)
        }
    }

    useEffect(() => {
        getUserInfo()
    }, [token])

    return (
        <AuthContext.Provider value={{ user, setUser, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
