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
import { deleteSong } from "../../store/playlistSlice";

var myContext;
var myBuffer;
var player;

function TestPlayBar(props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setMuteState] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [context, setContext] = useState(null);

  const audioRef = useRef();
  const dispatch = useDispatch();
  const currentSongId = useSelector((state) => state.mySongReducer.song.id);
  const currentSongUrl = useSelector((state) => state.mySongReducer.song.url);
  const currentPlayList = useSelector((state) => state.myPlayListReducer.songs);

  const isPlayListReady = useSelector(
    (state) => state.myPlayListReducer.isReady
  );
  const webAudioCtx = useSelector(
    (state) => state.myWebAudioReducer.webAudioContext
  );

  const initializeHandler = () => {
    myContext = new AudioContext();
    const url = "https://localhost:44306/api/File?songId=";
    player = new Player(myContext, currentPlayList);
    player.loadTrack(url);
    player.play();
  };

  const volumeHander = () => {
    player.volumeUp();
  };

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
        <Button onClick={initializeHandler}>Rozpocznij!</Button>
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
        <button onClick={volumeHander}>Podgłos!</button>

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

export default TestPlayBar;
