import { useEffect,useState } from "react"
import { toast } from "react-hot-toast";

export default function PlaylistModal({setModalOpen,playLists,setPlaylists}) {

    const [inputValue,setInputValue] = useState('')


    const handleChange = (e) => setInputValue(e.target.value)
    

    // Funciton to create a new playlist
    const createPlaylist = (name) => {
        if (!name.trim()) return;

        // Check if a playlist with the same name already exists (case-insensitive)
        const duplicate = playLists.some(
            (list) => list.name.toLowerCase() === name.trim().toLowerCase()
        );

        if (duplicate) {
            toast.error('Cannot have duplicate playlist names')
            return;
        }

        setPlaylists((prev) => {
            const updated = [...prev, { name: name.trim(), episodes: [] }];
            localStorage.setItem("playlists", JSON.stringify(updated));
            return updated;
        });

        console.log("playlist created");
        setModalOpen(false);
        setInputValue("");
        };


            
    return (
        <div
            onClick={() => {setModalOpen(false)}} 
            className="absolute inset-0 bg-black/50 backdrop-blur-[1px] z-40">
            <div 
                onClick={(e) => e.stopPropagation()}
                className="absolute left-[50%] top-[30%] flex flex-col gap-7.5 items-center transform translate-x-[-50%] border-1 border-neutral-600 bg-neutral-900 rounded-lg min-w-[300px] p-10 z-50">

                <h1 className="text-2xl">Give your playlist a name</h1>

                <input
                    value={inputValue}
                    onChange={handleChange}
                    className="border-b p-2.5 text-center"
                    placeholder="playlist name..."></input>

                <div className="flex justify-evenly w-full">
                    <button 
                        onClick={() => {setModalOpen(false)}}
                        className="cursor-pointer hover:bg-neutral-600 px-6 py-2 rounded-full bg-neutral-700 text-neutral-200">Cancel</button>
                    <button 
                        onClick={() => {createPlaylist(inputValue)}}
                        className="cursor-pointer hover:bg-amber-200 px-6 py-2 rounded-full bg-amber-300 text-neutral-800 font-semibold">Create</button>
            </div>
        </div>
        </div>
 
    )
}