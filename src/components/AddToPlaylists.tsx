import { useEffect,useState } from "react"
import { useEpisode } from "./EpisodeContext"
import { toast } from "react-hot-toast"
import { Disc3 } from "lucide-react"

export default function AddToPLaylist ({setPlaylistModal}) {

    const {currentPodcast,currentSeason,currentEpisode} = useEpisode()

      // Stored Playlists
            const [playLists, setPlaylists] = useState([])
             
             useEffect(() => {
                const storedPlay = localStorage.getItem('playlists')
                if(storedPlay) setPlaylists(JSON.parse(storedPlay))
            },[])
        
            useEffect(() => {
                localStorage.setItem('playlists', JSON.stringify(playLists))
            }, [playLists])


const addToPlaylist = (index, podcast, season, episode) => {
    setPlaylists((prev) => {
        const updated = [...prev];
        const existingPlaylist = updated[index];

        if (!existingPlaylist) {
            toast.error(`Playlist not found at index ${index}`);
            return prev;
        }

        const newEpisode = { podcast, season, episode };

        const isDuplicate = existingPlaylist.episodes.some(
            ep =>
                ep.podcast.id === podcast.id &&
                ep.season === season &&
                ep.episode.episode === episode.episode &&
                ep.episode.title === episode.episode.title
        );

        if (!isDuplicate) {
            existingPlaylist.episodes.push(newEpisode);
            toast.success(`Added episode to "${existingPlaylist.name}"`);
            console.log(`Added episode to ${existingPlaylist.name}`);
            
        } else {
            toast(`Episode already in "${existingPlaylist.name}"`);
            console.log('Episode already im playlist');
        }

        localStorage.setItem("playlists", JSON.stringify(updated));
        return updated;
    });
};

        const displayedPlaylists = playLists.map((list,index) => (
            <div 
                key={index}
                onClick={(e) => {
                    e.stopPropagation()
                    addToPlaylist(index,currentPodcast,currentSeason,currentEpisode)}}
                className="cursor-pointer flex flex-col gap-2.5 hover:bg-neutral-800 p-2.5 rounded w-[200px] bg-neutral-900 border-1 border-neutral-800"
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
                <h1 className="text-neutral-300 text-lg">{list.name}</h1>
            </div>
        ))


    return (
        <div 
            onClick={() => {setPlaylistModal(false)}}
            className="absolute inset-0 bg-black/70 flex justify-center items-center">
            <div className="bg-neutral-900/80 backdrop-blur-lg border-1 border-neutral-700 rounded-lg w-[750px] h-[500px] p-5">
                <h1 className="text-2xl font-semibold text-center">Add to Playlist</h1>
                <div className="flex gap-1 p-10">
                    {displayedPlaylists}
                </div>
            </div>
        </div>
    )
}