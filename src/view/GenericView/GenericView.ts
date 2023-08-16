import Header from '../HeaderView/HeaderView';
import Footer from '../FooterView/FooterView';
import Homepage from '../HomepageView/HomepageView';

import LoginView from '../LoginView/LoginView';

export default class GenericView {
  private header: Header;

  private footer: Footer;

  private homepage: Homepage;

//   private page404: Page404;

  constructor() {
    this.header = new Header();
    this.footer = new Footer();
    this.homepage = new Homepage();
    // this.page404 = new Page404();
  }

  public buildGenericView(): void {
    this.drawMainPage();
    // this.drawLoginPage();
  }

  private drawMainPage(): void {
    this.header.init();
    // this.page404.init();
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
