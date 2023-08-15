import htmlToElement from '../../utils/htmlToElement';
import homepageHTML from './homepage.html';

export default class Homepage {
  public init(): void {
    this.draw();
  }

  private draw(): void {
    document.body.append(htmlToElement(homepageHTML)!);
  }
}
