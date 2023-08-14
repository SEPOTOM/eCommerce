import Converter from '../../../components/Converter/Converter';
import { InputOptions, PatternAndMessage } from '../types';
import HTML from './InputView.html';

export default class InputView {
  protected view = Converter.htmlToElement<HTMLDivElement>(HTML) || document.createElement('div');

  protected input = this.view.querySelector('input') || document.createElement('input');

  protected errorBlock = this.view.querySelector('div') || document.createElement('div');

  protected validationData: PatternAndMessage[] | null = null;

  public buildInputView({ validationData, id, type }: InputOptions): HTMLDivElement {
    this.input.addEventListener('change', this.validateInput.bind(this));

    this.validationData = validationData;

    if (id) {
      this.input.id = id;
    }

    if (type) {
      this.input.type = type;
    }

    return this.view;
  }

  public validateInput(): void {
    if (this.validationData) {
      for (let i = 0; i < this.validationData.length; i += 1) {
        const [regExp, message] = this.validationData[i];

        if (!this.isValid(regExp)) {
          this.makeInputInvalid(message);
          break;
        } else {
          this.makeInputValid();
        }
      }
    }
  }

  protected isValid(regExp: RegExp): boolean {
    return regExp.test(this.input.value);
  }

  protected makeInputValid(): void {
    this.input.dataset.valid = 'true';
    this.errorBlock.textContent = '';
  }

  protected makeInputInvalid(message: string): void {
    this.input.dataset.valid = 'false';
    this.errorBlock.textContent = message;
  }
}
