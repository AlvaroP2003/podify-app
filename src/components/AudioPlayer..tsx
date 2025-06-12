import { useEffect } from "react";
import EpisodeContext, { useEpisode } from "./EpisodeContext"

export default  function AudioPlayer() {
    const { 
        currentPodcast, setCurrentPodcast,
        currentSeason, setCurrentSeason,
        currentEpisode, setCurrentEpisode,
     } = useEpisode()

     console.log(currentPodcast);

    useEffect(()=> {
        console.log('currentPodcast', currentPodcast);
        console.log('currentSeason', currentSeason);
        console.log('currentEpisode', currentEpisode);
        
        console.log('image',currentPodcast && currentPodcast.seasons && currentPodcast.seasons[currentSeason -1].image);
    },[currentPodcast, currentSeason, currentEpisode])

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-800 p-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <img 
                        src={currentPodcast ?? currentPodcast.seasons[currentSeason -1].image}
                        alt="Album Art" 
                        className="w-12 h-12 mr-4 rounded" />
                    <div>
                        <h3 className="text-white">{currentEpisode.title}</h3>
                        <p className="text-gray-400">Artist Name</p>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <button className="text-white">Prev</button>
                    <button className="text-white">Play</button>
                    <button className="text-white">Next</button>
                </div>
            </div>
        </div>
    )
}