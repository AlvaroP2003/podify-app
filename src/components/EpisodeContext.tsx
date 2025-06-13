import React, { createContext, useContext, useState } from "react";

export interface Episode {
  // Define your episode properties here
  id: string;
  title: string;

  // Add more fields as needed
}

interface EpisodeContextType {
  currentEpisode: Episode | null;
  setCurrentEpisode: (episode: Episode | null) => void;
}

const EpisodeContext = createContext<EpisodeContextType | undefined>(undefined);

export const EpisodeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPodcast, setCurrentPodcast] = useState<string | null>(null);
  const [currentSeason, setCurrentSeason] = useState<number | null>(1);
  const [currentEpisode, setCurrentEpisode] = useState<Episode | null>(null);


  return (
    <EpisodeContext.Provider value={{ currentEpisode, setCurrentEpisode,currentSeason, setCurrentSeason, currentPodcast, setCurrentPodcast }}>
      {children}
    </EpisodeContext.Provider>
  );
};

export const useEpisode = () => {
  const context = useContext(EpisodeContext);
  if (!context) {
    throw new Error("useEpisode must be used within an EpisodeProvider");
  }
  return context;
};

export default EpisodeContext;


