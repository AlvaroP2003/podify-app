import { useEffect } from "react";
import { useSearchParams, SetURLSearchParams } from "react-router-dom";

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
    setGenres : (value:string) => void;
    genreFilter : string;
    setSearchParams : (SetURLSearchParams)
}

export default function Filters({podcast,genres,setGenres, genreFilter, setSearchParams}:FiltersProps) {
    
    const onGenreClick = (genre: string) => {
        if(genre === genreFilter) {
            setSearchParams(new URLSearchParams());
            return
        }

        setSearchParams(prev => {
            const newParams = new URLSearchParams(prev);
            newParams.set("genre", genre);
            return newParams;
        });
    };

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