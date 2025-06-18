import { useEffect } from "react"
import { useEpisode } from "../components/EpisodeContext"
 
 export default function Favourites() {
    const {favourites,setFavourites} = useEpisode()

    useEffect(() => {
        console.log(favourites);
    },[favourites])


    const displayedFavourites = favourites.map((cast,index) => (
        <div key={index}>
            <img src={cast?.seasons?.[cast.season - 1].image}/>
        </div>
    ))

    return (
        <section className="p-10">
            <h1 className="text-2xl">Favourites</h1>

            <div>
                {displayedFavourites}
            </div>
        </section>
    )
 }