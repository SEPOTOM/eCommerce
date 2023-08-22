import Alpine from 'alpinejs';
import Converter from '../../components/Converter/Converter';
import HeaderViewAlpine from './Alpine/HeaderViewAlpine';
import HeaderViewHTML from './HeaderView.html';

export default class HeaderView {
  public draw(): void {
    Alpine.data('Header', HeaderViewAlpine);
    document.body.append(Converter.htmlToElement(HeaderViewHTML)!);
  }
}
