

export default function SearchSort() {
    return (
        <div className="search-sort-sec">
                <div>
                    <input type="text" placeholder="Search podcast..."/>
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search-icon lucide-search"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.3-4.3" /></svg>
                    </button>
                </div>
                    <select>
                        <option>A - Z</option>
                        <option>Z - A</option>
                        <option>Old to New</option>
                        <option>New to Old</option>
                    </select>
        </div>
    )
}