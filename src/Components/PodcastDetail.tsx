import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Loading from "./Loading";


type Episodes = {
    title: string;
    description : string;
}

type Season = {
    season : number;
    title : string;
    image : string ;
    episde : Episodes[];
}

type PodcastData = {
    id:number;
    title:string;
    image:string;
    description:string;
    seasons: Season[];
    updated:string;
}

export default function PodcastDetail() {
    const [podcast,setPodcast] = useState<PodcastData | null>(null)
    const [loading,setLoading] = useState<boolean>(false)
    const [error,setError] = useState<string | null>(null)

    const { id } = useParams<{id:string}>()


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
    

    return (
        <>
        {podcast ?
            <section className="podcast-detail">
                <div className="main">
                    <h1>{podcast.title}</h1>
                    <h2>{podcast.genres.join(' · ')}</h2>
                    <div className="main-content">
                        <img src={podcast.image}/>
                        <div className="content">
                            <span><h3>{podcast.seasons.length}</h3></span>
                        </div>
                    </div>
                </div>
            </section>
            : null
        }
        </>
       
    )
}