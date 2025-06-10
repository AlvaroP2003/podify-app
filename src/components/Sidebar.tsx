
import { ChevronRight, House, Star, User} from "lucide-react"
import { useState } from "react"
import { NavLink } from "react-router-dom"

export default function Sidebar() {

    const [sidebarOpen, setSidebarOpen] = useState(true)
    
    return (
        <div className={`flex flex-col gap-10 py-10 px-5 border-r-2 border-neutral-600 h-screen transition-all duration-300 ease-in-out overflow-hidden ${sidebarOpen ? 'min-w-[250px]' : 'min-w-[80px]'}`}>
            <div className={`flex ${ sidebarOpen ? 'justify-between' : 'justify-center' } items-center`}>
                {sidebarOpen ? <h1 className="text-xl">Navigation</h1> : ''}
                <ChevronRight
                    className="cursor-pointer"
                    onClick={() => setSidebarOpen(!sidebarOpen)}/>
            </div>

            <ul className="flex flex-col gap-1">
             <NavLink
                to="/"
                className={({ isActive }) =>
                    `flex items-center gap-4 p-2 rounded hover:bg-neutral-800 whitespace-nowrap ${isActive ? "font-smeibold text-amber-200" : "text-neutral-400"}`
                }
                >
                <House size={20} />
                {sidebarOpen ? <p>Home</p> : ''}
            </NavLink>

            <NavLink
                to="/favourites"
                className={({ isActive }) =>
                    `flex items-center gap-4 p-2 rounded hover:bg-neutral-800 whitespace-nowrap ${isActive ? "font-semibold text-amber-200" : "text-neutral-400"}`
                }
                >
                <Star size={20} />
                {sidebarOpen ? <p>Favourites</p> : ''}
            </NavLink>

            <NavLink
                to="/user"
                className={({ isActive }) =>
                    `flex items-center gap-4 p-2 rounded hover:bg-neutral-800 whitespace-nowrap ${isActive ? "font-semibold text-amber-200" : "text-neutral-400"}`
                }
                >
                <User size={20} />
                {sidebarOpen ? <p>Account Settings</p> : ''}
            </NavLink>

            </ul>
        </div>
    )
}