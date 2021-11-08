import SongAddForm from "../UI/SongAddForm";
import SideBar from "./SideBar";
import ToolBar from "./ToolBar";
import PlayBar from "./PlayBar";
import MainContent from "./MainContent";

import classes from "./Content.module.css";

function Content(props) {
  return (
    <div className={classes.content}>
      <SideBar />
      <MainContent>
        <SongAddForm />
      </MainContent>
      <ToolBar />
    </div>
  );
}

export default Content;
