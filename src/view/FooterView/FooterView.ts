import Alpine from 'alpinejs';
import Converter from '../../components/Converter/Converter';
import FooterViewAlpine from './Alpine/FooterViewAlpine';
import FooterViewHTML from './FooterView.html';

export default class FooterView {
  public draw(): void {
    Alpine.data('Footer', FooterViewAlpine);
    document.body.append(Converter.htmlToElement(FooterViewHTML)!);
  }
}
