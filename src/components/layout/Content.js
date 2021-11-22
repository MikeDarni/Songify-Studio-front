import MixerPanel from "../UI/MixerPanel";
import SideBar from "./SideBar";
import ToolBar from "./ToolBar";
import PlayBar from "./PlayBar";
import MainContent from "./MainContent";

import classes from "./Content.module.css";
import { propTypes } from "react-bootstrap/esm/Image";

function Content(props) {
  return (
    <div className={classes.content}>
      <SideBar />
      <MainContent>
        <MixerPanel />
      </MainContent>
      <ToolBar />
    </div>
  );
}

export default Content;
