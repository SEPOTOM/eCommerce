import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Homepage from '../Homepage/Homepage';

export default class GenericView {
  private header: Header;

  private footer: Footer;

  private homepage: Homepage;

  constructor() {
    this.header = new Header();
    this.footer = new Footer();
    this.homepage = new Homepage();
  }

  public buildGenericView(): void {
    this.drawMainPage();
  }

  private drawMainPage(): void {
    this.header.init();
    this.homepage.init();
    this.footer.init();
  }

  //   private buildHeaderView(): HTMLElement {
  //     const header: HTMLElement = document.createElement('header');
  //     header.textContent = 'header placeholder';

  //     return header;
  //   }

  private buildMainView(): HTMLElement {
    const main: HTMLElement = document.createElement('main');
    main.textContent = 'main placeholder';

    return main;
  }

  private buildFooterView(): HTMLElement {
    const footer: HTMLElement = document.createElement('footer');
    footer.textContent = 'footer placeholder';

    return footer;
  }
}
