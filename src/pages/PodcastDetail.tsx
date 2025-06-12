import { useEffect, useState } from "react"
import { useParams, NavLink } from "react-router-dom"

import { ArrowLeftFromLine,Play } from "lucide-react"

 export default function PodcastDetail() {

    const {id} = useParams()    
    const [podcast,setPodcast] = useState({})
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState(null)

    const [selectedSeason,setSelectedSeason] = useState<number>(1)
    const [selectedEpisode, setSelectedEpisode] = useState(null)

    useEffect(() => {
        console.log(selectedSeason);
        
    },[selectedSeason])
    

    useEffect(() => {
        setSelectedSeason(1)
        const fetchData = async () => {
            setLoading(true)

            try {
                const res = await fetch(`https://podcast-api.netlify.app/id/${id}`)
                
                if(!res.ok) {
                    throw new Error('Error fetching podcast data')
                }

                const data = await res.json()
                setPodcast(data)
            } catch(err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
          
        }

        fetchData()

    },[])


    useEffect(() => {
        console.log(podcast);
    },[podcast])


    return (
        <section className="p-10 flex justify-between overflow-y-scroll w-full h-screen">

            <div className="flex flex-2 flex-col gap-10">
                <NavLink to='..' className='flex gap-4 items-center'>
                    <ArrowLeftFromLine size={20}/> Back to podcasts
                </NavLink>

                <div className="flex gap-10">
                    <img src={podcast.image} className="rounded w-[400px]"/>

                    <div className="flex flex-col gap-2 max-w-[500px]">
                        <h1 className="text-2xl font-semibold">{podcast.title}</h1>
                        <h2 className="text-lg text-neutral-400">Genres</h2>
                        <p className="text-md text-neutral-300">{podcast.description}</p>
                        <h3 className="text-md italic text-neutral-400">{podcast.updated}</h3>
                    </div>
                </div>
            </div>
          
            
            <div className="flex flex-1 flex-col gap-10">
                <div className="flex gap-5 items-center justify-center">
                    <select
                    value={selectedSeason} onChange={(e) => setSelectedSeason(e.target.value)}
                     className="border-2 border-neutral-500 p-2.5 rounded">
                       {podcast && podcast.seasons?.map((season,index) => (
                        <option
                            className="bg-neutral-800"
                            key={index} 
                            value={season.season}
                            >Season {season.season}</option>
                       ))}
                    </select>
                        {podcast.seasons && podcast.seasons[selectedSeason - 1] && (
                            <span className="text-neutral-400">
                                {podcast.seasons[selectedSeason - 1].episodes.length} Episodes
                            </span>
                        )}
                </div>

                <div className="flex flex-col w-full overflow-y-scroll">
                    {podcast.seasons && podcast.seasons[selectedSeason -1] && (
                        podcast.seasons[selectedSeason - 1].episodes.map((episode,index) => (
                            
                            <div
                                onClick={() => setSelectedEpisode(episode)}
                                className="relative p-5 flex gap-2.5 hover:bg-neutral-800 rounded cursor-pointer border-b border-neutral-700"
                                key={index}
                                >

                                <div className="relative w-[150px] border-red-500">
                                    <img className="rounded object-cover w-full"
                                        src={podcast.seasons[selectedSeason -1].image}/>
                                    <button className="absolute right-2 bottom-2 bg-amber-300 h-10 w-10 flex justify-center items-center rounded-full">
                                        <Play fill="neutral-400" stroke="neutral-400"/>
                                    </button>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <h3 className="text-neutral-300 font-medium">{episode.title}</h3>

                                    <div className="flex gap-1 text-neutral-400 ">
                                        <span>{`S${selectedSeason}`}</span>
                                        <span>{`E${episode.episode}`}</span>
                                    </div>
                                </div>
                               
                            </div>
                        ))
                    )}
                </div>

            </div>

        </section>
    )
 }