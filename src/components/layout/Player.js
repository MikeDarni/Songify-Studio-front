import store from "../../store/store";
import { deleteSong } from "../../store/playlistSlice";

export async function fetchAudioBuffer(context, url) {
  const response = await fetch(url);
  const responseBuffer = await response.arrayBuffer();

  return await context.decodeAudioData(responseBuffer);
}

// export async function oldFetchAudioBuffer(buffer, context, url) {
//   var source = context.createBufferSource();
//   const response = await fetch(url);
//   const responseBuffer = await response.arrayBuffer();
//   console.log(responseBuffer);

//   context.decodeAudioData(responseBuffer, (decoded) => {
//     buffer = decoded;
//     console.log(buffer);
//   });
// }

// export async function init(context, buffer, url) {
//   context = new AudioContext();
//   oldFetchAudioBuffer(buffer, context, url);
// }

export class Player {
  constructor(context, playlist, consoleConfig) {
    this.context = context;
    this.source = new AudioBufferSourceNode(context);
    this.sourceGain = new GainNode(context);
    this.songsBuffer = new Array(2);
    this.playlist = playlist;
    this.source.connect(this.sourceGain);
    this.isPlaying = false;
    this.consoleConfiguration = consoleConfig;
    this.effectsList = [];
  }

  async bufferInit(url) {
    for (let i = 0; i < 2; i++) {
      this.songsBuffer[i] = await fetchAudioBuffer(
        this.context,
        url + this.playlist[i].id
      );
    }
    console.log(this.songsBuffer);
  }

  async loadTrack(url) {
    await this.bufferInit(url);

    if (this.isPlaying) this.source.stop(0);

    this.source = new AudioBufferSourceNode(this.context, {
      buffer: this.songsBuffer[0],
    });
    this.source.onended = function () {
      store.dispatch(deleteSong());
      this.songsBuffer.shift();
      //this.loadTrack();
      this.sourceGain.gain.linearRampToValueAtTime(
        1,
        this.context.currentTime + 5
      );
      // if (this.playlist.length > 0) {
      //   this.playlist.shift();
      //   this.songsBuffer.shift();
      //   console.log(this.songsBuffer);
      // }
    };
    this.addGainEffect();

    if (this.isPlaying) {
      this.source.start(0);
    }
  }

  volumeUp() {
    this.sourceGain.gain.value += 0.5;
  }

  play(time) {
    this.source.start(time);
    this.isPlaying = true;
  }

  resume() {
    this.context.resume();
    this.isPlaying = true;
  }

  stop(time) {
    this.context.suspend();
    this.isPlaying = false;
  }

  addDelayEffect() {
    // parametr: POT value i name
    var delay = this.context.createDelay();
    delay.delayTime.value = 2;
    this.source.connect(delay);
    delay.connect(this.context.destination);
    this.effectsList.push(new Effect("Delay", 0.1, delay));
  }

  addLowPassFilterEffect() {
    // parametr: POT value i name
    var filter = this.context.createBiquadFilter();
    this.source.connect(filter);
    filter.connect(this.context.destination);
    filter.type = "lowpass"; // Low-pass filter. See BiquadFilterNode docs
    filter.frequency.value = 500; // Set cutoff to 440 HZ
    this.effectsList.push(new Effect("Filter", 0.1, filter));
  }

  addGainEffect() {
    // parametr: POT value i name
    this.source.connect(this.sourceGain);
    this.sourceGain.gain.value = 0.5;
    this.sourceGain.connect(this.context.destination);
    this.effectsList.push(new Effect("Gain", 0.1, this.sourceGain));
  }

  changeEffectValue(potState) {
    for (var i = 0; i < this.consoleConfiguration.length; i++) {
      var currentConfig = this.consoleConfiguration[i];
      if (currentConfig.name === potState.name) {
        var adjustedValue = this.adjustEffectValue(
          currentConfig.effect,
          potState.value
        );

        switch (currentConfig.effect) {
          case "Gain":
            console.log("JEST W GEJN");
            var effectObj = this.effectsList.find(
              (item) => item.name === "Gain"
            );
            if (effectObj) {
              this.sourceGain.gain.value = adjustedValue;
            }
            break;
          case "Filter":
            console.log("Jest w filter!");
            var effectObj = this.effectsList.find(
              (item) => item.name === "Filter"
            );
            if (effectObj) {
              effectObj.frequency.value = adjustedValue;
            }
        }
      }
    }
  }

  adjustEffectValue(effectName, potVal) {
    // postState value: 0 - 1023
    console.log("Otrzymana wartość:");
    console.log(potVal);
    switch (effectName) {
      case "Delay":
        console.log("Delay value adjusted");
        return potVal / 1024;
      case "Gain":
        console.log("Gain value adjusted");
        return potVal / 612;
      case "Filter":
        console.log("Filter value adjusted");
        return potVal * 2;
    }
  }
}

class Effect {
  constructor(name, paramValue, obj) {
    this.name = name;
    this.value = paramValue;
    this.effectOjb = obj;
  }
}
