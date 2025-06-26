export interface Playlist {
    name: string
    episodes: {
        podcast: Podcast
        season: number
        episode: Episode}
}

export interface PodcastItem {
  id: string
  title: string
  genre:string[]
  image: string
  updated: string
}

export interface Podcast {
    id: string
    title: string
    description: string
    seasons: Season[]
}

export interface Season {
    season: number
    title: string
    image: string
    episodes: Episode[]
}

export interface Episode {
    title: string
    episode: number
    file: string
}

