import { useEffect } from "react";

type PodcastData = {
    id:string;
    title:string;
    image:string;
    seasons:number;
    updated:string;
    genres:string[];
}

interface FiltersProps {
    podcast : PodcastData[];
    genres : string[];
    setGenres : (value:string) => void
}

export default function Filters({podcast,genres,setGenres}:FiltersProps) {

    const [searchParams, setSearchParams] = useSearchParams()
    
    const genreFilter = searchParams.get("genre") || ''    

     // Fetches all Genres for display
     useEffect(() => {
        const allGenres = podcast.flatMap(cast => cast.genres);
        const uniqueGenres = [...new Set(allGenres)];
        setGenres(uniqueGenres);
    }, [podcast]);
    
    const displayedGenres = genres.map((genre,index) => (
        <div
            key={index}
            className={`genre-el ${genre === genreFilter ? "active" : ""}`}
            onClick={() => onGenreClick(genre)}
            >
            {genre}
        </div>
    ))

    
    return (
        <div className="filter-sec">
            {displayedGenres}
        </div>
    )
}