import Header from "./Header"
import Sidebar from "./Sidebar"
import { Outlet } from "react-router-dom"
import AudioPlayer from "./AudioPlayer."
import { useEpisode } from "./EpisodeContext" // <-- import the hook

export default function MainLayout() {

    const { currentEpisode, setCurrentEpisode } = useEpisode() // <-- use the hook
    
    return (
        <div className="text-white h-screen overflow-hidden">
            <Header/>
            <main className="flex h-screen">
                <Sidebar/>
                <Outlet/>
                {currentEpisode &&
                    <AudioPlayer currentEpisode={currentEpisode}/>
                }
            </main>
        </div>
    )
}