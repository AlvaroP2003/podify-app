import { useEffect, useState, useMemo, use } from "react"
import { NavLink,useSearchParams } from "react-router-dom"

import Loading from "../components/Loading"
import SearchSort from "../components/SearchSort"

type UpdateValue = 'old_new' | 'new_old'
type LetterSort = 'a_z' | 'z_a'

type PodcastItem = {
  id: string
  title: string
  genre:string[]
  image: string
  updated: string
}

export default function Home() {
  const [data, setData] = useState<PodcastItem[]>([])
  const [genreData,setGenreData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)


  const [searchQuery, setSearchQuery] = useState<string>('')
  const [updateValue, setUpdateValue] = useState<UpdateValue>('new_old')
  const [letterSort, setLetterSort] = useState<LetterSort>('a_z')
  const [searchParams, setSearchParams] = useSearchParams()
  const typeFilter = searchParams.get('type')
  const [activeGenre,setActiveGenre] = useState('all')


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

  useEffect(() => {
    console.log(genreData);
  },[genreData])

useEffect(() => {
  const fetchData = async () => {
    try {
      const requests = [];

      for (let count = 1; count < 10; count++) {
        requests.push(fetch(`https://podcast-api.netlify.app/genre/${count}`).then(res => res.json()));
      }

      const genreRes = await Promise.all(requests);
      setGenreData(genreRes);
    } catch (error) {
      console.error('Failed to fetch genres:', error);
      // handle error as needed
    }
  };

  fetchData();
}, []);


  // Combined data for data and genre
const podcastData = data.map(podcast => {
    return {
        id: podcast.id,
        title: podcast.title,
        image: podcast.image,
        genre: genreData
            .map(item => item.shows.includes(podcast.id) ? item.title : null)
            .filter(title => title !== null)
            .join(', ')
    };
});


  useEffect(() => {
    console.log(podcastData)
  },[podcastData])
  

  const sortedAndFilteredData = useMemo(() => {
  let filtered = [...podcastData];

  if (searchQuery.trim()) {
    filtered = filtered.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  if(typeFilter) {
      filtered = filtered.filter(item => item.genre === typeFilter);
    }

  filtered.sort((a, b) => {
    const timeA = new Date(a.updated).getTime();
    const timeB = new Date(b.updated).getTime();
    return updateValue === 'new_old' ? timeB - timeA : timeA - timeB;
  });

  filtered.sort((a, b) =>
    letterSort === 'a_z'
      ? a.title.localeCompare(b.title)
      : b.title.localeCompare(a.title)
  );

  return filtered;
}, [data, searchQuery, updateValue, letterSort,typeFilter]);


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
        genreData = {genreData}
        typefilter = {typeFilter}
        setActiveGenre = {setActiveGenre}
        setSearchParams = {setSearchParams}
      />

      {loading && <Loading />}

      {error && <p className="text-red-600">Error: {error}</p>}

      {!loading && !error && (
        <div className="relative grid grid-cols-5 gap-1">{displayedData}</div>
      )}
    </section>
  )
}
