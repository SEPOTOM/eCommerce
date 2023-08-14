import InputView from '../InputView';

export default class DynamicInputView extends InputView {
  constructor(
    private regExp: RegExp,
    private message: string
  ) {
    super();
  }

  public validateInput(): void {
    if (!this.isValid(this.regExp)) {
      this.input.dataset.valid = 'false';
      this.errorBlock.textContent = this.message;
    } else {
      this.input.dataset.valid = 'true';
      this.errorBlock.textContent = '';
    }

    if (!this.errorBlock.textContent) {
      super.validateInput();
    }
  }

  public setRegExp(regExp: RegExp): void {
    this.regExp = regExp;
  }

  public setErrorMessage(message: string): void {
    this.message = message;
  }
}
