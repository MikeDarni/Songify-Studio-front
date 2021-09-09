import { createContext, useState } from "react";

const PlayerContext = createContext({
  song: {
    Name: "",
    Author: "",
    url: "",
  },
  setCurrentSong: (songName) => {},
});

export function PlayerContextProvider(props) {
  const [currentSong, setCurrentSong] = useState({});

  function setCurrentSongHandler(song) {
    setCurrentSong(song);
  }

  const context = {
    song: currentSong,
    setCurrentSong: setCurrentSongHandler,
  };

  return (
    <PlayerContext.Provider value={context}>
      {props.children}
    </PlayerContext.Provider>
  );
}

export default PlayerContext;
