import classes from "./PlayBar.module.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faStepForward,
  faStepBackward,
  faVolumeUp,
  faPause,
  faRedo,
} from "@fortawesome/free-solid-svg-icons";

function PlayBar(props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  function togglePlayingState() {
    console.log("Playing state changed");
    setIsPlaying(!isPlaying);
  }

  return (
    <div className={classes.column}>
      <div className={classes.controls}>
        <span className={classes.volume}>
          <FontAwesomeIcon icon={faVolumeUp} size="2x" color="white" />
        </span>
        <span className={classes.previous}>
          <FontAwesomeIcon icon={faStepBackward} size="3x" color="White" />
        </span>
        <span className={classes.play}>
          {isPlaying ? (
            <FontAwesomeIcon
              icon={faPause}
              size="5x"
              color="White"
              onClick={togglePlayingState}
            />
          ) : (
            <FontAwesomeIcon
              icon={faPlay}
              size="5x"
              color="White"
              onClick={togglePlayingState}
            />
          )}
        </span>
        <span className={classes.next}>
          <FontAwesomeIcon icon={faStepForward} size="3x" color="White" />
        </span>

        <span className={classes.progressbar}>
          <span className={classes.currentTime}>{currentTime}</span>
          <input
            onChange={() => {}}
            value={duration ? (currentTime * 100) / duration : 0}
            type="range"
            name="progresBar"
            id="prgbar"
          />
          <span className={classes.totalTime}>{duration}</span>
        </span>
        <span className={classes.redo}>
          <FontAwesomeIcon icon={faRedo} size="3x" color="White" />
        </span>
      </div>
    </div>
  );
}

export default PlayBar;
