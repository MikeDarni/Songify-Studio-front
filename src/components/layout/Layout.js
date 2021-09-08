import classes from "./Layout.module.css";
import MainNavigation from "../layout/MainNavigation";
import SideBar from "./SideBar";
import ToolBar from "./ToolBar";
import Content from "./Content";
import PlayBar from "./PlayBar";
import { PlayerContextProvider } from "../../store/player-context";
import { ToolsSettingsProvider } from "../../store/tools-settings-context";
import { WebAudioProvider } from "../../store/web-Audio-Context";

function Layout(props) {
  return (
    <div className={classes.layout}>
      <PlayerContextProvider>
        <MainNavigation />
        <SideBar />
        <Content />
        <ToolsSettingsProvider>
          <WebAudioProvider>
            <ToolBar />
            <PlayBar />
          </WebAudioProvider>
        </ToolsSettingsProvider>
      </PlayerContextProvider>
    </div>
  );
}

export default Layout;
