import { createContext, useState } from "react";

const PlayerContext = createContext({
  song: {
    Name: "",
    Author: "",
    url: "",
  },
  config: [],
  setCurrentSong: (songName) => {},
  setMixerConfig: (config) => {},
});

export function PlayerContextProvider(props) {
  const [currentSong, setCurrentSong] = useState({});
  const [mixerConfig, setCurrentMixerConfig] = useState([]);

  function setCurrentSongHandler(song) {
    setCurrentSong(song);
  }

  function setMixerConfigHandler(config) {
    setCurrentMixerConfig(config);
  }

  const context = {
    song: currentSong,
    config: mixerConfig,
    setCurrentSong: setCurrentSongHandler,
    setMixerConfig: setMixerConfigHandler,
  };

  return (
    <PlayerContext.Provider value={context}>
      {props.children}
    </PlayerContext.Provider>
  );
}

export default PlayerContext;
