import HomepageViewHTML from './HomepageView.html';

export default class HomepageView {
  public init(): void {
    this.draw();
  }

  private draw(): void {
    const main: HTMLElement = document.querySelector('main')!;
    main.innerHTML = HomepageViewHTML;
  }
}
