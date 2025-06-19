import Header from "./Header"
import Sidebar from "./Sidebar"
import { Outlet } from "react-router-dom"
import EpisodeModal from "./EpisodeModal"
import AudioPlayer from "./AudioPlayer."
import { useEpisode } from "./EpisodeContext" // <-- import the hook
import { useState } from "react"

export default function MainLayout() {
        
    return (
        <div className="text-white h-screen overflow-hidden">
            <Header/>
            <main className="flex h-screen">
                <Sidebar/>
                <Outlet/>
            </main>
        </div>
    )
}