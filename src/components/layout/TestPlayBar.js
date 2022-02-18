import classes from "./PlayBar.module.css";
import { useState } from "react";
import { useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faStepForward,
  faStepBackward,
  faVolumeUp,
  faPause,
  faRedo,
  faVolumeMute,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import { Player } from "./Player";
import store from "../../store/store";

var myContext;
var myBuffer;
export var player;

var playingStateHandler;
var togglePlayingStateHandler;

export const playbarInitializeHandler = (consoleConfig) => {
  myContext = new AudioContext();
  const url = "https://localhost:44306/api/File?songId=";
  var currentPlayList = store.getState().myPlayListReducer.songs;
  player = new Player(myContext, currentPlayList, consoleConfig);
  player.loadTrack(url);
  player.play();
};

export const consoleValueReadHandler = (potState) => {
  if (potState.name === "MUTE") {
    console.log("MUTE BUTTON CLICKED");
    togglePlayingStateHandler();
  } else if (potState.name === "ON_OFF") {
    console.log("ON_OFF BUTTON CLICKED");
    playingStateHandler();
  } else {
    player.changeEffectValue(potState);
  }
};

export function TestPlayBar(props) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setMuteState] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  togglePlayingStateHandler = togglePlayingState;
  playingStateHandler = FadeOutTest;
  const audioRef = useRef();
  const dispatch = useDispatch();
  const currentPlayList = useSelector((state) => state.myPlayListReducer.songs);

  const fmtMSS = (s) => {};

  function toggleAudio() {}

  function toggleMute() {}

  function handleProgress(event) {}

  function togglePlayingState() {
    if (!isPlaying) {
      setIsPlaying(true);
      player.resume();
    } else {
      setIsPlaying(false);
      player.stop(0);
    }
  }

  function FadeOutTest() {
    player.sourceGain.gain.linearRampToValueAtTime(
      0,
      myContext.currentTime + 5
    );
  }

  function FadeInTest() {
    player.sourceGain.gain.linearRampToValueAtTime(
      1,
      myContext.currentTime + 5
    );
  }

  return (
    <div className={classes.playBar}>
      {/* <audio
        onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
        onCanPlay={(e) => setDuration(e.target.duration)}
        ref={audioRef}
        src={currentSongUrl}
        preload="true"
        crossOrigin="anonymous"
        onChange={togglePlayingState}
      /> */}
      <div className={classes.controls}>
        <span className={classes.volume} onClick={toggleMute}>
          {isMuted ? (
            <FontAwesomeIcon icon={faVolumeMute} size="2x" color="White" />
          ) : (
            <FontAwesomeIcon icon={faVolumeUp} size="2x" color="white" />
          )}
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
          <span className={classes.currentTime}>{fmtMSS(currentTime)}</span>
          <input
            onChange={handleProgress}
            value={duration ? (currentTime * 100) / duration : 0}
            type="range"
            name="progresBar"
            id="prgbar"
          />
          <span className={classes.totalTime}>{fmtMSS(duration)}</span>
        </span>
        <span className={classes.redo}>
          <FontAwesomeIcon icon={faRedo} size="3x" color="White" />
        </span>
      </div>
    </div>
  );
}
