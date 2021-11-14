import classes from "./MainContent.module.css";
import PlayBar from "./PlayBar";

function MainContent(props) {
  return (
    <div className={classes.mainContent}>
          <div style= {styledImage}>
                <img src="mixerbg.jpg" alt="Mixer image " style={styledImageDiv} />
          </div>

    </div>
  );
}

export default MainContent;

const styledImage = {
        height: "500px"
}

const styledImageDiv = {
padding: "50px",
width: "1000px",
maxHeight: "100%",
}






