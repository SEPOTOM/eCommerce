import Alpine from 'alpinejs';
import header from './Alpine/Header';
import htmlToElement from '../../utils/htmlToElement';
import headerHTML from './header.html';

export default class Header {
  public init(): void {
    this.draw();
    this.initAlpine();
  }

  private draw(): void {
    document.body.append(htmlToElement(headerHTML)!);
  }

  private initAlpine() {
    Alpine.data('Header', header);
  }
}
