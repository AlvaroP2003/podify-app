import { useEffect, useState } from "react"
import { NavLink, useParams } from "react-router-dom"
import Loading from "./Loading";


type Episodes = {
    title: string;
    description : string;
}

type Season = {
    season : number;
    title : string;
    image : string ;
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


    const totalEpisodes = podcast?.seasons.map(season => (
        season.episodes.length
     ))

     const sumEpisodes = totalEpisodes?.reduce((acc, num) => acc + num, 0);

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
                    <select>
                        {podcast.seasons.map((season,index) => (
                            <option key={index}>
                                {`Season ${season.season}`}
                            </option>
                        ))}
                    </select>
                    <div>Episodes</div>
                    </div>
                    
                </div>
            </section>
            : null
        }
        </>
       
    )
}