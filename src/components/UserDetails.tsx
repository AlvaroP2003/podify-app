import { useEffect,useState } from "react"
import { User } from "lucide-react"
import ConfirmModal from "./confirmModal"
import { toast } from "react-hot-toast"

export default function UserDetails({modalOpen,setModalOpen}: {modalOpen: boolean, setModalOpen: (open: boolean) => void}) {

    const [openModal,setOpenModal] = useState(false)

      // Favourites State
        const [favourites, setFavourites] = useState([])
         
            useEffect(() => {
            const storedFavs = localStorage.getItem('favourites')
            if(storedFavs) setFavourites(JSON.parse(storedFavs))
        },[])
    
        useEffect(() => {
            localStorage.setItem('favourites', JSON.stringify(favourites))
        }, [favourites])


      // Stored Playlists
        const [playLists, setPlaylists] = useState([])
         
         useEffect(() => {
            const storedPlay = localStorage.getItem('playlists')
            if(storedPlay) setPlaylists(JSON.parse(storedPlay))
        },[])
    
        useEffect(() => {
            localStorage.setItem('playlists', JSON.stringify(playLists))
        }, [playLists])


        // Function to clear local storage
        const resetAccount = () => {
            setFavourites([])
            setPlaylists([])
            setOpenModal(false)
            toast.success('Account Reset')
        }

    return (
        <section 
            onClick={() => setModalOpen(false)}
            className="absolute inset-0 bg-black/50 backdrop-blur-xs z-50">

            {openModal && 
            <ConfirmModal 
                setOpenModal={setOpenModal}
                resetAccount={resetAccount}
                />}

            <div className={`flex flex-col gap-10 fixed top-0 w-[50%] lg:w-[25%] h-full bg-neutral-900 z-50 transition-all p-5 lg:p-10 ${modalOpen ? 'right-0' : 'right-[-25%]'}`}>

                <div className="flex flex-col  items-center gap-2.5">
                    <div className="flex justify-center items-center bg-amber-300 w-15 h-15 rounded-full">
                        <User size={40} strokeWidth={1} stroke="black"/>
                    </div>
                    <h1 className="text-2xl text-neutral-200">User Name</h1>
                </div>

                <div className="bg-neutral-800 p-5 rounded">
                    <h1 className="text-lg mb-4 font-semibold text-neutral-200">Statistics</h1>

                    <div className="flex flex-col gap-2">

                        <div className="flex justify-between text-neutral-400">
                            <h2>Episodes Watched</h2>
                            <p>{favourites.length}</p>
                        </div>

                        <div className="flex justify-between text-neutral-400">
                            <h2>Total Favourites</h2>
                            <p>{favourites.length}</p>
                        </div>

                        <div className="flex justify-between text-neutral-400">
                            <h2>Total Playlists</h2>
                            <p>{playLists.length}</p>
                        </div>
                        
                    </div>
                </div>

                <button 
                    onClick={(e) => {
                        e.stopPropagation()
                        setOpenModal(true)
                    }}
                    className="cursor-pointer px-5 py-2.5 border-2 border-red-500 text-red-500 font-semibold rounded hover:bg-red-500 hover:text-neutral-900 transition-all">
                    Reset Account
                </button>
            </div>
        </section>
    )
}