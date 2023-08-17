import Alpine from 'alpinejs';
import Converter from '../../components/Converter/Converter';
import HeaderViewAlpine from './Alpine/HeaderViewAlpine';
import HeaderViewHTML from './HeaderView.html';

export default class HeaderView {
  public init(): void {
    this.draw();
    this.initAlpine();
  }

  private initAlpine() {
    Alpine.data('Header', HeaderViewAlpine);
  }

  private draw(): void {
    document.body.append(Converter.htmlToElement(HeaderViewHTML)!);
  }
}
