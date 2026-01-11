import { useState } from "react"
import Sidebar from "../components/Sidebar"
import Header from "../components/Header"

const DashboardLayout = ({ children }) => {
    const [isOpenSidebar, setIsOpenSidebar] = useState(false)

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar
                isOpen={isOpenSidebar}
                onClose={() => setIsOpenSidebar(false)}
            />

            <div className="flex-1 flex flex-col">
                <Header onMenuClick={() => setIsOpenSidebar(true)} />
                <main className="p-6">{children}</main>
            </div>
        </div>
    )
}

export default DashboardLayout
