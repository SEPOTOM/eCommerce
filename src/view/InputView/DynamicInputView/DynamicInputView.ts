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
      this.makeInputInvalid(this.message);
    } else {
      this.makeInputValid();
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
