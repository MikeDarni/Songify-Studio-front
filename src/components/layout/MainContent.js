import classes from "./MainContent.module.css";
import PlayBar from "./PlayBar";

function MainContent(props) {
  return (
    <div className={classes.mainContent}>
      <div className={classes.pageContent}>{props.children}</div>
      <PlayBar />
    </div>
  );
}

export default MainContent;
