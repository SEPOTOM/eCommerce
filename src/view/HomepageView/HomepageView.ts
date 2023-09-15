/* eslint-disable import/no-cycle */
import Discount from '../../components/Discount/Discount';

import HeaderView from '../HeaderView/HeaderView';
import FooterView from '../FooterView/FooterView';
import PromoCodeView from '../PromoCodeView/PromoCodeView';
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

    this.drawPromoCodes();
  }

  private async drawPromoCodes(): Promise<void> {
    const codesInfo = await Discount.getCodes();

    if ('message' in codesInfo) {
      return;
    }

    const promoBlock = document.querySelector('[data-element="promo-block"]');
    const promoList = document.querySelector('[data-element="promo-list"]');

    if (promoBlock instanceof HTMLElement && promoList && codesInfo.length > 0) {
      promoBlock.hidden = false;

      codesInfo.forEach(({ code, description }) => {
        const codeBlock = new PromoCodeView().buildView(code, description);
        promoList.append(codeBlock);
      });
    }
  }
}
