import classes from "./SideBar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import PlayerContext from "../../store/player-context";

const DUMMY_DATA = [
  {
    name: "The Darkest Night",
    Artist: "Boris Brejcha",
  },
  {
    name: "Fever",
    Artist: "Psalm Trees",
  },
];

function SideBar(props) {
  const playerCtx = useContext(PlayerContext);

  function songChooseHandler(songName) {
    playerCtx.setCurrentSong(songName);
  }

  return (
    <div className={classes.column}>
      <h1>Songs list:</h1>
      <ul>
        {DUMMY_DATA.map((song) => {
          return (
            <li>
              <FontAwesomeIcon icon={faMusic} />
              <i
                onClick={() =>
                  songChooseHandler({ Name: song.name, Author: song.Artist })
                }
              >
                {song.Artist} - {song.name}
              </i>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default SideBar;
