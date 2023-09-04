import Converter from '../../components/Converter/Converter';
import FooterViewHTML from './FooterView.html';

export default class FooterView {
  public draw(): void {
    document.body.append(Converter.htmlToElement(FooterViewHTML)!);
  }
}
