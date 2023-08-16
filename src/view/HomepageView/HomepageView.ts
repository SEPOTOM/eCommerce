import Converter from '../../components/Converter/Converter';
import HomepageViewHTML from './HomepageView.html';

export default class HomepageView {
  public init(): void {
    this.draw();
  }

  private draw(): void {
    document.body.append(Converter.htmlToElement(HomepageViewHTML)!);
  }
}
