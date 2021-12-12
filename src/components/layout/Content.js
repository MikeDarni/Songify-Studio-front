import MixerPanel from "../UI/MixerPanel";
import SideBar from "./SideBar";
import ToolBar from "./ToolBar";
import PlayBar from "./PlayBar";
import MainContent from "./MainContent";

import classes from "./Content.module.css";
import { propTypes } from "react-bootstrap/esm/Image";
import { useContext } from "react";
import PlayerContext from "../../store/player-context";

function Content(props) {
  const playerCtx = useContext(PlayerContext);

  return (
    <div className={classes.content}>
      <SideBar />
      <MainContent>
        <MixerPanel />
        {playerCtx.config.length > 0 && <PlayBar />}
        {<ToolBar></ToolBar>}
      </MainContent>
      {/*} <ToolBar /> */}
    </div>
  );
}

export default Content;
