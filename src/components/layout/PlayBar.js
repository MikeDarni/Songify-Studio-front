import classes from "./PlayBar.module.css";
import { useState } from "react";
import { useContext, useRef, useEffect } from "react";
import PlayerContext from "../../store/player-context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import WebAudioContext from "../../store/web-Audio-Context";
import {
  faPlay,
  faStepForward,
  faStepBackward,
  faVolumeUp,
  faPause,
  faRedo,
  faVolumeMute,
} from "@fortawesome/free-solid-svg-icons";
import ToolsSettingsContext, {
  ToolsSettingsProvider,
} from "../../store/tools-settings-context";

const mySong = {
  songUrl:
    "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Kai_Engel/Satin/Kai_Engel_-_09_-_Homeroad.mp3",
};

function PlayBar(props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setMuteState] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    var context = new AudioContext();
    var source = context.createMediaElementSource(audioRef.current);
    let filter = context.createBiquadFilter();
    source.connect(filter);
    filter.connect(context.destination);
    filter.type = "lowpass";
    webAudioCtx.setAudioContext(context);
    webAudioCtx.setFilter(filter);
  }, []);

  const audioRef = useRef();

  const ToolsCtx = useContext(ToolsSettingsContext);
  const webAudioCtx = useContext(WebAudioContext);
  const playerCtx = useContext(PlayerContext);

  const fmtMSS = (s) => {
    return (s - (s %= 60)) / 60 + (9 < s ? ":" : ":0") + ~~s;
  };

  function toggleAudio() {
    audioRef.current.paused
      ? audioRef.current.play()
      : audioRef.current.pause();
  }

  function toggleMute() {
    setMuteState(!isMuted);
    audioRef.current.muted = !audioRef.current.muted;
  }

  function handleProgress(event) {
    let compute = (event.target.value * duration) / 100;
    setCurrentTime(compute);
    audioRef.current.currentTime = compute;
  }

  function togglePlayingState() {
    console.log("Playing state changed");
    setIsPlaying(!isPlaying);
    toggleAudio();
  }

  return (
    <div className={classes.column}>
      <audio
        onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
        onCanPlay={(e) => setDuration(e.target.duration)}
        ref={audioRef}
        src={playerCtx.song.url}
        preload="true"
        crossOrigin="anonymous"
        onChange={togglePlayingState}
      />

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

export default PlayBar;
