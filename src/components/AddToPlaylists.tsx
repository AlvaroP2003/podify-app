import { useEffect,useState } from "react"

export default function AddToPLaylist ({setPlaylistModal}) {

      // Stored Playlists
            const [playLists, setPlaylists] = useState([])
             
             useEffect(() => {
                const storedPlay = localStorage.getItem('playlists')
                if(storedPlay) setPlaylists(JSON.parse(storedPlay))
            },[])
        
            useEffect(() => {
                localStorage.setItem('playlists', JSON.stringify(playLists))
            }, [playLists])


        const displayedPlaylists = playLists.map((list,index) => (
            <div 
                key={index}
                onClick={() => {addToPLaylist()}}
                className="flex flex-col gap-2.5 hover:bg-neutral-800 p-2.5 rounded"
                >
                <div className="min-w-[150px] min-h-[150px] border-1 rounded">
                    <img src="#"/>
                </div>
                <h1 className="text-neutral-300 text-lg">{list.name}</h1>
            </div>
        ))


    return (
        <div 
            onClick={() => {setPlaylistModal(false)}}
            className="absolute inset-0 bg-black/50 flex justify-center items-center">
            <div className="bg-neutral-900 rounded-lg w-[750px] h-[500px] p-10">
                <h1 className="text-2xl font-semibold text-center">Choose a Playlist</h1>
                <div className="flex gap-1 p-10">
                    {displayedPlaylists}
                </div>
            </div>
        </div>
    )
}