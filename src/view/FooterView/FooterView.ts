import Alpine from 'alpinejs';
import Converter from '../../components/Converter/Converter';
import FooterViewAlpine from './Alpine/FooterViewAlpine';
import FooterViewHTML from './FooterView.html';

export default class FooterView {
  public init(): void {
    this.draw();
    this.initAlpine();
  }

  private initAlpine() {
    Alpine.data('Footer', FooterViewAlpine);
  }

  private draw(): void {
    document.body.append(Converter.htmlToElement(FooterViewHTML)!);
  }
}
