import HeaderView from '../HeaderView/HeaderView';
import FooterView from '../FooterView/FooterView';
import HomepageView from '../HomepageView/HomepageView';
import LoginView from '../LoginView/LoginView';
import Page404View from '../Page404View/Page404View';

export default class GenericView {
  private header: HeaderView;

  private footer: FooterView;

  private homepage: HomepageView;

  private page404: Page404View;

  constructor() {
    this.header = new HeaderView();
    this.footer = new FooterView();
    this.homepage = new HomepageView();
    this.page404 = new Page404View();
  }

  public buildGenericView(): void {
    const main = document.createElement('main');
    main.className = 'flex flex-col flex-grow';

    // Draw base content
    this.header.init();
    document.body.append(main);
    this.footer.init();

    this.drawMainPage();
    // this.drawLoginPage();
    // this.drawPage404();
  }

  private drawMainPage(): void {
    this.homepage.init();
  }

  // TODO: use it in "buildGenericView" for display [ Login ] page
  private drawLoginPage(): void {
    const main: HTMLElement = document.querySelector('main')!;
    main.innerHTML = '';
    main.append(LoginView.showLoginView());
  }

  // TODO: use it in "buildGenericView" for display [ 404 ] page
  private drawPage404(): void {
    this.page404.init();
  }
}
