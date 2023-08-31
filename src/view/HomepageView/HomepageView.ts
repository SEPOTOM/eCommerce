import Alpine from 'alpinejs';
import HeaderView from '../HeaderView/HeaderView';
import FooterView from '../FooterView/FooterView';
import HomepageViewHTML from './HomepageView.html';
import HomepageViewAlpine from './Alpine/HomepageViewAlpine';

export default class HomepageView {
  public drawDefaultContent(): void {
    const main = document.createElement('main');
    const breadcrumbs = document.createElement('section');
    main.className = 'flex flex-col flex-grow';
    breadcrumbs.setAttribute('data-element', 'breadcrumbs');

    // Draw base content
    new HeaderView().draw();
    document.body.append(breadcrumbs);
    document.body.append(main);
    new FooterView().draw();
  }

  public draw(): void {
    Alpine.data('Homepage', HomepageViewAlpine);
    const main: HTMLElement = document.querySelector('main')!;
    main.innerHTML = HomepageViewHTML;
  }
}
