import Header from "./Header"
import Sidebar from "./Sidebar"
import { Outlet } from "react-router-dom"
import AudioPlayer from "./AudioPlayer."
import { useEpisode } from "./EpisodeContext" // <-- import the hook
import MobileNav from "./MobileNav"

export default function MainLayout() {

    const {currentEpisode} = useEpisode()
        
    return (
        <div className="text-white h-screen overflow-hidden">
            <Header/>
            <main className="flex h-screen">
                <div className="hidden lg:block">
                    <Sidebar/>
                </div>
                <Outlet/>
            </main>
            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-neutral-900/95 z-50 flex justify-between h-[10vh]">
                <MobileNav/>
            </div>
            {currentEpisode && <AudioPlayer/>}
        </div>
    )
}