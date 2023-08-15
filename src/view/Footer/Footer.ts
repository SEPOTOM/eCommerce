import Alpine from 'alpinejs';
import footer from './Alpine/Footer';
import htmlToElement from '../../utils/htmlToElement';
import footerHTML from './footer.html';

export default class Footer {
  public init(): void {
    this.draw();
    this.initAlpine();
  }

  private draw(): void {
    document.body.append(htmlToElement(footerHTML)!);
  }

  private initAlpine() {
    Alpine.data('Footer', footer);
  }
}
