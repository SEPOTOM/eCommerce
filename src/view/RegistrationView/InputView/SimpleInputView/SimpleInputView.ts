import InputView from '../InputView';

export default class SimpleInputView extends InputView {
  protected validateInput(regExp: RegExp): void {
    if (this.isValid(regExp)) {
      this.input.dataset.valid = 'true';
      this.errorBlock.textContent = '';
    } else {
      this.input.dataset.valid = 'false';
      this.errorBlock.textContent = `${this.input.id} is invalid!`;
    }
  }
}
