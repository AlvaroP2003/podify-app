import React, { createContext, useContext, useEffect, useState } from "react";
import Favourites from "../pages/Favourites";

export interface Episode {
  // Define your episode properties here
  id: string;
  title: string;

  // Add more fields as needed
}

const EpisodeContext = createContext<any>(undefined);

export const EpisodeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  useEffect(() => {
    console.log("EpisodeProvider mounted");
  },[])

  // Playing State
  const [currentPodcast, setCurrentPodcast] = useState<string | null>(null);
  const [currentSeason, setCurrentSeason] = useState<number | null>(1);
  const [currentEpisode, setCurrentEpisode] = useState<Episode | null>(null);


  // Viewing State
  const [selectedPodcast,setSelectedPodcast] = useState<Object | null>(null)
  const [selectedSeason, setSelectedSeason] = useState<number | null>(1);
  const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null);


  // Episode Modal State
  const [modalOpen,setModalOpen] = useState(false)


  return (
    <EpisodeContext.Provider 
      value={{ 
        currentEpisode, setCurrentEpisode,
        currentSeason, setCurrentSeason, 
        currentPodcast, setCurrentPodcast,
        selectedPodcast,setSelectedPodcast,
        selectedSeason, setSelectedSeason,
        selectedEpisode, setSelectedEpisode,
        modalOpen,setModalOpen,
        }}>
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


