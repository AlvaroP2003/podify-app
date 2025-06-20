import { BrowserRouter, Routes, Route } from "react-router-dom"

import MainLayout from "./components/MainLayout"
import Home from "./pages/Home"
import Library from "./pages/Library"
import Favourites from "./pages/Favourites"
import PodcastDetail from "./pages/PodcastDetail"
import { EpisodeProvider } from "./components/EpisodeContext"
import { Toaster } from "react-hot-toast"
import UserDetails from "./pages/User"

function App() {
    return (
            <BrowserRouter>
                <EpisodeProvider>
                    <Toaster
                        position="bottom-right"
                        reverseOrder={false}
                        toastOptions={{
                            style: {
                            background: '#262626', // neutral-800
                            color: '#fff',
                            borderRadius: '0.5rem',
                            padding: '1rem',
                            },
                            success: {
                            iconTheme: {
                                primary: '#fbbf24', // amber-300
                                secondary: '#262626',
                            },
                            },
                            error: {
                            iconTheme: {
                                primary: '#ef4444', // red-500
                                secondary: '#262626',
                            },
                            },
                        }}
                        />
                    <Routes>
                        <Route path="/" element={<MainLayout/>}>
                            <Route index element={<Home/>}></Route>
                            <Route path="library" element={<Library/>}></Route>
                            <Route path="favourites" element={<Favourites/>}></Route>
                            <Route path=":id" element={<PodcastDetail/>}></Route>
                        </Route>
                        <Route path="user" element={<UserDetails/>}></Route>
                    </Routes>
                </EpisodeProvider>
            </BrowserRouter>
    )
}

export default App