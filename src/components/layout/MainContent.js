import classes from "./MainContent.module.css";
import PlayBar from "./PlayBar";

function MainContent(props) {

  return (
      <div className = {classes.mainContent}>{props.children}</div>
  );
}

export default MainContent;





