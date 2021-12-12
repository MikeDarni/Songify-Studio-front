export default class Potentiometer {
  constructor(initVal, description) {
    this.value = initVal;
    this.description = description;
    this.previousValue = 0;
  }

  get currentValue() {
    return this.value;
  }

  checkForChange() {
    if (
      this.value > this.previousValue + 5 ||
      this.value < this.previousValue - 5
    ) {
      this.previousValue = this.value;

      return true;
    } else return false;
  }

  onChange(callback) {
    callback();
  }
}
