import HeaderView from '../HeaderView/HeaderView';
import FooterView from '../FooterView/FooterView';
import HomepageViewHTML from './HomepageView.html';

export default class HomepageView {
  public drawDefaultContent(): void {
    const main = document.createElement('main');
    main.className = 'flex flex-col flex-grow';

    // Draw base content
    new HeaderView().draw();
    document.body.append(main);
    new HomepageView().draw();
    new FooterView().draw();
  }

  public draw(): void {
    const main: HTMLElement = document.querySelector('main')!;
    main.innerHTML = HomepageViewHTML;
  }
}
