import classes from "./SideBar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { change } from "../../store/songSlice";
import { useSelector, useDispatch } from "react-redux";
import { addSong } from "../../store/playlistSlice";
import { setPlayList } from "../../store/playlistSlice";

export const DUMMY_DATA = [
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

function SideBar(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedSongs, setLoadedSongs] = useState([]);

  const dispatch = useDispatch();
  useEffect(() => {
    setIsLoading(true);
    fetch("https://localhost:44306/api/Songs")
      .then((response) => response.json())
      .then((data) => {
        const songs = [];
        for (const key in data) {
          const song = {
            id: key,
            ...data[key],
          };
          songs.push(song);
        }
        setLoadedSongs(songs);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <section>
        <p>Trwa ładowanie...</p>
      </section>
    );
  }

  function songChooseHandler(song) {
    console.log(song);
    dispatch(addSong(song));
    dispatch(change(song));
  }

  return (
    <div className={classes.sidebar}>
      <h3>Dostępne piosenki:</h3>
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
                    id: song.id,
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
