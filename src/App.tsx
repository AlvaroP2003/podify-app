import { BrowserRouter, Routes,Route } from "react-router-dom"

import MainLayout from "./components/MainLayout"
import Home from "./pages/Home"
import Favourites from "./pages/Favourites"
import User from "./pages/User"
import PodcastDetail from "./pages/PodcastDetail"

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainLayout/>}>
                    <Route index element={<Home/>}></Route>
                    <Route path="favourites" element={<Favourites/>}></Route>
                    <Route path="user" element={<User/>}></Route>
                    <Route path="podcast/:id" element={<PodcastDetail/>}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App