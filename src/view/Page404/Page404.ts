import htmlToElement from '../../utils/htmlToElement';
import page404HTML from './page404.html';

export default class Page404 {
  public init(): void {
    this.draw();
  }

  private draw(): void {
    document.body.append(htmlToElement(page404HTML)!);
  }
}
