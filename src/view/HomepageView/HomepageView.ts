import HeaderView from '../HeaderView/HeaderView';
import FooterView from '../FooterView/FooterView';
import HomepageViewHTML from './HomepageView.html';

// Import images to Home page
import imgMainBanner from '../../assets/main-banner.jpg';
import imgInfoBanner1 from '../../assets/banner-info1.jpg';
import imgInfoBanner2 from '../../assets/banner-info2.jpg';

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

    // Insert images
    const mainBanner: HTMLElement = document.querySelector('[data-element="main-banner"]')!;
    const infoBanner1: HTMLElement = document.querySelector('[data-element="info-banner-1"]')!;
    const infoBanner2: HTMLElement = document.querySelector('[data-element="info-banner-2"]')!;

    mainBanner.setAttribute('style', `background-image: url('${imgMainBanner}')`);
    infoBanner1.setAttribute('style', `background-image: url('${imgInfoBanner1}')`);
    infoBanner2.setAttribute('style', `background-image: url('${imgInfoBanner2}')`);
  }
}
