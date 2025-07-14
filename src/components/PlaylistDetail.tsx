import { useEffect, useState } from "react"
import { Disc3, Play, Pause, Trash2 } from "lucide-react";
import { useEpisode } from "./EpisodeContext";
import EpisodeModal from "./EpisodeModal";
import { toast } from "react-hot-toast";
import sameCast from "../utils/sameCast"; // Add this import


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
                className="flex justify-between items-center hover:bg-neutral-800 p-2.5 lg:p-5 w-full border-b border-neutral-700 transition-all rounded"
            >
            <div className="flex gap-3 lg:gap-5 items-center flex-1 min-w-0">
                <button
                    className="text-white p-2 rounded-full bg-amber-300 hover:bg-amber-200 cursor-pointer flex-shrink-0"
                    onClick={e => {
                        e.stopPropagation();
                        setCurrentPodcast(item.podcast)
                        setCurrentSeason(item.season)
                        setCurrentEpisode(item.episode);
                    }}
                >
                    {isPlaying ? <Pause size={20} stroke="text-neutral-800" fill="text-neutral-800" /> : <Play size={20} stroke="text-neutral-800" fill="text-neutral-800" />}
                </button>
                <img className="w-[60px] lg:w-[100px] rounded flex-shrink-0" src={image} alt="Season artwork" />
                <div className="flex flex-col justify-center gap-1 min-w-0 flex-1">
                    <h1 className={`text-sm lg:text-xl font-semibold lg:whitespace-nowrap overflow-hidden ${sameCast(item.podcast, item.season, item.episode, currentPodcast, currentSeason, currentEpisode) ? 'text-amber-300' : 'text-neutral-200'}`}>
                        <span className="inline-block lg:inline animate-marquee lg:animate-none">
                            {item.episode?.title || "Untitled"}
                        </span>
                    </h1>
                    <h2 className="text-xs lg:text-lg text-neutral-400 truncate">{item.podcast?.title || "Unknown Podcast"}</h2>
                    <span className="flex gap-2 text-xs lg:text-sm text-neutral-400">
                        <h3>S {item.season ?? "?"}</h3>
                        <h3>E {item.episode?.episode ?? "?"}</h3>
                    </span>
                </div>
            </div>

            <button
                onClick={(e) => {
                    e.stopPropagation()
                    removeEpisode(item.podcast,item.season,item.episode)                    
                }}
                className="bg-neutral-700 p-2 lg:w-[100px] lg:h-[40px] rounded-full hover:bg-red-500 cursor-pointer transition-all flex-shrink-0 flex items-center justify-center ml-2"
            >
                <Trash2 size={16} className="lg:hidden" />
                <span className="hidden lg:block">Remove</span>
            </button>
        </div>
    );
})

    return (
        <>
        {selectedEpisode && modalOpen && <EpisodeModal/>}

        <div 
            onClick={() => {setSelectedPlaylist(null)}}
            className="absolute inset-0 bg-black/60 flex items-center justify-center z-50"
        >
            <div className="flex flex-col gap-3 border-1 border-neutral-700 bg-neutral-900/50 backdrop-blur-2xl rounded-lg p-5 w-full lg:max-w-[800px] lg:min-w-[800px]">

            <div className={`relative ${selectedPlayList?.episodes?.length > 1 ? 'grid grid-cols-2 grid-rows-2' : 'flex items-center justify-center'} border-2 border-neutral-800 gap-1 rounded-lg overflow-hidden max-w-[200px] min-w-[200px] min-h-[200px]`}>

                {selectedPlayList?.episodes?.length === 0 ? 
                <div className="flex justify-center items-center w-full h-full">
                    <Disc3 size={100} strokeWidth={1} stroke="gray"/>
                </div>
                : selectedPlayList?.episodes?.slice(0,4).map((episode,index) => (
                    <img 
                        className="rounded w-full"
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
