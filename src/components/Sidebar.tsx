
import { ChevronRight} from "lucide-react"
import { HomeIcon, MusicalNoteIcon,HeartIcon } from "@heroicons/react/16/solid"
import { useState } from "react"
import { NavLink } from "react-router-dom"

export default function Sidebar() {

    const [sidebarOpen, setSidebarOpen] = useState<true | false>(false)
    
    return (
        <div className={`flex flex-col gap-10 py-10 px-5 border-r-2 border-neutral-600 h-screen transition-all duration-300 ease-in-out overflow-hidden ${sidebarOpen ? 'min-w-[250px]' : 'min-w-[80px]'}`}>
            
            <div className={`flex ${ sidebarOpen ? 'justify-between' : 'justify-center' } items-center text-neutral-300`}>
                {sidebarOpen ? <h1 className="text-xl">Navigation</h1> : ''}
                <ChevronRight
                    size={20}
                    className={`cursor-pointer transform transition-all duration-500 hover:bg-neutral-800 rounded ${sidebarOpen ? 'rotate-180' : 'rotate-0'}`}
                    onClick={() => setSidebarOpen(!sidebarOpen)}/>
            </div>

            <ul className="flex flex-col gap-1">
             <NavLink
                    to="/"
                    className={({ isActive }) =>
                        `flex items-center gap-4 p-2 rounded hover:bg-neutral-800 whitespace-nowrap ${
                        isActive ? "font-semibold text-white bg-neutral-800" : "text-neutral-400"
                        } ${sidebarOpen ? "w-50" : "w-9.5"}`
                    }
                    >
                    {({ isActive }) => (
                        <>
                        <HomeIcon
                            className="max-h-5 max-w-5 min-h-5 min-w-5"
                            strokeWidth={1}
                            stroke={isActive ? "" : "gray"}
                            fill={isActive ? "white" : "none"}
                        />
                        {sidebarOpen ? <p>Home</p> : null}
                        </>
                    )}
                 </NavLink>

                 <NavLink
                    to="/library"
                    className={({ isActive }) =>
                        `flex items-center gap-4 p-2 rounded hover:bg-neutral-800 whitespace-nowrap ${
                        isActive ? "font-semibold text-white bg-neutral-800" : "text-neutral-400"
                        } ${sidebarOpen ? "w-50" : "w9.5"}`
                    }
                    >
                    {({ isActive }) => (
                        <>
                        <MusicalNoteIcon
                            className="max-h-5 max-w-5 min-h-5 min-w-5"
                            strokeWidth={1}
                            stroke={isActive ? "" : "gray"}
                            fill={isActive ? "white" : "none"}
                        />
                        {sidebarOpen ? <p>Playlists</p> : null}
                        </>
                    )}
                 </NavLink>

                 <NavLink
                    to="/favourites"
                    className={({ isActive }) =>
                        `flex items-center gap-4 p-2 rounded hover:bg-neutral-800 whitespace-nowrap ${
                        isActive ? "font-semibold text-white bg-neutral-800" : "text-neutral-400"
                        } ${sidebarOpen ? "w-50" : "w-9.5"}`
                    }
                    >
                    {({ isActive }) => (
                        <>
                        <HeartIcon
                            className="max-h-5 max-w-5 min-h-5 min-w-5"
                            strokeWidth={1}
                            stroke={isActive ? "" : "gray"}
                            fill={isActive ? "white" : "none"}
                        />
                        {sidebarOpen ? <p>Favourites</p> : null}
                        </>
                    )}
                 </NavLink>

            </ul>
        </div>
    )
}