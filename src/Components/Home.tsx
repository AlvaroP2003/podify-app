import { useEffect, useState } from "react"
import { NavLink, useSearchParams } from "react-router-dom";
import Loading from "./Loading";

type PodcastData = {
    id:string;
    title:string;
    image:string;
    seasons:number;
    updated:string;
    genres:string[];
}

export default function Home() {
    const [podcast,setPodcast] = useState<PodcastData[]>([])
    const [genres,setGenres] = useState<string[]>([])
    const [loading,setLoading] = useState<boolean>(false)
    const [error,setError] = useState<string | null>(null)

    const [searchParams, setSearchParams] = useSearchParams()
    const [searchValue,setSearchValue] = useState<string>('')

    const genreFilter = searchParams.get("genre") || ''    

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

    const filteredPodcasts = podcast.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(searchValue.toLowerCase());
        const matchesGenre = genreFilter === "" || item.genres.includes(genreFilter);
        return matchesSearch && matchesGenre;
    });
    

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value)
    }


    const searchedPodcast = filteredPodcasts.filter(cast => cast.title.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()))

    // Initial Data Fetch
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const res = await fetch('https://podcast-api.netlify.app')
                if (!res.ok) throw new Error('Failed to fetch Data')
    
                const data:PodcastData[] = await res.json()
    
                const podcastArr = await Promise.all(
                    data.map(async item => {
                        const genreNames = await Promise.all(
                            item.genres.map(async number => {
                                const genreRes = await fetch(`https://podcast-api.netlify.app/genre/${number}`)
                                const genreData = await genreRes.json()
                                return genreData.title
                            })
                        )
    
                        return {
                            id: item.id,
                            title: item.title,
                            image: item.image,
                            seasons: item.seasons,
                            updated: item.updated,
                            genres: genreNames
                        }
                    })
                )
    
                setPodcast(podcastArr)
            } catch (err) {
                setError((err as Error).message)
            } finally {
                setLoading(false)
            }
        }
    
        fetchData()
    }, [])


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

    const displayedPodcasts = searchedPodcast.map(item => (
        <NavLink to={item.id} key={item.id} className={'card'}>
            <img src={item.image}/>

            <div>
                <h1>{item.title}</h1>
                <h2>{item.genres.join(' · ')}</h2>
                <h3>{item.seasons} Seasons</h3>
            </div>
        </NavLink>
    ))

    return (
        <>
            {loading ? <Loading/> : error ? <h1>Error</h1> :
            <section className="home-sec">
                <div className="search-sort-sec">
                    <div>
                        <input 
                            type="text"
                            placeholder="Search podcast..."
                            onChange={handleChange}
                            value={searchValue}
                            />
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search-icon lucide-search"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.3-4.3" /></svg>
                        </button>
                    </div>
                        <select >
                            <option>A - Z</option>
                            <option>Z - A</option>
                            <option>Old to New</option>
                            <option>New to Old</option>
                        </select>
                    </div>

                    <div className="filter-sec">
                        {displayedGenres}
                    </div>

                    <h1>{genreFilter ? genreFilter : 'All Podcasts'}</h1>
                    <div className="podcasts-container">
                        {displayedPodcasts}
                    </div>
            </section>
        }
        </>
        
    )
}