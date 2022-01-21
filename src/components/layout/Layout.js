import classes from "./Layout.module.css";
import MainNavigation from "../layout/MainNavigation";
import Content from "./Content";

function Layout(props) {
  return (
    <div className={classes.layout}>
      <MainNavigation />
      <Content />
    </div>
  );
}

export default Layout;
