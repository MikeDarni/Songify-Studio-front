import classes from "./Content.module.css";
import { useContext } from "react";
import PlayerContext from "../../store/player-context";

function Content(props) {
  const playerCtx = useContext(PlayerContext);

  return (
    <div className={classes.column}>
      <h4>{playerCtx.song.Author}</h4>
      <h1>{playerCtx.song.Name}</h1>
    </div>
  );
}

export default Content;
