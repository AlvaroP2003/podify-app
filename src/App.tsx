import { BrowserRouter, Routes, Route } from "react-router-dom"
import MainLayout from "./Components/MainLayout"
import Home from "./Pages/Home"
import Favourites from "./Components/Favourites"
import User from "./Pages/User"
import PodcastDetail from "./Pages/PodcastDetail"
import { PodcastProvider } from "./Components/PodcastContext"

export default function App() {
  return (
    <PodcastProvider>
       <BrowserRouter>
        <Routes>
          <Route path="/" element = {<MainLayout/>}>
            <Route index element = {<Home/>}/>
            <Route path="/favourites" element = {<Favourites/>}/>
            <Route path="/user" element = {<User/>}/>
          </Route>
          <Route path="/:id" element = {<PodcastDetail/>}/>
        </Routes>
      </BrowserRouter>
    </PodcastProvider>
   
  )
}