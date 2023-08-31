import Converter from '../../../components/Converter/Converter';
import HTML from './ParagraphView.html';

export default class ParagraphView {
  private view = Converter.htmlToElement<HTMLParagraphElement>(HTML) || document.createElement('p');

  public buildView(labelText: string, contentText: string): HTMLParagraphElement {
    this.configureView(labelText, contentText);

    return this.view;
  }

  private configureView(labelText: string, contentText: string): void {
    this.configureLabel(labelText);
    this.configureContent(contentText);
  }

  private configureLabel(labelText: string): void {
    const label = this.view.firstElementChild;

    if (label) {
      label.textContent = labelText;
    }
  }

  private configureContent(contentText: string): void {
    const content = this.view.lastElementChild;

    if (content) {
      content.textContent = contentText;
    }
  }
}
