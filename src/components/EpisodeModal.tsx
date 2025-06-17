import { X, Play, Heart } from "lucide-react"

export default function EpisodeModal({ selectedPodcast,selectedSeason, selectedEpisode, setSelectedEpisode }) {
    const seasonImage = selectedPodcast?.seasons?.[selectedSeason - 1]?.image;
    const isOpen = Boolean(selectedEpisode);

    return (
        <div
            onClick={() => setSelectedEpisode(null)}
            className={`
                absolute inset-0 z-40 bg-black/70
                flex justify-center items-center
                transition-opacity duration-300
                ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
            `}
        >
            <div
                className={`
                    max-w-[850px] w-full
                    flex flex-col gap-2.5
                    bg-neutral-900 p-7.5 rounded overflow-hidden shadow-lg
                    border-2 border-neutral-800
                    transition-all duration-300
                    ${isOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}
                `}
            >
                {/* Modal content */}
                <div className="relative z-10 flex gap-5 text-neutral-300">
                    
                    <div className="relative max-w-[45%] min-w-[45%]">

                    <img 
                        className="rounded"
                        src={seasonImage}
                        alt="Episode"
                    />

                    </div>
                    
                    <div className="relative flex flex-col gap-2 w-full">
                        <h1 className="text-2xl font-medium text-neutral-200">{selectedEpisode?.title}</h1>
                            <h2 className="text-md text-neutral-400">{selectedPodcast?.title}</h2>
                                <p className="text-sm text-neutral-300 leading-relaxed">{selectedEpisode?.description}</p>


                         <div className="absolute bottom-0 flex justify-between w-full p-2">
                                <button 
                                        className="cursor-pointer">
                                    <Heart size={30} fill="none" stroke="white" strokeWidth={1.5}/>
                                </button>

                                  <button 
                                        className="cursor-pointer flex justify-center items-center bg-amber-300 hover:bg-amber-200 min-h-10 min-w-10 rounded-full">
                                    <Play fill="neutral-400" stroke="neutral-400"/>
                                </button>
                        </div>
                    </div>
                
                </div>

                <div>

                </div>

               

            </div>
        </div>
    )
}