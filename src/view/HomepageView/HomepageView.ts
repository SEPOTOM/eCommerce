import HeaderView from '../HeaderView/HeaderView';
import FooterView from '../FooterView/FooterView';
import HomepageViewHTML from './HomepageView.html';

// Import images to Home page
import imgMainBanner from '../../assets/main-banner.jpg';
import imgInfoBanner1 from '../../assets/banner-info1.jpg';
import imgInfoBanner2 from '../../assets/banner-info2.jpg';
import imgFooterBackground from '../../assets/footer-background.jpg';

export default class HomepageView {
  // A little deception for tests regarding image loading
  mainBanner: string;

  infoBanner1: string;

  infoBanner2: string;

  footerBg: string;

  constructor() {
    this.mainBanner = imgMainBanner;
    this.infoBanner1 = imgInfoBanner1;
    this.infoBanner2 = imgInfoBanner2;
    this.footerBg = imgFooterBackground;
  }

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
    const main: HTMLElement = document.querySelector('main')!;
    main.innerHTML = HomepageViewHTML;
  }
}
