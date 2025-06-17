import { useState, useRef } from "react";
import { useEpisode } from "./EpisodeContext";
import { SkipBack, Play, Pause, SkipForward, EllipsisVertical,CirclePlus, CircleCheck } from "lucide-react";

export default function AudioPlayer() {
    const { 
        currentPodcast, 
        currentSeason,
        currentEpisode, setSelectedEpisode,
        selectedSeason, setSelectedSeason,
    }
     = useEpisode();

    const seasonImage = currentPodcast?.seasons?.[currentSeason - 1]?.image;
    const audioSrc = currentEpisode?.file || "";

    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef<HTMLAudioElement>(null);

    const handlePlayPause = () => {
        if (!audioRef.current) return;
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
        <div
        onClick={() => setSelectedEpisode(currentEpisode)}
        className="fixed bottom-0 left-0 right-0 bg-neutral-900 px-4 py-2.5 z-100 h-[15vh] border-t-2 border-neutral-800">
            <audio
                ref={audioRef}
                src={audioSrc}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onPause={() => setIsPlaying(false)}
                onPlay={() => setIsPlaying(true)}
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

                <div className="cursor-pointer pr-10">
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
    );
}