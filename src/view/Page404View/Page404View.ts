import Page404ViewHTML from './Page404View.html';

export default class Page404View {
  public init(): void {
    this.draw();
  }

  private draw(): void {
    const main: HTMLElement = document.querySelector('main')!;
    main.innerHTML = Page404ViewHTML;
  }
}
