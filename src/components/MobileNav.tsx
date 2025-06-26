import { NavLink } from "react-router-dom";

import { HomeIcon, MusicalNoteIcon,HeartIcon } from "@heroicons/react/16/solid"

export default function MobileNav() {
    return (
             <ul className="flex justify-evenly w-full h-full items-center">
             <NavLink
                    to="/"
                    className={({ isActive }) =>
                        `flex flex-col items-center gap-1 p-2 round whitespace-nowrap ${
                        isActive ? "font-semibold text-white" : "text-neutral-400"
                        }`
                    }
                    >
                    {({ isActive }) => (
                        <>
                        <HomeIcon
                            className="max-h-7 max-w-7 min-h-7 min-w-7"
                            strokeWidth={1}
                            stroke={isActive ? "" : "gray"}
                            fill={isActive ? "white" : "none"}
                        />
                        <p>Home</p>
                        </>
                    )}
                 </NavLink>

                 <NavLink
                    to="/library"
                    className={({ isActive }) =>
                        `flex flex-col items-center gap-1 p-2 rounded whitespace-nowrap ${
                        isActive ? "font-semibold text-white" : "text-neutral-400"
                        }`
                    }
                    >
                    {({ isActive }) => (
                        <>
                        <MusicalNoteIcon
                            className="max-h-7 max-w-7 min-h-7 min-w-7"
                            strokeWidth={1}
                            stroke={isActive ? "" : "gray"}
                            fill={isActive ? "white" : "none"}
                        />
                        <p>Playlists</p>
                        </>
                    )}
                 </NavLink>

                 <NavLink
                    to="/favourites"
                    className={({ isActive }) =>
                        `flex flex-col items-center gap-1 p-2 rounded whitespace-nowrap ${
                        isActive ? "font-semibold text-white" : "text-neutral-400"
                        }`
                    }
                    >
                    {({ isActive }) => (
                        <>
                        <HeartIcon
                            className="max-h-7 max-w-7 min-h-7 min-w-7"
                            strokeWidth={1}
                            stroke={isActive ? "" : "gray"}
                            fill={isActive ? "white" : "none"}
                        />
                        <p>Favourites</p>
                        </>
                    )}
                 </NavLink>
            </ul>
    )
}