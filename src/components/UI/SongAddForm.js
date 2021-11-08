import classes from "./SongAddForm.module.css";
import { useContext, useRef } from "react";
import PlayerContext from "../../store/player-context";

function SongAddForm(props) {
  const playerCtx = useContext(PlayerContext);

  const songUrlInputRef = useRef();
  const titleInputRef = useRef();
  const authorInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();
    playerCtx.setCurrentSong({
      Name: titleInputRef.current.value,
      Author: authorInputRef.current.value,
      url: songUrlInputRef.current.value,
    });
  }

  return (
    <div className={classes.songAddForm}>
      <h4>{playerCtx.song.Author}</h4>
      <h1>{playerCtx.song.Name}</h1>

      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="title">Song title:</label>
          <input type="text" required id="title" ref={titleInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="Author">Author:</label>
          <input type="text" required id="Author" ref={authorInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="song">URL:</label>
          <input type="url" required id="song" ref={songUrlInputRef} />
        </div>
        <div className={classes.actions}>
          <button>Add song</button>
        </div>
      </form>
    </div>
  );
}

export default SongAddForm;
