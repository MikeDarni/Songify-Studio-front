export class Effect {
  constructor(name, initValue, changeEffectFunc, potentiometer, audioContext) {
    this.name = name;
    this.value = initValue;
    this.potentiometer = potentiometer;
    this.callback = changeEffectFunc;
    this.audioContext = audioContext;
  }

  changeEffectVal(newValue) {
    if (this.audioContext) this.callback(newValue, this.audioContext);
    else this.callback(newValue);
  }
}

export const delayFunc = (context, source) => {
  var delay = context.createDelay();
  delay.delayTime.value = 0.8;
  source.connect(delay);
  delay.connect(context.destination);
};

export const filterFunc = (context, source) => {
  let filter = context.createBiquadFilter();
  source.connect(filter);
  filter.connect(context.destination);
  filter.type = "lowpass";
  source.connect(context.destination);
};

export const filterChangeHandler = (newValue, webAudioCtx) => {
  if (webAudioCtx.filter) {
    webAudioCtx.filter.frequency.setTargetAtTime(
      newValue,
      webAudioCtx.audioContext.currentTime,
      0
    );
  }
};

export const effectsNameList = ["Delay", "Filter", "Gain"];
