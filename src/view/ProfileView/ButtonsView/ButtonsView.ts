import Converter from '../../../components/Converter/Converter';
import HTML from './ButtonsView.html';
import { DataAttrs } from '../data';

export default class ButtonsView {
  private view = Converter.htmlToElement<HTMLDivElement>(HTML) || document.createElement('div');

  public buildView(): HTMLDivElement {
    return this.view;
  }

  public getCancelButton(): HTMLButtonElement {
    const button = this.view.querySelector(`[${DataAttrs.CANCEL_BUTTON}]`);

    if (button instanceof HTMLButtonElement) {
      return button;
    }

    return document.createElement('button');
  }

  public getSaveButton(): HTMLButtonElement {
    const button = this.view.querySelector(`[${DataAttrs.SAVE_BUTTON}]`);

    if (button instanceof HTMLButtonElement) {
      return button;
    }

    return document.createElement('button');
  }

  public showSuccessMessage(): void {
    this.view.dataset.success = 'true';
  }

  public showErrorMessage(message: string): void {
    const errorBlock = this.view.querySelector(`[${DataAttrs.ERROR_TEXT}]`);

    if (errorBlock) {
      errorBlock.textContent = message;
    }

    this.view.dataset.error = 'true';
  }

  public hideSuccessMessage(): void {
    this.view.dataset.success = 'false';
  }

  public hideErrorMessage(): void {
    this.view.dataset.error = 'false';
  }
}
