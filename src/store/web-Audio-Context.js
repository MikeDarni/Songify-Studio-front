import { createContext, useState, useEffect } from "react";

const WebAudioContext = createContext({
  audioContext: null,
  filter: null,
  setAudioContext: () => {},
  setFilter: () => {},
});

export function WebAudioProvider(props) {
  const [audioContext, setAudioContext] = useState(null);
  const [currentFilter, setFilter] = useState(null);

  function setCurrentAudioContext(audioContext) {
    setAudioContext(audioContext);
  }

  function setCurrentFilters(filter) {
    setFilter(filter);
  }

  const context = {
    audioContext: audioContext,
    filter: currentFilter,
    setFilter: setCurrentFilters,
    setAudioContext: setCurrentAudioContext,
  };

  useEffect(() => {
    setAudioContext(new AudioContext());
  }, []);

  return (
    <WebAudioContext.Provider value={context}>
      {props.children}
    </WebAudioContext.Provider>
  );
}

export default WebAudioContext;
