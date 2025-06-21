import { useEffect, useState } from "react"
import { Disc3, Play, Pause } from "lucide-react";
import { useEpisode } from "./EpisodeContext";
import EpisodeModal from "./EpisodeModal";
import { toast } from "react-hot-toast";


export default function PlaylistDetail({selectedPlayList,setSelectedPlaylist}) {

    const [isPlaying,setIsPlaying] = useState(false)

        const removeEpisode = (podcast,season,episode) => {
          const updatedPlaylist = selectedPlayList && selectedPlayList.episodes.filter(fav => 
                !(fav.podcast.id === podcast.id &&
                    fav.season === season &&
                    fav.episode.episode === episode.episode &&
                    fav.episode.title === episode.title)
             )

             toast.error(`Removed episode from ${selectedPlayList.name}`)

            setSelectedPlaylist({
                ...selectedPlayList,
                episodes: updatedPlaylist
            })
    }


    const {
        currentPodcast,setCurrentPodcast,
        currentSeason,setCurrentSeason,
        currentEpisode,setCurrentEpisode,
        selectedPodcast,setSelectedPodcast,
        selectedSeason, setSelectedSeason,
        selectedEpisode, setSelectedEpisode,
        modalOpen,setModalOpen,
        } = useEpisode()



    // Episodes to display in playlist
    const displayedEpisodes = selectedPlayList && selectedPlayList?.episodes?.map((item,index) => {
        const image = item?.podcast?.seasons?.[item.season -1]?.image || "/fallback-image.png";

       return (
            <div
                key={index}
                onClick={(e) => {
                    e.stopPropagation()
                    setSelectedPodcast(item.podcast)
                    setSelectedSeason(item.season)
                    setSelectedEpisode(item.episode)
                    setModalOpen(true)
                }}
                className="flex justify-between items-center hover:bg-neutral-800 p-3 w-full border-b border-neutral-700 transition-all"
            >
            <div className="flex gap-5 items-center">
                <button
                    className="text-white p-2 rounded-full bg-amber-300 hover:bg-amber-200 cursor-pointer"
                    onClick={e => {
                    e.stopPropagation();
                    setCurrentPodcast(item.podcast)
                    setCurrentSeason(item.season)
                    setCurrentEpisode(item.episode);
                    }}
                    >
                        {isPlaying ? <Pause size={20} stroke="text-neutral-800" fill="text-neutral-800" /> : <Play size={20} stroke="text-neutral-800" fill="text-neutral-800" />}
                </button>
                <div className="flex gap-5">
                    <img className="w-[80px] rounded" src={image} alt="Season artwork" />
                        <div className="flex flex-col justify-center gap-1">
                            <h1 className="text-md font-semibold">{item.episode?.title || "Untitled"}</h1>
                            <h2 className="text-sm text-neutral-400">{item.podcast?.title || "Unknown Podcast"}</h2>
                            <span className="flex gap-2 text-xs text-neutral-400">
                                <h3>S {item.season ?? "?"}</h3>
                                <h3>E {item.episode?.episode ?? "?"}</h3>
                            </span>
                        </div>
                </div>
            </div>

            <button
                onClick={(e) => {
                    e.stopPropagation()
                    removeEpisode(item.podcast,item.season,item.episode)                    
                }}
                className="bg-neutral-700 px-5 py-2.5 rounded-full hover:bg-red-500 cursor-pointer transition-all text-sm"
                >
                Remove
            </button>

            </div>
            );
})

    useEffect(() => {
        console.log(selectedPlayList);
    },[selectedPlayList])


    return (
        <>
        {selectedEpisode && modalOpen && <EpisodeModal/>}

        <div 
            onClick={() => {setSelectedPlaylist(null)}}
            className="absolute inset-0 bg-black/60 flex items-center justify-center z-50"
        >
            <div className="flex flex-col gap-3 border-1 border-neutral-700 bg-neutral-900/50 backdrop-blur-2xl rounded-lg p-5 max-w-[800px] min-w-[800px]">

            <div className={`relative ${selectedPlayList?.episodes?.length > 1 ? 'grid grid-cols-2 grid-rows-2' : 'flex items-center justify-center'} gap-1 rounded-lg overflow-hidden w-[200px] border-red-500`}>

                {selectedPlayList?.episodes?.length === 0 ? 
                <div className="flex justify-center items-center w-full h-full">
                    <Disc3 size={100} strokeWidth={1} stroke="gray"/>
                </div>
                : selectedPlayList?.episodes?.slice(0,4).map((episode,index) => (
                    <img 
                        className="h-full rounded w-full"
                        key={index} src={episode.podcast.seasons[episode.season -1].image}/>
                ))}

            </div>

                <h1 className="text-3xl font-semibold text-neutral-200">
                    {selectedPlayList.name}
                </h1>

                <div className="h-[300px] overflow-y-scroll">
                    {displayedEpisodes}
                </div>

        </div>
        </div>
        </>
    )
}