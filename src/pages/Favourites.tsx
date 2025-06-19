import { useState,useEffect } from "react"
 
 export default function Favourites() {

     // Favourites State
        const [favourites,setFavourites] = useState(JSON.parse(localStorage.getItem('favourites')) || [])

        useEffect(() => {
            localStorage.setItem('favourites', JSON.stringify(favourites))
        },[favourites])


    const displayedFavourites = favourites.map((cast,index) => (
        <div key={index}>
           <h1>{cast.title}</h1>
        </div>
    ))

    return (
        <section className="p-10">
            <h1 className="text-2xl">Favourites</h1>

            <div>
              {favourites.length === 0 ? (
                <p>No favourites found.</p>
              ) : (
                displayedFavourites
              )}
            </div>
        </section>
    )
 }