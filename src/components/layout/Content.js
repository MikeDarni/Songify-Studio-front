import MixerPanel from "../UI/MixerPanel";
import SideBar from "./SideBar";
import PlayBar from "./PlayBar";
import MainContent from "./MainContent";
import classes from "./Content.module.css";

function Content(props) {
  return (
    <div className={classes.content}>
      <SideBar />
      <MainContent>
        {/* <MixerPanel /> */}
        {/* {playerCtx.config.length > 0 && <PlayBar />} */}
        <PlayBar />
        {/* {<ToolBar></ToolBar>} */}
      </MainContent>
      {/*} <ToolBar /> */}
    </div>
  );
}

export default Content;
