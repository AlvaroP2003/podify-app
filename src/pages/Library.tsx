import { useEffect, useState } from "react"
import { Plus } from "lucide-react"

import PlaylistModal from "../components/playListModal"

export default function Library() {

    const [modalOpen,setModalOpen] = useState(false)

     // Favourites State
        const [playLists, setPlaylists] = useState([])
         
         useEffect(() => {
            const storedPlay = localStorage.getItem('playlists')
            if(storedPlay) setPlaylists(JSON.parse(storedPlay))
        },[])
    
        useEffect(() => {
            localStorage.setItem('playlists', JSON.stringify(playLists))
        }, [playLists])


        const createPlaylist = () => {
        }



    return (
        <section className="p-10">
            {modalOpen && <PlaylistModal setModalOpen={setModalOpen}/>}
            <h1 className="text-2xl">Your Library</h1>

            <div className="p-10">
                <div 
                    onClick={() => {setModalOpen(true)}}
                    className="cursor-pointer border-1 bg-neutral-800 border-neutral-700 w-[250px] h-[250px] flex flex-col justify-center items-center gap-2 rounded-lg transform transition hover:-translate-y-1">
                    <Plus size={50} strokeWidth={1.5}/>
                    <h1 className="text-md font-semibold">Create Paylist</h1>
                </div>
            </div>
        </section>
    )
}