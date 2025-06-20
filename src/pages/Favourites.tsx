import { FolderSearch } from "lucide-react"
import { useState,useEffect } from "react"
import toast from "react-hot-toast"
  
 export default function Favourites() {

     // Favourites State
    const [favourites, setFavourites] = useState([])
     
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


      const displayedFavourites = favourites.map((cast, index) => {
    const image =
      cast?.podcast?.seasons?.[cast.season -1]?.image || "/fallback-image.png";

    return (
      <div
        key={`${cast.podcast?.id}-${cast.season}-${cast.episode?.episode}`}
        className="flex justify-between items-center hover:bg-neutral-800 p-3 w-full border-b border-neutral-700 transition-all"
      >
        <div className="flex gap-5">
          <img className="w-[100px] rounded" src={image} alt="Season artwork" />
          <div className="flex flex-col justify-center gap-1">
            <h1 className="text-xl font-semibold">{cast.episode?.title || "Untitled"}</h1>
            <h2 className="text-lg text-neutral-400">{cast.podcast?.title || "Unknown Podcast"}</h2>
            <span className="flex gap-2 text-sm text-neutral-400">
              <h3>S {cast.season ?? "?"}</h3>
              <h3>E {cast.episode?.episode ?? "?"}</h3>
            </span>
          </div>
        </div>

        <button
          onClick={() => removeFavourite(cast.podcast, cast.season, cast.episode)}
          className="bg-neutral-700 w-[100px] h-[40px] rounded-full hover:bg-red-500 cursor-pointer transition-all"
        >
          Remove
        </button>
      </div>
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