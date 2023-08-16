import Header from '../Header/HeaderView';
import Footer from '../Footer/FooterView';
import Homepage from '../Homepage/HomepageView';

import LoginView from '../LoginView/LoginView';

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
    // this.drawLoginPage();
  }

  private drawMainPage(): void {
    this.header.init();
    this.homepage.init();
    this.footer.init();
  }

  // TODO: if you need check Login page, please change it in the buildGenericView method
  private drawLoginPage(): void {
    this.header.init();
    document.body.append(LoginView.showLoginView());
    this.footer.init();
  }
}
