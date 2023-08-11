import htmlToElement from '../../../utils/htmlToElement';
import { InputOptions } from '../types';
import HTML from './InputView.html';

export default abstract class InputView {
  protected input = htmlToElement<HTMLInputElement>(HTML) || document.createElement('input');

  public buildInputView({ regExp, id, type }: InputOptions): HTMLInputElement {
    this.input.addEventListener('change', () => {
      this.validateInput(regExp);
    });

    if (id) {
      this.input.id = id;
    }

    if (type) {
      this.input.type = type;
    }

    return this.input;
  }

  protected abstract validateInput(regExp: RegExp): void;

  protected isValid(regExp: RegExp): boolean {
    return regExp.test(this.input.value);
  }
}
