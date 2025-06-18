import Header from "./Header"
import Sidebar from "./Sidebar"
import { Outlet } from "react-router-dom"
import EpisodeModal from "./EpisodeModal"
import AudioPlayer from "./AudioPlayer."
import { useEpisode } from "./EpisodeContext" // <-- import the hook
import { useState } from "react"

export default function MainLayout() {

    const { 
        selectedEpisode, setSelectedEpisode,
        currentPodcast,setCurrentPodcast,
        currentSeason,setCurrentSeason,
        currentEpisode, setCurrentEpisode,
        modalOpen,
     } = useEpisode() // <-- use the hook
    
    return (
        <div className="text-white h-screen overflow-hidden">
            <Header/>
            <main className="flex h-screen">
                <Sidebar/>
                <Outlet/>
                {currentEpisode &&
                    <AudioPlayer/>
                }
                {selectedEpisode && modalOpen ?
                    <EpisodeModal/>
                    : null
                }
            </main>
        </div>
    )
}