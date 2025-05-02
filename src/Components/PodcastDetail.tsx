import { useEffect, useState } from "react"
import { NavLink, useParams } from "react-router-dom"
import { usePodcast } from "./PodcastContext"


type Episodes = {
    title: string;
    description : string;
    episode:number;
    file:string;
}

type Season = {
    season : number;
    title : string;
    image : string;
    episodes : Episodes[];
}

type PodcastData = {
    id:number;
    title:string;
    image:string;
    genres:string[];
    description:string;
    seasons: Season[];
    updated:string;
}

export default function PodcastDetail() {
    const [podcast,setPodcast] = useState<PodcastData | null>(null)
    const [loading,setLoading] = useState<boolean>(false)
    const [error,setError] = useState<string | null>(null)
    const { id } = useParams<{id:string}>()

    const { podcastId, setPodcastId, season, setSeason, episode, setEpisode } = usePodcast()

    // Fetch podcast detail
    useEffect(()=> {
        if(!id) {
            return
        }

        const fetchData = async () => {
            setLoading(true)

            try {
                const res = await fetch(`https://podcast-api.netlify.app/id/${id}`)

                if(!res.ok) {
                    throw new Error('Error!')
                }

                const data = await res.json()

                setPodcast(data)

            } catch (err) {
                if(err instanceof Error) {
                    setError(err.message);
                }
            } finally {
                setLoading(false)
            }
        }

        fetchData()

    },[])

    console.log(podcast);


    // Code used to display total episodes
    const totalEpisodes = podcast?.seasons.map(season => (
        season.episodes.length
     ))

    const sumEpisodes = totalEpisodes?.reduce((acc, num) => acc + num, 0);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSeason(e.target.value);
    }

    const displayedEpisodes = podcast && season ? podcast.seasons[season].episodes.map((episode,index) => (
        <div key={index} className="episode">
            <img src={podcast.seasons[season].image}/>

            <div className="detail">
                <h2>{episode.title}</h2>
                <h3>{`Episode ${episode.episode}`}</h3>
                <p>{episode.description}</p>
            </div>
        </div>
    )) : null


    return (
        <>
        {podcast ?
            <section className="podcast-detail">

                <NavLink to={'/'}>back</NavLink>

                <div className="main">
                    <h1>{podcast.title}</h1>
                    <h2>{podcast.genres.join(' · ')}</h2>

                    <div className="main-content">
                        <img src={podcast.image}/>
                        <div className="detail">
                            <span>
                                <h3>{`${podcast.seasons.length} Seasons  · ${sumEpisodes} Episodes`}</h3>
                            </span>
                            <p>{podcast.description}</p>
                        </div>
                    </div>
                    <p>{podcast.updated.slice(0,10)}</p>
                </div>

                <div className="seasons-episodes-sec">
                    <div className="summary">
                        <select onChange={handleChange}>
                            {podcast.seasons.map((season,index) => (
                                <option key={index} value={Number(season.season)}>
                                    {`Season ${season.season}`}
                                </option>
                            ))}
                        </select>
                            <div>{`${sumEpisodes} Episodes`}</div>
                    </div>

                    <div className="episodes-container">
                        {displayedEpisodes}
                    </div>
                    
                </div>
            </section>
            : null
        }
        </>
       
    )
}