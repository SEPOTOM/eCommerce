import InputView from '../InputView';

export default class SimpleInputView extends InputView {
  protected validateInput(regExp: RegExp): void {
    if (this.isValid(regExp)) {
      this.input.dataset.valid = 'true';
      console.log(`${this.input.id} is valid!`);
    } else {
      this.input.dataset.valid = 'false';
      console.error(`${this.input.id} is invalid!`);
    }
  }
}
