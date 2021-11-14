import classes from "./Layout.module.css";
import MainNavigation from "../layout/MainNavigation";
import Content from "./Content";
import { PlayerContextProvider } from "../../store/player-context";
import { ToolsSettingsProvider } from "../../store/tools-settings-context";
import { WebAudioProvider } from "../../store/web-Audio-Context";

function Layout(props) {
  return (
    <div className={classes.layout}>
      <PlayerContextProvider>
        <MainNavigation />
        <ToolsSettingsProvider>
          <WebAudioProvider>
            <Content />
          </WebAudioProvider>
        </ToolsSettingsProvider>
      </PlayerContextProvider>
    </div>
  );
}

export default Layout;
