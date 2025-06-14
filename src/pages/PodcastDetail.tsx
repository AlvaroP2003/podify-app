import { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom"
import { useEpisode } from "../components/EpisodeContext"
import EpisodeModal from "../components/EpisodeModal";

import { ArrowLeftFromLine,Play } from "lucide-react"

 export default function PodcastDetail() {
    const {
        currentPodcast,setCurrentPodcast,
        currentSeason, setCurrentSeason,
        currentEpisode, setCurrentEpisode,
        selectedSeason, setSelectedSeason,
        selectedEpisode, setSelectedEpisode,
    } = useEpisode()

    const {id} = useParams()    
    const [podcast,setPodcast] = useState({})
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState(null)

    useEffect(() => {
        console.log(selectedEpisode);
        
    },[selectedEpisode])

    useEffect(() => {
        console.log(currentEpisode);
        
    },[currentEpisode])
    

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
                setCurrentPodcast(data)
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
                        <h2 className="text-md text-neutral-400">Genres</h2>
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
                    {podcast.seasons && podcast.seasons[selectedSeason - 1] && (
                        podcast.seasons[selectedSeason - 1].episodes.map((episode,index) => (
                            
                            <div
                                onClick={() => setSelectedEpisode(episode)}
                                className="relative py-6 px-5 flex gap-4 hover:bg-neutral-800 rounded border-b border-neutral-700 group"
                                key={index}
                            >

                                <div className="relative min-w-[150px] max-w-[150px]">
                                    <img className="rounded object-cover w-full "
                                        src={podcast.seasons[selectedSeason -1].image}/>
                                    <button
                                        onClick={e => {
                                            e.stopPropagation(); // Prevents modal from opening
                                            setCurrentEpisode(episode); // Just play the episode
                                        }}
                                        className="cursor-pointer absolute right-2 bottom-2 bg-amber-300 hover:bg-amber-200 h-10 w-10 justify-center items-center rounded-full hidden group-hover:flex">
                                        <Play fill="neutral-400" stroke="neutral-400"/>
                                    </button>
                                </div>

                                <div className="flex flex-col justify-center flex-1">
                                    <h3 className="text-lg font-semibold text-neutral-100 mb-1">{episode.title}</h3>
                                    <p className="text-neutral-400 text-sm mb-2 line-clamp-2">{episode.description}</p>
                                    <div className="flex gap-2 text-sm text-neutral-500 mt-auto">
                                        <span>{`S${selectedSeason}`}</span>
                                        <span>{`E${episode.episode}`}</span>
                                    </div>
                                </div>
                               
                            </div>
                        ))
                    )}
                </div>

            </div>

            {selectedEpisode && (
                <EpisodeModal 
                    currentPodcast={currentPodcast}
                    currentSeason={currentSeason}
                    selectedSeason={selectedSeason}
                    selectedEpisode={selectedEpisode}
                    setSelectedEpisode={setSelectedEpisode}
                    />
            )}

        </section>
    )
 }