const sameCast = (podcast, season, episode, currentPodcast,currentSeason,currentEpisode) => {
  return (
    podcast?.id === currentPodcast?.id &&
    Number(season) === Number(currentSeason) &&
    episode?.episode === currentEpisode?.episode &&
    episode?.title === currentEpisode?.title // extra safeguard
  );
};

export default sameCast;