import { User} from "lucide-react"
import { NavLink } from "react-router-dom"


export default function Header() {
    return (
        <header className="flex justify-between items-center border-b-2 border-neutral-600 p-8">
            <img className ="w-[250px]" src="src/assets/Images/bumble_header-01.webp"/>
            <NavLink to='/user' className="bg-amber-300 flex items-center justify-center rounded-full w-10 h-10 mr-5 cursor-pointer hover:bg-amber-200 transition-colors duration-300">
                 <User stroke="black"/>
            </NavLink>
        </header>
    )
}