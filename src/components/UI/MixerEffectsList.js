import {ListGroup, Dropdown, DropdownButton} from "react-bootstrap"

const effects = [
    {name: "Delay"}, {name: "Reverb"}
]

const mixerElements = [
    {name: "POT 0"},
    {name: "POT 1"},
    {name: "POT 2"},
    {name: "POT 3"},
    {name: "POT 4"},
]


function MixerEffectsList(props){

    const wrapListElement = (mixerEle, effectList) =>{
            return (
              <ListGroup.Item variant = "dark">
                {mixerEle.name}
                 <DropdownButton title = {"Wybierz efekt"} variant ="info">
                 {effectList.map((effect) =><Dropdown.Item as="button">
                     <div onClick={(e) => this.changeValue(e.target.textContent)}>{effect.name}
                </div></Dropdown.Item> )}
                </DropdownButton>
              </ListGroup.Item>
            )
    }


    return(
        <ListGroup style = {styledEffectsList}>
        {mixerElements.map((mixEle) => wrapListElement(mixEle, effects))}
               </ListGroup>
    )

            
            
}





export default MixerEffectsList;


const styledEffectsList = {

    height: "90%",
    width:  "100%",

}

