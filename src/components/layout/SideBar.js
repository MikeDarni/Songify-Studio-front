import classes from "./SideBar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";
import { useState, useContext, useEffect } from "react";
import PlayerContext from "../../store/player-context";

/*
const DUMMY_DATA = [
  {
    name: "The Darkest Night",
    Artist: "Boris Brejcha",
    url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Kai_Engel/Satin/Kai_Engel_-_09_-_Homeroad.mp3",
  },
  {
    name: "Fever",
    Artist: "Psalm Trees",
    url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Kai_Engel/Satin/Kai_Engel_-_07_-_Interception.mp3",
  },
];
*/
function SideBar(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedSongs, setLoadedSongs] = useState([]);

  const playerCtx = useContext(PlayerContext);

  // useEffect(() => {
  //   setIsLoading(true);
  //   fetch("https://localhost:44306/api/Songs")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const songs = [];
  //       for (const key in data) {
  //         const song = {
  //           id: key,
  //           ...data[key],
  //         };
  //         songs.push(song);
  //       }
  //       setLoadedSongs(songs);
  //       setIsLoading(false);
  //     });
  // }, []);

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

  function songChooseHandler(song) {
    console.log(song);
    playerCtx.setCurrentSong(song);
  }

  return (
    <div className={classes.sidebar}>
      <h1>Songs list:</h1>
      <ul>
        {loadedSongs.map((song, index) => {
          return (
            <li key={index}>
              <FontAwesomeIcon icon={faMusic} />
              <i
                onClick={() => {
                  songChooseHandler({
                    Name: song.name,
                    Author: song.author,
                    url: song.url,
                  });
                }}
              >
                {song.author} - {song.name}
              </i>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default SideBar;
