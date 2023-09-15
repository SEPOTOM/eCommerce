import Converter from '../../components/Converter/Converter';
import HTML from './PromoCodeView.html';
import { DataAttrs } from './data';

export default class PromoCodeView {
  private view = Converter.htmlToElement<HTMLLIElement>(HTML) || document.createElement('li');

  public buildView(code: string, description: string): HTMLLIElement {
    this.configureCode(code);
    this.configureDescription(description);

    return this.view;
  }

  private configureCode(code: string): void {
    const codeBlock = this.view.querySelector(`[${DataAttrs.CODE}]`);

    if (codeBlock) {
      codeBlock.textContent = code;
    }
  }

  private configureDescription(description: string): void {
    const descriptionBlock = this.view.querySelector(`[${DataAttrs.DESCRIPTION}]`);

    if (descriptionBlock) {
      descriptionBlock.textContent = description;
    }
  }
}
