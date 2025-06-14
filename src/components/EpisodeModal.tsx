import { X, Play } from "lucide-react"

export default function EpisodeModal({ currentPodcast, currentSeason, selectedEpisode, setSelectedEpisode }) {
    const seasonImage = currentPodcast?.seasons?.[currentSeason - 1]?.image;
    const isOpen = Boolean(selectedEpisode);

    return (
        <div
            onClick={() => setSelectedEpisode(null)}
            className={`
                absolute inset-0 z-40 bg-black/50
                transition-opacity duration-300
                ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
            `}
        >
            <div
                className={`
                    fixed left-0 top-1
                    max-w-[400px] w-full h-[84vh]
                    flex flex-col gap-2.5
                    bg-neutral-800 p-5 rounded overflow-hidden shadow-lg
                    transition-all duration-300
                    ${isOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}
                `}
            >
                {/* Modal content */}
                <div className="relative z-10 flex flex-col gap-2 h-full text-neutral-300">
                    <div className="relative">
                        <img 
                        className="rounded mb-2"
                        src={seasonImage}
                        alt="Episode"
                    />

                     <button 
                            className="absolute bottom-5 right-5 cursor-pointer flex justify-center items-center bg-amber-300 hover:bg-amber-200 min-h-10 min-w-10 rounded-full">
                            <Play fill="neutral-400" stroke="neutral-400"/>
                        </button>

                    </div>
                    
                     <h1 className="text-xl font-medium">{selectedEpisode?.title}</h1>
                    <h2 className="text-lg text-neutral-400">{currentPodcast.title}</h2>
                    <p className="text-sm text-neutral-300 leading-relaxed">{selectedEpisode?.description}</p>
                </div>
            </div>
        </div>
    )
}