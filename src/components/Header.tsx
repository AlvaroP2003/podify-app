import { User} from "lucide-react"
import UserDetails from "./UserDetails"
import { useState } from "react";


export default function Header() {

    const [modalOpen, setModalOpen] = useState(false);

    return (
        <header className="flex justify-between items-center border-b-2 border-neutral-600 p-5 lg:px-10 lg:py-7.5">
            <img className ="w-[150px] lg:w-[250px]" src="src/assets/Images/bumble_header-01.webp"/>
            <button 
                onClick={() => {setModalOpen(true)}}
                className="bg-amber-300 flex items-center justify-center rounded-full w-10 h-10 cursor-pointer hover:bg-amber-200 transition-colors duration-300">
                 <User stroke="black"/>
            </button>
            {modalOpen &&
            <UserDetails
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
            />
            }
        </header>
    )
}