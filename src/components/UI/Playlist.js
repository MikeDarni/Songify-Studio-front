import { ListGroup, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import {
  deleteSong,
  addSong,
  setPlayList,
  setReady,
} from "../../store/playlistSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useState } from "react";
import classes from "./Playlist.module.css";

function PlayList(props) {
  const dispatch = useDispatch();
  const currentPlayList = useSelector((state) => state.myPlayListReducer.songs);
  const [playlistReady, setPlaylistReady] = useState(false);

  function onDeleteButtonHandler() {
    dispatch(deleteSong());
  }

  function onAddSongHandler() {
    dispatch(addSong());
  }

  function setPlaylistReadyHandler() {
    setPlaylistReady(true);
    dispatch(setReady());
  }

  function wrapPlayListElement(song) {
    return (
      <ListGroup.Item bsPrefix={classes.test}>
        <div className={classes.songTitle}>{song.Name} </div>
        {!playlistReady && (
          <div className={classes.list_util}>
            <FontAwesomeIcon
              icon={faTimes}
              onClick={onDeleteButtonHandler}
              className={classes.list_util}
            />
          </div>
        )}
      </ListGroup.Item>
    );
  }

  return (
    <>
      <div className={classes.barTitle}>Kolejka utworów:</div>
      <ListGroup style={listSongStyle}>
        {" "}
        {currentPlayList.map(wrapPlayListElement)}
      </ListGroup>
      {currentPlayList.length > 0 && !playlistReady && (
        <Button onClick={setPlaylistReadyHandler}>Gotowe!</Button>
      )}
    </>
  );
}

export default PlayList;

const listSongStyle = {
  width: "100%",
};
