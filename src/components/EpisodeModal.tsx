import { X, Play } from "lucide-react"

export default function EpisodeModal({ currentPodcast, currentSeason, selectedEpisode, setSelectedEpisode }) {
    const bgImage = currentPodcast?.seasons?.[currentSeason - 1]?.image;
    const isOpen = Boolean(selectedEpisode);

    return (
        <div
            className={`
                absolute inset-0 z-40 bg-black/50
                transition-opacity duration-300
                ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
            `}
        >
            <div
                className={`
                    fixed top-10 left-5
                    max-w-[400px] w-full h-full
                    flex flex-col gap-2.5
                    bg-neutral-800 p-5 rounded overflow-hidden shadow-lg
                    transition-all duration-300
                    ${isOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}
                `}
            >
                {/* Blurred background image */}
                {bgImage && (
                    <img
                        src={bgImage}
                        alt="Background"
                        className="absolute inset-0 w-full h-full object-cover opacity-30 blur-3xl pointer-events-none select-none"
                    />
                )}
                {/* Modal content */}
                <div className="relative z-10 flex flex-col gap-2.5 h-full text-neutral-300">
                    <X 
                        className="self-end cursor-pointer"
                        size={20}
                        onClick={() => setSelectedEpisode(null)}
                    />
                    <img 
                        className="rounded mb-2"
                        src={bgImage}
                        alt="Episode"
                    />
                    <div className="flex justify-between items-center">
                        <h1 className="text-xl font-medium">{selectedEpisode?.title}</h1>
                        <button 
                            className="cursor-pointer flex justify-center items-center bg-amber-300 hover:bg-amber-200 min-h-10 min-w-10 rounded-full">
                            <Play fill="neutral-400" stroke="neutral-400"/>
                        </button>
                    </div>
                    <p className="text-md text-neutral-300 leading-relaxed">{selectedEpisode?.description}</p>
                </div>
            </div>
        </div>
    )
}