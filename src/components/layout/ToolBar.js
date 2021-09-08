import classes from "./ToolBar.module.css";
import { useState, useContext, useRef, useEffect } from "react";
import ToolsSettingsContext from "../../store/tools-settings-context";
import WebAudioContext from "../../store/web-Audio-Context";

function ToolBar(props) {
  const [filterEnabled, setFilterEnabled] = useState("false");

  const webAudioCtx = useContext(WebAudioContext);

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
      filterInputValRef.current.value,
      webAudioCtx.audioContext.currentTime,
      0
    );
  }

  return (
    <div className={classes.column}>
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
