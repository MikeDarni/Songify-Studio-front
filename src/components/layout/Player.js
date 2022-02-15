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
  constructor(context, playlist) {
    this.context = context;
    this.source = new AudioBufferSourceNode(context);
    this.sourceGain = new GainNode(context);
    this.songsBuffer = new Array(2);
    this.playlist = playlist;
    this.source.connect(this.sourceGain);
    this.isPlaying = false;
    console.log(playlist);
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
      this.loadTrack();
      // if (this.playlist.length > 0) {
      //   this.playlist.shift();
      //   this.songsBuffer.shift();
      //   console.log(this.songsBuffer);
      // }
    };
    this.source.connect(this.sourceGain);
    this.sourceGain.gain.value = 0.5;
    this.sourceGain.connect(this.context.destination);
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
}
