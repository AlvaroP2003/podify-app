import { useEffect, useState } from "react"
import { NavLink, useSearchParams } from "react-router-dom";
import Loading from "../Components/Loading";
import SearchSort from "../Components/SearchSort";
import Filters from "../Components/Filters";

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

   

    const filteredPodcasts = podcast.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(searchValue.toLowerCase());
        const matchesGenre = genreFilter === "" || item.genres.includes(genreFilter);
        return matchesSearch && matchesGenre;
    });
    
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
                <SearchSort
                    searchValue = {searchValue}
                    setSearchValue = {setSearchValue}
                />
                <Filters
                    podcast = {podcast}
                    genres = {genres}
                    setGenres = {setGenres}
                    genreFilter = {genreFilter}
                    setSearchParams = {setSearchParams}
                />
                  

                    <h1>{genreFilter ? genreFilter : 'All Podcasts'}</h1>
                    <div className="podcasts-container">
                        {displayedPodcasts}
                    </div>
            </section>
        }
        </>
        
    )
}