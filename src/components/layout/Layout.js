import classes from "./Layout.module.css";
import MainNavigation from "../layout/MainNavigation";
import SideBar from "./SideBar";
import ToolBar from "./ToolBar";
import Content from "./Content";
import PlayBar from "./PlayBar";

function Layout(props) {
  return (
    <div className={classes.layout}>
      <MainNavigation />
      <SideBar />
      <Content />
      <ToolBar />
      <PlayBar />
    </div>
  );
}

export default Layout;
