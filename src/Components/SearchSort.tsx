import { useEffect, useState } from "react";

  
  interface SearchSortProps {
    searchValue: string;
    setSearchValue: (value: string) => void;
    sortValue: string;
  }
  

export default function SearchSort ({searchValue,setSearchValue, podcast, setPodcast}:SearchSortProps) {
    
    const [sortValue, setSortValue] = useState<string>('A - Z')

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value)
    }
    
    function handleSortChange(value: string) {        
        setSortValue(value); // Update selected sort state
        let sorted = [...podcast];
      
        switch (value) {
          case 'A - Z':
            sorted.sort((a, b) => a.title.localeCompare(b.title));
            break;
          case 'Z - A':
            sorted.sort((a, b) => b.title.localeCompare(a.title));
            break;
          case 'Old to New':
            sorted.sort((a, b) => new Date(a.updated).getTime() - new Date(b.updated).getTime());
            break;
          case 'New to Old':
            sorted.sort((a, b) => new Date(b.updated).getTime() - new Date(a.updated).getTime());
            break;
          default:
            break;
        }
      
        setPodcast(sorted);
      }


      useEffect(() => {
        handleSortChange('A - Z')
      },[])

    return (
        <div className="search-sort-sec">
                    <div>
                        <input 
                            type="text"
                            placeholder="Search podcast..."
                            onChange={handleSearch}
                            value={searchValue}
                            />
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search-icon lucide-search"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.3-4.3" /></svg>
                        </button>
                    </div>
                        <select onChange={(e) => handleSortChange(e.target.value)} value={sortValue}>
                            <option>A - Z</option>
                            <option>Z - A</option>
                            <option>Old to New</option>
                            <option>New to Old</option>
                        </select>
        </div>
    )
}