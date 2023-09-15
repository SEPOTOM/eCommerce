import Converter from '../../../components/Converter/Converter';
import HTML from './LinkView.html';
import { Link } from '../../../types';

export default class LinkView {
  private view = Converter.htmlToElement<HTMLLIElement>(HTML) || document.createElement('li');

  public buildView(linkOptions: Link): HTMLLIElement {
    this.configureLink(linkOptions);

    return this.view;
  }

  private configureLink(linkOptions: Link): void {
    const link = this.view.querySelector('a');

    if (link) {
      link.textContent = linkOptions.content;
      link.href = linkOptions.href;
    }
  }
}
