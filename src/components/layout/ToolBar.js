import classes from "./ToolBar.module.css";
import { useState, useContext, useRef, useEffect } from "react";
import ToolsSettingsContext from "../../store/tools-settings-context";
import WebAudioContext from "../../store/web-Audio-Context";
import { potVal, potName } from "../../Lib/console";
import PlayerContext from "../../store/player-context";
import { Effect, filterChangeHandler, delayFunc } from "../../Lib/Effects";

function ToolBar(props) {
  const [filterEnabled, setFilterEnabled] = useState("false");

  const effectsList = [
    new Effect("Delay", 0.0, delayFunc), // TUTAJ TRZEBA COŚ ZADZIAŁAĆ Z WEbaudioCTX
    new Effect("Filter", 500, filterChangeHandler),
    new Effect("Gain", 0.5),
  ];

  setInterval(() => {
    console.log("Nazwa potencjometru:" + potName);
    console.log("Odczytana wartość pot: " + potVal);
    let configList = playerCtx.config;
    for (let i = 0; i < configList.length; i++) {
      if (configList[i].name === potName) {
        console.log(configList[i].effect);
      }
    }
  }, 100);
  const webAudioCtx = useContext(WebAudioContext);
  const playerCtx = useContext(PlayerContext);

  const filterInputValRef = useRef();
  const toolsCtx = useContext(ToolsSettingsContext);

  useEffect(() => {
    toolsCtx.filter.value = filterInputValRef.current.value;
  }, []);

  function toggleFilterEnableHandler() {
    setFilterEnabled(!filterEnabled);
    filterEnabled
      ? (webAudioCtx.filter.type = "allpass")
      : (webAudioCtx.filter.type = "lowpass");
  }

  function frequencyChangeHandler() {
    toolsCtx.setFilterSettings({
      enable: filterEnabled,
      value: filterInputValRef.current.value,
    });
    webAudioCtx.filter.frequency.setTargetAtTime(
      potVal,
      webAudioCtx.audioContext.currentTime,
      0
    );
  }

  return (
    <div className={classes.toolbar}>
      <h2>Tools:</h2>
      <div className={classes.tools}>
        <label for="filterVal">Frequency = {toolsCtx.filter.value}</label>
        <input
          type="range"
          min="0"
          max="2000"
          step="100"
          id="filterVal"
          ref={filterInputValRef}
          onChange={frequencyChangeHandler}
        />

        <button onClick={toggleFilterEnableHandler}>
          {filterEnabled ? "Disable Filter" : "Enable Filter"}
        </button>
      </div>
    </div>
  );
}

export default ToolBar;
