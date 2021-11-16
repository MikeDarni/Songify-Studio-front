import MixerEffectsList from "./MixerEffectsList"
import classes from "./MixerForm.module.css"

function MixerForm(props){

    return (
        <div className =  {classes.effectsForm}>
            <div className = {classes.effectsHeader}>
                Konfiguracja
            </div>
            <MixerEffectsList/>
        </div>
    )
}

export default MixerForm;






