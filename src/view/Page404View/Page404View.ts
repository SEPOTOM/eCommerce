import Converter from '../../components/Converter/Converter';
import Page404ViewHTML from './Page404View.html';

export default class Page404View {
  public init(): void {
    this.draw();
  }

  private draw(): void {
    document.body.append(Converter.htmlToElement(Page404ViewHTML)!);
  }
}
