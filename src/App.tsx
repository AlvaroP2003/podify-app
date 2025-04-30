import { BrowserRouter, Routes, Route } from "react-router-dom"
import MainLayout from "./Components/MainLayout"
import Home from "./Components/Home"
import Favourites from "./Components/Favourites"
import User from "./Components/User"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element = {<MainLayout/>}>
          <Route index element = {<Home/>}/>
          <Route path="/favourites" element = {<Favourites/>}/>
          <Route path="/user" element = {<User/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}