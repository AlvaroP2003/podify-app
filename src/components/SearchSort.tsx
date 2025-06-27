import { Search, X, ArrowDownAZ,ArrowDownZA, ClockArrowDown, ClockArrowUp} from "lucide-react"
import { useEffect, useState } from "react"


export default function SearchSort(
    {
    searchQuery,
    setSearchQuery,
    updateValue,
    setUpdateValue,
    sortValue,
    setSortValue,
    letterSort,
    setLetterSort,
    genreData,
    typefilter,
    setSearchParams}) {

    const [searchOpen,setSearchOpen] = useState(false)

    const toggleLetter = () => {
        setSortValue('letter')
        setLetterSort(letterSort === 'a_z' ? 'z_a' : 'a_z')      
    }

      const toggleUpdate = () => {
        setSortValue('date')
        setUpdateValue(updateValue === 'old_new' ? 'new_old' : 'old_new')
        console.log('time sort');
                
    }

        function handleFilterChange(key, value) {
        setSearchParams(prevParams => {
            if (value === typefilter) {
                prevParams.delete(key)
            } else {
                prevParams.set(key, value)
            }
            return prevParams
        })
    }

    return (
        <div>
            <div className="px-10 py-5 lg:p-10 flex justify-between items-center" >
                 <h1 className="text-xl lg:text-2xl">{typefilter ? typefilter : 'All Podcasts'}</h1>

            <div className="flex">
                <div className={`relative flex items-center transition-all`}>
                   
                    <button 
                        className="bg-neutral-900 hover:bg-neutral-800 p-2 cursor-pointer rounded z-5"
                        onClick={() => {setSearchOpen(!searchOpen)}}
                        >
                        {searchOpen ? <X size={20} className="text-neutral-300"/> :
                        <Search size={20} className="text-neutral-300"/>
                        }
                    </button>
                     <input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search title or genre..."
                        className={`bg-neutral-800 px-4 py-2 rounded text-sm w-[250px] focus:ring-none focus:outline-none absolute right-0 transition-all ${searchOpen ? 'max-w-[300px]' : 'max-w-[0px]'}`}
                        />
                </div>
              

                <div className="flex gap-2">
                    <button 
                        onClick={() => {toggleLetter()}}
                        className={`hover:bg-neutral-800 p-2 rounded cursor-pointer ${sortValue === 'letter' ? 'text-amber-300' : 'text-neutral-300'}`}>
                        {
                            letterSort === 'a_z' ?
                             <ArrowDownAZ size={20}/> :
                            <ArrowDownZA size={20}/>
                        }
                    </button>
                    <button 
                        onClick={() => {toggleUpdate()}}
                        className={`hover:bg-neutral-800 p-2 rounded cursor-pointer ${sortValue === 'date' ?  'text-amber-300' : 'text-neutral-300'}`}>
                        {
                            updateValue === 'old_new' ?
                            <ClockArrowDown size={20}/> :
                            <ClockArrowUp size={20}/>
                        }
                    </button>
                </div>
            </div>
            </div>
           

                <div className="flex gap-5 py-2.5 px-5 lg:p-5 w-[100vw] overflow-scroll">
                   {genreData.flat().map((genre, index) => (
                    <div
                        onClick={() => {                            
                            handleFilterChange('type', genre.title)}
                        }
                        className={`text-sm lg:text-md cursor-pointer flex gap-2.5 items-center whitespace-nowrap border-2 px-4 py-2 lg:px-6 lg:py-3 rounded-full transition-all ${genre.title === typefilter ? 'border-amber-300 text-amber-300 font-medium hover:bg-amber-300 hover:text-neutral-800'  : 'bg-neutral-800 border-neutral-800 hover:bg-neutral-700 hover:border-neutral-700'}`}
                        key={index}
                        >{genre.title}
                        {genre.title === typefilter ?
                        <span><X size={15} strokeWidth={3}/></span> : ''}
                        </div>
                    ))}
                </div>

        </div>
    )
}