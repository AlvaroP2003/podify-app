import { useEffect, useState } from "react"
import { useParams, NavLink } from "react-router-dom"

import { ArrowLeftFromLine } from "lucide-react"

 export default function PodcastDetail() {

    const {id} = useParams()    
    const [podcast,setPodcast] = useState([])
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState(null)

    const [selectedSeason,setSelectedSeason] = useState<number>(1)

    useEffect(() => {
        console.log(selectedSeason);
        
    },[selectedSeason])
    

    useEffect(() => {
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
        <section className="p-10 flex flex-col gap-10">
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
            
            <div>
                <div>
                    <select
                        value={selectedSeason} onChange={(e) => setSelectedSeason(e.target.value)}
                     className="border-2 border-neutral-500 p-2.5 rounded">
                       {podcast && podcast.seasons?.map((season,index) => (
                        <option
                            key={index} 
                            value={season.season}
                            >Season {season.season}</option>
                       ))}
                    </select>
                    <span>{podcast.seasons[selectedSeason - 1].episodes.length}</span>
                </div>
            </div>
        </section>
    )
 }