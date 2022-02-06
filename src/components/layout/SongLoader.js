class SongLoader {
  constructor(context) {
    this.context = context;
    this.songsBuffer = new Array(2);
  }

  getSong(index) {
    if (index < this.songsBuffer.length) return this.songsBuffer[index];
  }
}
