import classes from "./RightBar.module.css";
import { DUMMY_DATA } from "./SideBar";
import PlayList from "../UI/Playlist";

function RightBar(props) {
  return (
    <div className={classes.rightbar}>
      <PlayList songsList={DUMMY_DATA}></PlayList>
    </div>
  );
}

export default RightBar;
