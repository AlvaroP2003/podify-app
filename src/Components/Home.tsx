import { useEffect, useState } from "react"
import SearchSort from "./SearchSort";
import Filters from "./Filters";
import { NavLink } from "react-router-dom";


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


    useEffect(() => {
        const allGenres = podcast.flatMap(cast => cast.genres);
        const uniqueGenres = [...new Set(allGenres)];
        setGenres(uniqueGenres);
    }, [podcast]);    

    const displayedPodcasts = podcast.map(item => (
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
            <SearchSort/>
            <Filters 
                genres = {genres}
            />

                <section>
                    <h1>Home</h1>
                    <div className="podcasts-container">
                        {loading ? <h1>Loading...</h1> : error ? <h1>{error}</h1> : displayedPodcasts}
                    </div>
                </section>
        </>
    )
}