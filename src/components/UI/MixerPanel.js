import { serial } from "../../Lib/serial";
import { port } from "../../Lib/console";
import MixerForm from "./MixerForm";
import { potA0VAL } from "../../Lib/console";

function MixerPanel(props) {
  return (
    <div style={styledPanelDiv}>
      <MixerForm />
      <div style={styledImage}>
        <img src="mixerbg.jpg" alt="Mixer image " style={styledImageDiv} />
      </div>
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
  flex: 3,
};
