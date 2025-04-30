import { useEffect, useState } from "react"
import SearchFilter from "./SearchFilter"


type PodcastData = {
    id:string;
    title:string;
    image:string;
    description:string;
    seaonss:number;
    update:string;
    genres:number[];
}

export default function Home() {
    const [data,setData] = useState<PodcastData [] | string>('')
    const [loading,setLoading] = useState<boolean>(false)
    const [error,setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const res = await fetch('https://podcast-api.netlify.app')
                
                if(!res.ok) {
                    throw new Error('Failed to fetch Data')
                }

                const data = await res.json()

                setData(data)
            } catch (err) {
                setError((err as Error).message)
            } finally {
                setLoading(false)
            }
        }

        fetchData()

    }, [])

    console.log(data)

    return (
        <>
            <SearchFilter/>
                <section>
                    <h1>Home</h1>
                </section>
        </>
    )
}