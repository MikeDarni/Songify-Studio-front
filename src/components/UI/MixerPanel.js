import { serial } from "../../Lib/serial";
import { port } from "../../Lib/console";
import MixerForm from "./MixerForm";
import { potA0VAL } from "../../Lib/console";

function MixerPanel(props) {
  const connectBoard = () => {
    console.log(potA0VAL);
    console.log(typeof potA0VAL);
  };

  return (
    <div style={styledPanelDiv}>
      <MixerForm />
      <div style={styledImage}>
        <img src="mixerbg.jpg" alt="Mixer image " style={styledImageDiv} />
      </div>
      <button onClick={connectBoard} />
    </div>
  );
}

export default MixerPanel;

const styledImage = {
  height: "500px",
};

const styledImageDiv = {
  width: "1000px",
  maxHeight: "100%",
};

const styledPanelDiv = {
  display: "flex",
  flexDirection: "row",
  padding: "50px",
};
