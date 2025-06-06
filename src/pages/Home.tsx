import { useEffect, useState, useMemo } from "react"
import { NavLink } from "react-router-dom"

import Loading from "../components/Loading"
import SearchSort from "../components/SearchSort"

type UpdateValue = 'old_new' | 'new_old'
type LetterSort = 'a_z' | 'z_a'

type PodcastItem = {
  id: string
  title: string
  image: string
  updated: string
}

export default function Home() {
  const [data, setData] = useState<PodcastItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [searchQuery, setSearchQuery] = useState<string>('')
  const [updateValue, setUpdateValue] = useState<UpdateValue>('new_old')
  const [letterSort, setLetterSort] = useState<LetterSort>('a_z')

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch('https://podcast-api.netlify.app');
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const jsonData = await res.json();
        setData(jsonData);
      } catch (err: any) {
        setError(err.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log(data);
  },[data])
  

  const sortedAndFilteredData = useMemo(() => {
  let filtered = [...data];

  // Filter by search query
  if (searchQuery.trim()) {
    filtered = filtered.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // Sort by date
  filtered.sort((a, b) => {
    const timeA = new Date(a.updated).getTime();
    const timeB = new Date(b.updated).getTime();
    return updateValue === 'new_old' ? timeB - timeA : timeA - timeB;
  });

  // Then sort by title
  filtered.sort((a, b) =>
    letterSort === 'a_z'
      ? a.title.localeCompare(b.title)
      : b.title.localeCompare(a.title)
  );

  return filtered;
}, [data, searchQuery, updateValue, letterSort]);


  const displayedData = sortedAndFilteredData.map(item => (
    <NavLink className="overflow-hidden" key={item.id} to={item.id}>
      <img 
        className="rounded transition-transform duration-300 ease-in-out transform hover:scale-105"
        src={item.image}
        alt={item.title}
      />
    </NavLink>
  ));

  return (
    <section className="overflow-y-scroll w-full scrollbar-none">
      <SearchSort 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        updateValue={updateValue}
        setUpdateValue={setUpdateValue}
        letterSort={letterSort}
        setLetterSort={setLetterSort}
      />

      {loading && <Loading />}

      {error && <p className="text-red-600">Error: {error}</p>}

      {!loading && !error && (
        <div className="relative grid grid-cols-5 gap-1">{displayedData}</div>
      )}
    </section>
  )
}
