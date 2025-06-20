import { useEffect,useState } from "react"
import { User } from "lucide-react"

export default function UserDetails({modalOpen,setModalOpen}: {modalOpen: boolean, setModalOpen: (open: boolean) => void}) {

      // Favourites State
        const [favourites, setFavourites] = useState([])
         
            useEffect(() => {
            const storedFavs = localStorage.getItem('favourites')
            if(storedFavs) setFavourites(JSON.parse(storedFavs))
        },[])
    
        useEffect(() => {
            localStorage.setItem('favourites', JSON.stringify(favourites))
        }, [favourites])
    

    return (
        <section 
            onClick={() => setModalOpen(false)}
            className="absolute inset-0 bg-black/50 backdrop-blur-xs z-50">

            <div className={`fixed top-0 w-[25%] h-full bg-neutral-900 z-50 transition-all ${modalOpen ? 'right-0' : 'right-[-25%]'}`}>

                <div className="flex flex-col gap-5 border-1">
                    <div className="flex justify-center items-center bg-amber-300 w-20 h-20 rounded-full">
                        <User size={50} strokeWidth={1}/>
                    </div>
                    <h1 className="text-2xl text-neutral-200">User Name</h1>
                </div>

                <div>

                </div>
            </div>
        </section>
    )
}