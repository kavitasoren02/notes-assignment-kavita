import { Fragment } from "react"
import { NavLink } from "react-router-dom"

const Sidebar = ({ isOpen, onClose }) => {
    const navibar = [
        { title: "Notes", path: "/" },
        { title: "Profile", path: "/profile" }
    ]

    return (
        <Fragment>
            <div
                onClick={onClose}
                className={`fixed inset-0 bg-black/40 z-30 transition-opacity md:hidden ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
            />

            <aside
                className={`fixed inset-y-0 left-0 z-40 w-64 bg-white transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"} md:static md:translate-x-0 md:block`}
            >
                <div className="p-6 font-bold text-xl">
                    NotesApp
                </div>

                <nav className="px-4 py-4 space-y-2">
                    {navibar.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            onClick={onClose}
                            className={({ isActive }) => `block px-4 py-2 rounded-md transition hover:bg-gray-200 ${isActive ? "bg-blue-200 font-semibold" : ""}`}
                        >
                            {item.title}
                        </NavLink>
                    ))}
                </nav>
            </aside>
        </Fragment>
    )
}

export default Sidebar
