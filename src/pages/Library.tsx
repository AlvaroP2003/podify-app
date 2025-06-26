import { useEffect, useState, useRef } from "react"
import { Plus,EllipsisVertical, SquarePen,Trash, Disc3 } from "lucide-react"

import { toast } from "react-hot-toast"

import PlaylistModal from "../components/playListModal"
import PlaylistDetail from "../components/PlaylistDetail"

export default function Library() {

    const [modalOpen,setModalOpen] = useState(false)
    const [openMenuIndex,setOpenMenuIndex] = useState(null)
    
    const [selectedPlayList,setSelectedPlaylist] = useState(null)

    const menuRefs = useRef([])

    // Closes submenu if clicked outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
            openMenuIndex !== null &&
            menuRefs.current[openMenuIndex] &&
            !menuRefs.current[openMenuIndex].contains(e.target)
            ) {
            setOpenMenuIndex(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
        }, [openMenuIndex]);


        // Stored Playlists
        const [playLists, setPlaylists] = useState([])
         
         useEffect(() => {
            const storedPlay = localStorage.getItem('playlists')
            if(storedPlay) setPlaylists(JSON.parse(storedPlay))
        },[])
    
        useEffect(() => {
            localStorage.setItem('playlists', JSON.stringify(playLists))
        }, [playLists])


        // Use effect
        useEffect(() => {
        if (selectedPlayList) {
            setPlaylists(prev => {
            const updated = prev.map(playlist =>
                playlist.name === selectedPlayList.name ? selectedPlayList : playlist
            );

            // Update local storage
            localStorage.setItem('playlists', JSON.stringify(updated));
            return updated;
            });
        }
        }, [selectedPlayList]);


        // Delete PLaylist Function
        const handleDelete = (playListName) => {
            const updatedPlaylists = playLists.filter(list => list.name !== playListName);

             toast.error(`Deleted ${playListName}`)
             setPlaylists(updatedPlaylists)
        }
         


        const displayedPlaylists = playLists && playLists.map((list,index) => (
            <div
                onClick={() => {
                    setSelectedPlaylist(list)
                    console.log(selectedPlayList);
                }}
                key={index}
                className="cursor-pointer bg-neutral-800 lg:w-[250px] lg:h-[300px] p-2.5 flex flex-col justify-center items-center gap-5 rounded-lg border-2 border-neutral-800 hover:border-amber-300 transform transition hover:-translate-y-1"
                >
                <div className={`relative ${list.episodes.length > 1 ? 'grid grid-cols-2 grid-rows-2' : 'flex items-center justify-center'} gap-1 rounded-lg flex-2 overflow-hidden w-full`}>
                    {list.episodes.length === 0 ? 
                    <div className="flex justify-center items-center w-full h-full">
                        <Disc3 size={100} strokeWidth={1} stroke="gray"/>
                    </div>
                    : list.episodes.slice(0,4).map((episode,index) => (
                        <img 
                            className="w-full h-full rounded"
                            key={index} src={episode.podcast.seasons[episode.season -1].image}/>
                    ))}
                </div>

                <div className="flex justify-between items-center w-full text-neutral-200">
                    <h1 className="text-lg">{list.name}</h1>
                    <div className="relative">
                        <EllipsisVertical
                            onClick={(e) => {
                                e.stopPropagation()
                                setOpenMenuIndex(openMenuIndex === index ? null : index)}}
                            size={17}/>
                        {openMenuIndex === index &&
                         <div 
                            ref={(el) => (menuRefs.current[index] = el )}
                            className="absolute -right-45 top-[50%] transform -translate-y-[50%] bg-neutral-700 flex flex-col rounded">
                            <button 
                                className="cursor-pointer flex justify-between items-center gap-5 text-neutral-200 px-5 py-2.5 rounded transition-all hover:bg-neutral-600 hover:text-amber-300">Edit Playlist <SquarePen size={17}/></button>
                            <button 
                                onClick={(e) => {
                                    e.stopPropagation()
                                    handleDelete(list.name)
                                }}
                                className="cursor-pointer flex justify-between items-center gap-5 text-neutral-200 px-5 py-2.5 rounded transition-all hover:bg-neutral-600 hover:text-red-500">Delete Playlist <Trash size={17}/></button>
                        </div>
                        }
                    </div>
                </div>
            </div>
        ))


    return (
        <section className="p-5 flex flex-col gap-5 lg:p-10">
            {selectedPlayList && 
                <PlaylistDetail 
                    selectedPlayList={selectedPlayList}
                    setSelectedPlaylist={setSelectedPlaylist}
                    />}
            {modalOpen && setPlaylists &&
             <PlaylistModal
                setModalOpen={setModalOpen}
                playLists={playLists}
                setPlaylists={setPlaylists}
                />}
            <h1 className="text-2xl text-neutral-200">Your Library</h1>

            <div className="grid grid-cols-2 lg:flex gap-5">
                <div 
                    onClick={() => {setModalOpen(true)}}
                    className="cursor-pointer text-neutral-600 border-3 border-neutral-600 lg:w-[250px] lg:h-[300px] flex flex-col justify-center items-center gap-2 rounded-lg hover:border-amber-300 hover:text-amber-300 transform transition hover:-translate-y-1">
                    <Plus size={50} strokeWidth={1.5}/>
                    <h1 className="text-md font-semibold">Create Playlist</h1>
                </div>
                {displayedPlaylists}
            </div>
        </section>
    )
}