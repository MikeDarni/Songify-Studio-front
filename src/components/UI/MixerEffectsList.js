import {
  ListGroup,
  Dropdown,
  DropdownButton,
  Form,
  Button,
} from "react-bootstrap";
import { effectsNameList } from "../../Lib/Effects";
import { useState, useContext } from "react";
import { playbarInitializeHandler } from "../layout/TestPlayBar";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const mixerElements = [
  { name: "POT 0" },
  { name: "POT 1" },
  { name: "POT 2" },
  { name: "POT 3" },
  { name: "POT 4" },
];

function MixerEffectsList(props) {
  const [selectionList, setSelectionList] = useState([]);
  const [isMixerConfigured, setMixerConfiguration] = useState(false);

  const isPlaylistReady = useSelector(
    (state) => state.myPlayListReducer.isReady
  );
  const submitSelectionHandler = () => {
    // playerContext.setMixerConfig(selectionList);
  };

  const confirmButtonHandler = () => {
    if (isPlaylistReady) {
      setMixerConfiguration(true);
      playbarInitializeHandler();
    }
    // Inicjalizacja playbar'a
    else {
      toast.error("Przed rozpoczęciem zatwierdź listę piosenek!");
    }
  };

  const wrapListElement = (mixerEle, effectList, index) => {
    const onSelectValueChange = (e, eleName, index) => {
      console.log(e.target.value, eleName);
      let currentSelection = {
        id: index,
        name: eleName,
        effect: e.target.value,
      };
      let repetitionFlag = false;
      for (let i = 0; i < selectionList.length; i++) {
        if (selectionList[i].id === currentSelection.id) {
          repetitionFlag = true;
          selectionList[i] = currentSelection;
        }
      }
      if (!repetitionFlag) {
        selectionList.push(currentSelection);
      }
      console.log(selectionList);
    };

    return (
      <ListGroup.Item variant="dark" key={index} style={optionListStyle}>
        {mixerEle.name}
        <Form.Select
          title={"Wybierz efekt"}
          variant="info"
          onChange={(e) => onSelectValueChange(e, mixerEle.name, index)}
        >
          <option>Wybierz efekt!</option>
          {effectList.map((effect, index) => (
            <option>{effect}</option>
          ))}
        </Form.Select>
      </ListGroup.Item>
    );
  };

  return (
    <ListGroup style={styledEffectsList}>
      {mixerElements.map((mixEle, index) =>
        wrapListElement(mixEle, effectsNameList, index)
      )}
      {!isMixerConfigured && (
        <Button
          onClick={confirmButtonHandler}
          variant="primary"
          style={styledButton}
        >
          Rozpocznij!
        </Button>
      )}
    </ListGroup>
  );
}

export default MixerEffectsList;

const styledEffectsList = {
  height: "90%",
  width: "100%",
};

const styledButton = {
  marginTop: "20px",
};

const optionListStyle = {
  backgroundColor: "rgb(165,165,165 )",
};
