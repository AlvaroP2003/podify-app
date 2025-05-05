import { createContext, useState, ReactNode, useContext } from "react";

// Define the shape of the context
type PodcastContextType = {
    podcastId: number | null;
    setPodcastId: (id: number | null) => void;
    season: number | null;
    setSeason: (season: number | null) => void;
    episode: number | null;
    setEpisode: (episode: number | null) => void;
};

// Create the context with a default value (can also use `undefined` and check before using)
export const PodcastContext = createContext<PodcastContextType | undefined>(undefined);

// Provider props type
type PodcastProviderProps = {
    children: ReactNode;
};


export const PodcastProvider = ({children}:PodcastProviderProps) => {
    const [podcastId, setPodcastId] = useState<number | null>(null);
    const [season, setSeason] = useState<number | null>(0);
    const [episode, setEpisode] = useState<number | null>(0);

    return (
        <PodcastContext.Provider
            value={{
                podcastId,
                setPodcastId,
                season,
                setSeason,
                episode,
                setEpisode
            }}
        >
            {children}
        </PodcastContext.Provider>
    )
}

export const usePodcast = () => useContext(PodcastContext)