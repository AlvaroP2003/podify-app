import { Play, Heart } from "lucide-react"
import { useEpisode } from "./EpisodeContext";
import { useState, useEffect } from "react";

export default function EpisodeModal() {
    const {
        selectedPodcast,selectedSeason,selectedEpisode,setModalOpen,
    } = useEpisode()

    const seasonImage = selectedPodcast?.seasons?.[selectedSeason - 1]?.image;
    const isOpen = Boolean(selectedEpisode);

    // Favourites State
        const [favourites,setFavourites] = useState(JSON.parse(localStorage.getItem('favourites')) || [])
    
        useEffect(() => {
            localStorage.setItem('favourites', JSON.stringify(favourites))
        },[favourites])


    // Check if selectedEpisode exists in favourites
    const isFavourite = (podcast,season,episode) => {
         const isFavourite = favourites.some(fav => 
            fav.podcast.id === podcast.id &&
            fav.season === season &&
            fav.episode.episode === episode.episode &&
            fav.episode.title === episode.title
        )

        if(isFavourite) {
            return true
        } else {
            return false
        }
    }


    // Function to toggle favourite state
    const toggleFavourite = (podcast,season,episode) => {

        if(isFavourite(podcast,season,episode)) {

            const updatedFavourites = favourites.filter(fav => 
                !(fav.podcast.id === podcast.id &&
                    fav.season === season &&
                    fav.episode.episode === episode.episode &&
                    fav.episode.title === episode.title)
             )

             console.log('Removed from favourites');

             setFavourites(updatedFavourites)
        } else {
            const newFavourite = {
                podcast,
                season,
                episode,
            };

            console.log('Added to favourites');
            

            setFavourites([...favourites,newFavourite])
        }
    }


    return (
        <div
            onClick={() =>
                setModalOpen(false)}
            className={`
                absolute inset-0 z-40
                bg-black/70
                flex justify-center items-center
                transition-opacity duration-300
                ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
            `}
        >
            <div
                className={`
                    max-w-[850px] w-full
                    flex flex-col gap-2.5
                    bg-neutral-/70 backdrop-blur-2xl
                     p-7.5 rounded overflow-hidden shadow-lg
                    border-2 border-neutral-800
                    transition-all duration-300
                    ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
                `}
            >
                {/* Modal content */}
                <div className="relative z-10 flex gap-5 text-neutral-300">
                    
                    <div className="relative max-w-[45%] min-w-[45%]">

                    <img 
                        className="rounded"
                        src={seasonImage}
                        alt="Episode"
                    />

                    </div>
                    
                    <div className="relative flex flex-col gap-2 w-full">
                        <h1 className="text-2xl font-medium text-neutral-200">{selectedEpisode?.title}</h1>
                            <h2 className="text-md text-neutral-400">{selectedPodcast?.title}</h2>
                                <p className="text-sm text-neutral-300 leading-relaxed">{selectedEpisode?.description}</p>


                         <div className="absolute bottom-0 flex justify-between w-full p-2">
                                <button 
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            toggleFavourite(selectedPodcast,selectedSeason,selectedEpisode)}}
                                        className="cursor-pointer active:scale-115">

                                    {isFavourite(selectedPodcast,selectedSeason,selectedEpisode) ?
                                    <Heart size={35} fill="#fbbf24" stroke="#fbbf24" strokeWidth={1.25}/> :
                                    <Heart size={35} fill="none" stroke="#fbbf24" strokeWidth={1.25}/>
                                    }

                                </button>

                                  <button 
                                        className="cursor-pointer flex justify-center items-center bg-amber-300 hover:bg-amber-200 min-h-10 min-w-10 rounded-full">
                                    <Play fill="neutral-400" stroke="neutral-400"/>
                                </button>
                        </div>
                    </div>
                
                </div>

                <div>

                </div>

               

            </div>
        </div>
    )
}