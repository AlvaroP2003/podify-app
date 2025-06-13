import { X } from "lucide-react"

export default function EpisodeModal({currentPodcast,currentSeason,selectedEpisode,setSelectedEpisode}) {

    return (
        <div className="absolute inset-0 bg-black/50">
            <div className={`fixed ${selectedEpisode ? 'left-5' : '-left-[100px'} top-10 transition-all duration-100 h-full w-100px flex flex-col gap-2.5 bg-neutral-800 max-w-[400px] p-5 rounded`}>
                <X 
                    className="align-self-end cursor-pointer"
                    size={20}
                    onClick={() => {setSelectedEpisode(null)}}/>
                <img 
                    className="rounded"
                    src={currentPodcast && currentPodcast.seasons[currentSeason -1].image}/>
                <h1 className="text-xl font-medium">{selectedEpisode.title}</h1>
                <p className="text-sm text-neutral-300 leading-relaxed">{selectedEpisode.description}</p>
            </div>
        </div>
    )
}