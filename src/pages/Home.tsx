import { useEffect, useState, useMemo } from "react"
import { NavLink } from "react-router-dom"

import Loading from "../components/Loading"
import SearchSort from "../components/SearchSort"

type UpdateValue = 'old_new' | 'new_old'
type LetterSort = 'a_z' | 'z_a'

 export default function Home() {
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState(null)

    const [searchQuery, setSearchQuery] = useState<string>('')
    const [updateValue,setUpdateValue] = useState<UpdateValue>('old_new')
    const [letterSort,setLetterSort] = useState<LetterSort>('a_z')

useEffect(() => {
    const fetchData = async () => {
        setLoading(true);

        try {
            const res = await fetch('https://podcast-api.netlify.app');

            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }

            const data = await res.json();
            setData(data);

        } catch (err) {
            console.error('Fetch error:', err.message);
        } finally {
            setLoading(false);
        }
    };

    fetchData();
}, []);


const filtereData = useMemo(() => {
  return [...data]
    .filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      // Time-based sort first
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();

      if (updateValue === 'old_new') {
        if (dateA !== dateB) return dateA - dateB;
      } else {
        if (dateA !== dateB) return dateB - dateA;
      }

      // Fallback to title sort if dates are equal
      return letterSort === 'a_z'
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    });
}, [data, searchQuery, letterSort, updateValue]); 


   const displayedData = filtereData.map(item => (
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
                <SearchSort 
                    searchQuery = {searchQuery}
                    setSearchQuery = {setSearchQuery}
                    updateValue = {updateValue}
                    setUpdateValue = {setUpdateValue}
                    letterSort = {letterSort}
                    setLetterSort = {setLetterSort}
                />
                {
                    loading ? <Loading/> 
                    : 
                     <div className="relative grid grid-cols-5 gap-2">{displayedData}</div>
                }
        </section>
    )
 }