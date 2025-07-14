import { useEffect, useState, useMemo, use } from "react"
import { NavLink,useSearchParams } from "react-router-dom"

import Loading from "../components/Loading"
import SearchSort from "../components/SearchSort"

import { useEpisode } from "../components/EpisodeContext"
import { SearchX } from "lucide-react"

import type { PodcastItem } from "../types/interfaces"

type SortValue = 'letter' | 'date'
type UpdateValue = 'old_new' | 'new_old'
type LetterSort = 'a_z' | 'z_a'

export default function Home() {
  const {currentPodcast, setCurrentPodcast, currentEpisode} =  useEpisode()
  const [data, setData] = useState<PodcastItem[]>([])
  const [genreData,setGenreData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [completedEpisodes, setCompletedEpisodes] = useState()


  const [searchQuery, setSearchQuery] = useState<string>('')
  const [sortValue,setSortValue] = useState<SortValue>('date')
  const [updateValue, setUpdateValue] = useState<UpdateValue>('new_old')
  const [letterSort, setLetterSort] = useState<LetterSort>('a_z')
  const [searchParams, setSearchParams] = useSearchParams()
  const typeFilter = searchParams.get('type')



  // Fetching data from the API
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


  // Fetching genre data from the API
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


  useEffect(() => {
    // Load completed episodes from localStorage on mount
    const storedCompleted = localStorage.getItem('completedEpisodes');
    if (storedCompleted) {
      setCompletedEpisodes(JSON.parse(storedCompleted));
    }
  },[])


  const displayedCompletedEpisodes = completedEpisodes?.map((episode, index) => (
    <div key={index} className="cursor-pointer flex flex-col gap-2 w-[150px] lg:w-[200px] p-2.5 rounded-md hover:bg-neutral-800 transition-all">
      <div className="relative">
        <img src={episode.podcast?.seasons?.[ episode.season -1].image} className="rounded"/>
        <span className="absolute bottom-0 px-4 py-2 flex justify-between w-full text-sm font-medium text-neutral-300 bg-gradient-to-t from-black to-transparent">
          <p>S:{episode.season} </p>
          <p>E:{episode.episode.episode} </p>     
        </span>
      </div>
      <h3 className="text-sm font-medium text-neutral-400 line-clamp-2">{episode.episode.title}</h3>
    </div>
  )) || null;


  // Combined data for data and genre
const podcastData = useMemo(() => {
  return data.map(podcast => ({
    id: podcast.id,
    title: podcast.title,
    image: podcast.image,
    updated: podcast.updated,
    genre: genreData
      .map(item => item.shows.includes(podcast.id) ? item.title : null)
      .filter((title): title is string => title !== null)
  }));
}, [data, genreData]);


  const sortedAndFilteredData = useMemo(() => {
  let filtered = [...podcastData];

  if (searchQuery.trim()) {
    filtered = filtered.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  if(typeFilter) {
      filtered = filtered.filter(item => item.genre.includes(typeFilter));
  }

  if(sortValue === 'date') {
    filtered.sort((a, b) => {
      const timeA = new Date(a.updated).getTime();
      const timeB = new Date(b.updated).getTime();
      return updateValue === 'new_old' ? timeB - timeA : timeA - timeB;
    });
  }
  
  if(sortValue === 'letter') {
    filtered.sort((a, b) =>
      letterSort === 'a_z'
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title)
    );
  }

  return filtered; // <-- you missed this return in your original code

}, [data, searchQuery, updateValue, letterSort,typeFilter]);


  const displayedData = sortedAndFilteredData.map(item => (
    <NavLink 
      className="overflow-hidden" 
      key={item.id} 
      to={`/${item.id}`}>
      <img 
        className="rounded transition-transform duration-300 ease-in-out transform hover:scale-105"
        src={item.image}
        alt={item.title}
      />
    </NavLink>
  ));

  return (
    <>
        <section className="w-full overflow-y-scroll scrollbar-none">
          <SearchSort 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            updateValue={updateValue}
            setUpdateValue={setUpdateValue}
            sortValue={sortValue}
            setSortValue={setSortValue}
            letterSort={letterSort}
            setLetterSort={setLetterSort}
            genreData = {genreData}
            typefilter = {typeFilter}
            setSearchParams = {setSearchParams}
          />

          {displayedCompletedEpisodes?.length > 0 ? 
            <div className="flex flex-col p-5 lg:px-10 lg:py-7.5 gap-2.5">
              <h1 className="text-2xl">Watch Again</h1>
                <div className="flex gap-1">
                  {displayedCompletedEpisodes}
                </div>
              </div> 
            : null}

          {loading && <Loading />}

          {error && <p className="text-red-600">Error: {error}</p>}

          {!loading && !error && (
            <div className="relative grid grid-cols-2 lg:grid-cols-5 gap-1 p-1 lg:p-0">{displayedData}</div>
          )}
      </section>
    </>
  )
}
