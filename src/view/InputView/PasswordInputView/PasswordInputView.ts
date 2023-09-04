import Converter from '../../../components/Converter/Converter';
import InputView from '../InputView';
import HTMLButton from './CloseHideButton.html';
import { InputTypes } from '../../../data/validation';

export default class PasswordInputView extends InputView {
  private button = Converter.htmlToElement<HTMLButtonElement>(HTMLButton) || document.createElement('button');

  constructor() {
    super();

    this.view.append(this.button);

    this.button.addEventListener('click', this.togglePasswordVisibility.bind(this));
  }

  private togglePasswordVisibility(): void {
    if (this.button.dataset.opened === 'true') {
      this.button.dataset.opened = 'false';
      this.input.type = InputTypes.PASSWORD;
    } else {
      this.button.dataset.opened = 'true';
      this.input.type = InputTypes.TEXT;
    }
  }
}
