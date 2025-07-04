import { FolderSearch, Play, Pause } from "lucide-react"
import { useState,useEffect } from "react"
import toast from "react-hot-toast"
import { useEpisode } from "../components/EpisodeContext"
import EpisodeModal from "../components/EpisodeModal"
  
 export default function Favourites() {

  const {
    currentPodcast,setCurrentPodcast,
    currentSeason,setCurrentSeason,
    currentEpisode,setCurrentEpisode,
    selectedPodcast,setSelectedPodcast,
    selectedSeason, setSelectedSeason,
    selectedEpisode, setSelectedEpisode,
    modalOpen,setModalOpen,
  } = useEpisode()

     // Favourites State
    const [favourites, setFavourites] = useState([])
    const [isPlaying,setIsPlaying] = useState(false)
     
        useEffect(() => {
        const storedFavs = localStorage.getItem('favourites')
        if(storedFavs) setFavourites(JSON.parse(storedFavs))
    },[])

    useEffect(() => {
        localStorage.setItem('favourites', JSON.stringify(favourites))
    }, [favourites])


    const removeFavourite = (podcast,season,episode) => {
          const updatedFavourites = favourites.filter(fav => 
                !(fav.podcast.id === podcast.id &&
                    fav.season === season &&
                    fav.episode.episode === episode.episode &&
                    fav.episode.title === episode.title)
             )

             toast.error('Removed from favourites')

             setFavourites(updatedFavourites)
    }

    
    const sameCast = (podcast, season, episode) => {
      return (
        podcast?.id === currentPodcast?.id &&
        Number(season) === Number(currentSeason) &&
        episode?.episode === currentEpisode?.episode &&
        episode?.title === currentEpisode?.title // extra safeguard
      );
    };


   const displayedFavourites = favourites.map((cast, index) => {
    const image = cast?.podcast?.seasons?.[cast.season -1]?.image || "/fallback-image.png";

    return (
      <>
      {selectedEpisode && modalOpen && <EpisodeModal/>}
      <div
        key={index}
        onClick={() => {
          setSelectedPodcast(cast.podcast)
          setSelectedSeason(cast.season)
          setSelectedEpisode(cast.episode)
          setModalOpen(true)
          }}
        className="flex justify-between items-center hover:bg-neutral-800 p-2 w-full border-b border-neutral-700 transition-all rounded"
      >
        <div className="flex gap-5 items-center">
          <button
            className="text-white p-2 rounded-full bg-amber-300 hover:bg-amber-200 cursor-pointer"
              onClick={e => {
                e.stopPropagation();
                setCurrentPodcast(cast.podcast)
                setCurrentSeason(cast.season)
                setCurrentEpisode(cast.episode); // Just play the episode
                }}
                >
              {isPlaying ? <Pause size={20} stroke="text-neutral-800" fill="text-neutral-800" /> : <Play size={20} stroke="text-neutral-800" fill="text-neutral-800" />}
          </button>
          <img className="w-[75px] lg:w-[100px] rounded" src={image} alt="Season artwork" />
          <div className="flex flex-col justify-center gap-1">
            <h1 className={`text-md lg:text-xl font-semibold ${sameCast(cast.podcast,cast.season,cast.episode) ? 'text-amber-300' : 'text-neutral-200'}`}>{cast.episode?.title || "Untitled"}</h1>
            <h2 className="text-sm lg:text-lg text-neutral-400">{cast.podcast?.title || "Unknown Podcast"}</h2>
            <span className="flex gap-2 text-sm text-neutral-400">
              <h3>S {cast.season ?? "?"}</h3>
              <h3>E {cast.episode?.episode ?? "?"}</h3>
            </span>
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation()
            removeFavourite(cast.podcast, cast.season, cast.episode)
          }}
          className="bg-neutral-700 w-[100px] h-[40px] rounded-full hover:bg-red-500 cursor-pointer transition-all"
        >
          Remove
        </button>
      </div>

      </>
    );
  });

  return (
    <section className="p-10 w-full">
      <h1 className="text-2xl">Favourites</h1>
      <div className="flex flex-col py-10">
        {favourites.length === 0 ? (
          <div
             className="absolute left-[45%] top-[45%] flex flex-col items-center justify-center gap-3 text-neutral-500">
            <FolderSearch size={100} strokeWidth={1}/> <p className="text-xl font-semibold">No favourites added yet</p></div>
        ) : (
          displayedFavourites
        )}
      </div>
    </section>
  );
}