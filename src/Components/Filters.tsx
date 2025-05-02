type SearchFilters = {
    genres : string[];
}

export default function Filters({genres}:SearchFilters) {

    const displayedGenres = genres.map((genre,index) => (
        <div key={index} className="genre-el">
            {genre}
        </div>
    ))
    return (
        <section className="filter-sec">
            {displayedGenres}
        </section>
    )
}