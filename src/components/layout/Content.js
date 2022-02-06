import MixerPanel from "../UI/MixerPanel";
import SideBar from "./SideBar";
import TestPlayBar from "./TestPlayBar";
import MainContent from "./MainContent";
import classes from "./Content.module.css";
import RightBar from "./RightBar";
import { Route, Switch } from "react-router-dom";
import SongAddForm from "../UI/SongAddForm";

function Content(props) {
  return (
    <div className={classes.content}>
      <SideBar />
      <Switch>
        <Route path="/new-song">
          <MainContent>
            <SongAddForm />
          </MainContent>
        </Route>
        <Route path="/">
          <MainContent>
            {/* <MixerPanel /> */}
            {/* {playerCtx.config.length > 0 && <PlayBar />} */}
            <TestPlayBar />
            {/* {<ToolBar></ToolBar>} */}
          </MainContent>
          <RightBar />
        </Route>
      </Switch>
      {/*} <ToolBar /> */}
    </div>
  );
}

export default Content;
