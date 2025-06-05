
import Header from "./Header"
import Sidebar from "./Sidebar"
import { Outlet } from "react-router-dom"

export default function MainLayout() {
    return (
        <div className="text-white">
            <Header/>
            <main className="flex h-screen">
                <Sidebar/>
                <Outlet/>
            </main>
        </div>
    )
}