import React, { createContext, useContext, useEffect, useState } from "react";

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

  // Playing 
  const [currentPodcast, setCurrentPodcast] = useState<string | null>(null);
  const [currentSeason, setCurrentSeason] = useState<number | null>(1);
  const [currentEpisode, setCurrentEpisode] = useState<Episode | null>(null);


  // Viewing
  const [selectedPodcast,setSelectedPodcast] = useState<Object | null>(null)
  const [selectedSeason, setSelectedSeason] = useState<number | null>(1);
  const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null);

  useEffect(()=> {
    console.log("Current Podcast:", currentPodcast || "No Podcast Selected");
    console.log("Current Season:", currentSeason || "No Season Selected");
    console.log("Current Episode:", currentEpisode || "No Episode Selected");
    

  },[currentPodcast,currentSeason,currentEpisode])

  return (
    <EpisodeContext.Provider 
      value={{ 
        currentEpisode, setCurrentEpisode,
        currentSeason, setCurrentSeason, 
        currentPodcast, setCurrentPodcast,
        selectedPodcast,setSelectedPodcast,
        selectedSeason, setSelectedSeason,
        selectedEpisode, setSelectedEpisode}}>
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


