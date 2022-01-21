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
import { delayFunc, filterFunc } from "../../Lib/Effects";
import changeCtx from "../../store/webAudioSlice";

var context = new AudioContext();
var source = null;

function PlayBar(props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setMuteState] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [context, setContext] = useState(null);

  const audioRef = useRef();
  const dispatch = useDispatch();
  const currentSongUrl = useSelector((state) => state.mySongReducer.song.url);
  const webAudioCtx = useSelector(
    (state) => state.myWebAudioReducer.webAudioContext
  );

  // useEffect(() => {
  //   var ctx = new AudioContext();
  //   var source = ctx.createMediaElementSource(audioRef.current);
  //   //filterFunc(webAudioCtx, source);
  //   console.log("PlayBar render!");
  //   source.connect(ctx.destination);
  // }, []);

  // let filter = context.createBiquadFilter();
  // source.connect(filter);
  // filter.connect(context.destination);
  // filter.type = "lowpass";
  // source.connect(context.destination);
  //// var delay = context.createDelay();
  ////delay.delayTime.value = 0.8;
  //var feedback = context.createGain();
  //feedback.gain.value = 0.2;
  // delay.connect(feedback);
  //feedback.connect(delay);
  //source.connect(delay);
  ////source.connect(context.destination);
  ////delay.connect(context.destination);
  //webAudioCtx.setFilter(filter);
  // webAudioCtx.setAudioContext(context);
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
    var ctx = new AudioContext();
    setContext(ctx);
    if (!source) {
      source = ctx.createMediaElementSource(audioRef.current);
      filterFunc(ctx, source);
      delayFunc(ctx, source);
      source.connect(ctx.destination);
    }
    setIsPlaying(!isPlaying);
    toggleAudio();
  }

  return (
    <div className={classes.playBar}>
      <audio
        onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
        onCanPlay={(e) => setDuration(e.target.duration)}
        ref={audioRef}
        src={currentSongUrl}
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
