import classes from "./Layout.module.css";
import MainNavigation from "../layout/MainNavigation";
import SideBar from "./SideBar";
import ToolBar from "./ToolBar";
import Content from "./Content";
import PlayBar from "./PlayBar";
import { PlayerContextProvider } from "../../store/player-context";

function Layout(props) {
  return (
    <div className={classes.layout}>
      <PlayerContextProvider>
        <MainNavigation />
        <SideBar />
        <Content />
        <ToolBar />
        <PlayBar />
      </PlayerContextProvider>
    </div>
  );
}

export default Layout;
