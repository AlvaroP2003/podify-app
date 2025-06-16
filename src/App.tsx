import { BrowserRouter, Routes, Route } from "react-router-dom"

import MainLayout from "./components/MainLayout"
import Home from "./pages/Home"
import Library from "./pages/Library"
import Favourites from "./pages/Favourites"
import User from "./pages/User"
import PodcastDetail from "./pages/PodcastDetail"
import { EpisodeProvider } from "./components/EpisodeContext" // <-- use the provider

function App() {
    return (
        <EpisodeProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainLayout/>}>
                        <Route index element={<Home/>}></Route>
                        <Route path="libary" element={<Library/>}></Route>
                        <Route path="favourites" element={<Favourites/>}></Route>
                        <Route path="user" element={<User/>}></Route>
                        <Route path=":id" element={<PodcastDetail/>}></Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </EpisodeProvider>
    )
}

export default App