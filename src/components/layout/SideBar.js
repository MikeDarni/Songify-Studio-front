import classes from "./SideBar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";

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
  return (
    <div className={classes.column}>
      <h1>Songs list:</h1>
      <ul>
        {DUMMY_DATA.map((song) => {
          return (
            <li>
              <FontAwesomeIcon icon={faMusic} />
              <i>
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
