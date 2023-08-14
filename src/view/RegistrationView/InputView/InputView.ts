import Converter from '../../../components/Converter/Converter';
import { InputOptions } from '../types';
import HTML from './InputView.html';

export default abstract class InputView {
  protected view = Converter.htmlToElement<HTMLDivElement>(HTML) || document.createElement('div');

  protected input = this.view.querySelector('input') || document.createElement('input');

  protected errorBlock = this.view.querySelector('div') || document.createElement('div');

  public buildInputView({ regExp, id, type }: InputOptions): HTMLDivElement {
    this.input.addEventListener('change', () => {
      this.validateInput(regExp);
    });

    if (id) {
      this.input.id = id;
    }

    if (type) {
      this.input.type = type;
    }

    return this.view;
  }

  protected abstract validateInput(regExp: RegExp): void;

  protected isValid(regExp: RegExp): boolean {
    return regExp.test(this.input.value);
  }
}
