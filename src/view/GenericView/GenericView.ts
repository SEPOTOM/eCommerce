import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Homepage from '../Homepage/Homepage';
import Page404 from '../Page404/Page404';

export default class GenericView {
  private header: Header;

  private footer: Footer;

  private homepage: Homepage;

  private page404: Page404;

  constructor() {
    this.header = new Header();
    this.footer = new Footer();
    this.homepage = new Homepage();
    this.page404 = new Page404();
  }

  public buildGenericView(): void {
    this.drawMainPage();
  }

  private drawMainPage(): void {
    this.header.init();
    this.page404.init();
    // this.homepage.init();
    this.footer.init();
  }

  //   private buildHeaderView(): HTMLElement {
  //     const header: HTMLElement = document.createElement('header');
  //     header.textContent = 'header placeholder';

  //     return header;
  //   }

  //   private buildMainView(): HTMLElement {
  //     const main: HTMLElement = document.createElement('main');
  //     main.textContent = 'main placeholder';

  //     return main;
  //   }

  //   private buildFooterView(): HTMLElement {
  //     const footer: HTMLElement = document.createElement('footer');
  //     footer.textContent = 'footer placeholder';

  //     return footer;
  //   }
}
