import { useState, useRef, useEffect } from "react";
import { useEpisode } from "./EpisodeContext";
import { SkipBack, Play, Pause, SkipForward,CirclePlus, CircleCheck, } from "lucide-react";
import AddToPLaylist from "./AddToPlaylists";

export default function AudioPlayer() {
    const { 
        currentPodcast, 
        currentSeason,
        currentEpisode,
        selectedPodcast,setSelectedPodcast,
        selectedSeason,setSelectedSeason,
        selectedEpisode,setSelectedEpisode,
        setModalOpen,
    }
     = useEpisode();

    const seasonImage = currentPodcast?.seasons?.[currentSeason - 1]?.image;
    const audioSrc = currentEpisode?.file || "";

    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef<HTMLAudioElement>(null);


    const [playlistModal,setPlaylistModal] = useState(false)

    // Stored Playlists
        const [playLists, setPlaylists] = useState([])
         
         useEffect(() => {
            const storedPlay = localStorage.getItem('playlists')
            if(storedPlay) setPlaylists(JSON.parse(storedPlay))
        },[])
    

    // Add this state to track completed episodes
    const [completedEpisodes, setCompletedEpisodes] = useState([]);

    // Load completed episodes from localStorage on mount
    useEffect(() => {
        const storedCompleted = localStorage.getItem('completedEpisodes');
        if (storedCompleted) setCompletedEpisodes(JSON.parse(storedCompleted));
    }, []);

    // Funciton to check if the current and selected cast are the same
    const sameCast = (podcast, season, episode) => {
    return (
        podcast?.id === currentPodcast?.id &&
        Number(season) === Number(currentSeason) &&
        episode?.episode === currentEpisode?.episode &&
        episode?.title === currentEpisode?.title // extra safeguard
    );  
    };

    // Function to save completed episode
    const saveCompletedEpisode = () => {
        if (!currentPodcast || !currentSeason || !currentEpisode) return;
        
        const completedEpisode = {
            podcast: currentPodcast,
            season: currentSeason,
            episode: currentEpisode,
            completedAt: new Date().toISOString()
        };
        
        // Check if this episode is already marked as completed
        const isAlreadyCompleted = completedEpisodes.some(completed => 
            completed.podcast.id === currentPodcast.id &&
            completed.season === currentSeason &&
            completed.episode.episode === currentEpisode.episode &&
            completed.episode.title === currentEpisode.title
        );
        
        if (!isAlreadyCompleted) {
            const updatedCompleted = [...completedEpisodes, completedEpisode];
            setCompletedEpisodes(updatedCompleted);
            localStorage.setItem('completedEpisodes', JSON.stringify(updatedCompleted));
            console.log('Added completed episode:', completedEpisode);
            
        }
    };

    const handlePlayPause = () => {
        if (!sameCast(selectedPodcast,selectedSeason,selectedEpisode)) {
            audioRef.current.currentTime = 0
            audioRef.current.play();
            setIsPlaying(true);
            return
        }
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleTimeUpdate = () => {
        if (!audioRef.current) return;
        const percent = (audioRef.current.currentTime / audioRef.current.duration) * 100;
        setProgress(isNaN(percent) ? 0 : percent);
    };

    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
        }
    };

    const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!audioRef.current || !duration) return;
        const rect = (e.target as HTMLDivElement).getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const width = rect.width;
        const percent = clickX / width;
        audioRef.current.currentTime = percent * duration;
    };

    return (
        <>
        {playlistModal && <AddToPLaylist setPlaylistModal={setPlaylistModal}/>}
        <div
            onClick={() => {
                setSelectedPodcast(currentPodcast)
                setSelectedSeason(currentSeason)
                setSelectedEpisode(currentEpisode)
                setModalOpen(true)
            }}
            className="fixed bottom-0 left-0 right-0 bg-neutral-900 px-4 py-2.5 z-100 h-[15vh] border-t-2 border-neutral-800">
                <audio
                    ref={audioRef}
                    src={audioSrc}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                    onPause={() => setIsPlaying(false)}
                    onPlay={() => setIsPlaying(true)}
                    onEnded={saveCompletedEpisode} // Add this line
                />
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <img 
                            src={seasonImage}
                            alt="Season Art"
                            className="w-20 mr-4 rounded object-cover"
                        />
                        <div className="flex flex-col gap-1">
                            <h3 className="text-lg font-medium text-neutral-200 max-w-80">{currentEpisode?.title}</h3>
                            <p className="text-md text-neutral-400">{currentPodcast?.title}</p>
                        </div>
                    </div>
                    <div className="absolute left-[50%] top-[25%] transform -translate-x-[50%] flex items-center space-x-4">
                        <button className="text-white p-2 rounded hover:bg-neutral-800 cursor-pointer">
                            <SkipBack size={20} />
                        </button>
                        <button
                            className="text-white p-2 rounded-full bg-amber-300 hover:bg-amber-200 cursor-pointer"
                            onClick={e => {
                                e.stopPropagation()
                                handlePlayPause()
                            }}
                        >
                            {isPlaying ? <Pause size={20} stroke="text-neutral-800" fill="text-neutral-800" /> : <Play size={20} stroke="text-neutral-800" fill="text-neutral-800" />}
                        </button>
                        <button className="text-white p-2 rounded hover:bg-neutral-800 cursor-pointer">
                            <SkipForward size={20} />
                        </button>
                    </div>

                    <div 
                        onClick={(e) => {
                            e.stopPropagation()
                            setPlaylistModal(true)
                        }}
                        className="cursor-pointer flex items-center justify-center rounded-full mr-10 hover:bg-neutral-800 w-10 h-10">
                            <CirclePlus/>
                    </div>
                </div>
                {/* Seekable Progress Bar */}
                <div
                    className="w-full h-2 bg-neutral-700 rounded mt-4 overflow-hidden cursor-pointer"
                    onClick={handleProgressBarClick}
                >
                    <div
                        className="h-full bg-amber-300 transition-all"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>
        </>
    );
}