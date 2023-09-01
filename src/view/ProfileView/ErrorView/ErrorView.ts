import Converter from '../../../components/Converter/Converter';
import HTML from './ErrorView.html';
import { DataAttrs } from '../data';

export default class ErrorView {
  private view = Converter.htmlToElement<HTMLDivElement>(HTML) || document.createElement('div');

  public buildView(message: string): HTMLDivElement {
    this.configureParagraph(message);

    return this.view;
  }

  private configureParagraph(message: string): void {
    const paragraph = this.view.querySelector(`[${DataAttrs.ERROR_TEXT}]`);

    if (paragraph) {
      paragraph.textContent = message;
    }
  }
}
