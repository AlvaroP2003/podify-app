import { Search, X, ArrowDownAZ,ArrowDownZA, ClockArrowDown, ClockArrowUp} from "lucide-react"
import { useState } from "react"


export default function SearchSort({searchQuery, setSearchQuery,updateValue, setUpdateValue, letterSort, setLetterSort}) {

    const [searchOpen,setSearchOpen] = useState(false)


    const toggleLetter = () => {
        setLetterSort(letterSort === 'a_z' ? 'z_a' : 'a_z')
    }

      const toggleUpdate = () => {
        setUpdateValue(updateValue === 'old_new' ? 'new_old' : 'old_new')
    }

    return (
        <div className="flex justify-between px-5 mb-5">
            <h1 className="text-2xl">All Podcasts</h1>

            <div className="flex">
                <div className={`relative flex items-center overflow-hidden transition-all ${searchOpen ? 'w-[300px]' : 'w-[50px]'}`}>
                    <input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search title or genre..."
                        className={`bg-neutral-800 px-4 py-2 rounded text-sm w-[250px] focus:ring-none focus:outline-none absolute ${searchOpen ? 'right-[0px]' : 'right-[-250px]'}`}
                        />
                    <button 
                        className="hover:bg-neutral-800 p-2 rounde cursor-pointer"
                        onClick={() => {setSearchOpen(!searchOpen)}}
                        >
                        {searchOpen ? <X size={20} className="text-neutral-300"/> :
                        <Search size={20} className="text-neutral-300"/>
                        }
                    </button>
                </div>
              

                <div className="flex gap-2">
                    <button 
                        onClick={() => {toggleLetter()}}
                        className="hover:bg-neutral-800 p-2 rounded cursor-pointer">
                        {
                            letterSort === 'a_z' ?
                             <ArrowDownAZ size={20} className="text-neutral-300"/> :
                            <ArrowDownZA size={20} className="text-neutral-300"/>
                        }
                    </button>
                    <button 
                        onClick={() => {toggleUpdate()}}
                        className="hover:bg-neutral-800 p-2 rounded cursor-pointer">
                        {
                            updateValue === 'old_new' ?
                            <ClockArrowDown size={20} className="text-neutral-300"/> :
                            <ClockArrowUp size={20} className="text-neutral-300"/>
                        }
                    </button>
                </div>

            </div>
        </div>
    )
}