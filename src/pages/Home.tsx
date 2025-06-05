import { use, useEffect, useState } from "react"
import { NavLink } from "react-router-dom"

 

 export default function Home() {

    const [data,setData] = useState([])
    const [loading,setLoading] = useState(false)
    const [error,setEroor] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)

            try {
                const res = await fetch('https://podcast-api.netlify.app')
            
                if(!res.ok) {
                    throw new Error(error)
                }

                const data = await res.json()
                setData(data)
            } catch(err) {
                console.error(err.message)
            }
          
        }

        fetchData()
    },[])


   const displayedData = data.map(item => (
    <NavLink className="overflow-hidden" key={item.id} to={item.id}>
        <img 
            className="rounded transition-transform duration-300 ease-in-out transform hover:scale-105"
            src={item.image}
            alt=""
        />
    </NavLink>
));

    return (
        <section className="p-10 overflow-y-scroll w-full scrollbar-none">
            <div className="relative grid grid-cols-5 gap-2">
                {displayedData}
            </div>
        </section>
    )
 }