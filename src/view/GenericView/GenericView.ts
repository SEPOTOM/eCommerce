import HeaderView from '../HeaderView/HeaderView';
import FooterView from '../FooterView/FooterView';
import HomepageView from '../HomepageView/HomepageView';
import LoginView from '../LoginView/LoginView';
import RegistrationView from '../RegistrationView/RegistrationView';
import Page404View from '../Page404View/Page404View';

export default class GenericView {
  public buildGenericView(): void {
    const main = document.createElement('main');
    main.className = 'flex flex-col flex-grow';

    // Draw base content
    new HeaderView().init();
    document.body.append(main);
    new FooterView().init();

    this.drawMainPage();
    // this.drawLoginPage();
    // this.drawPage404();
  }

  public drawMainPage(): void {
    new HomepageView().init();
  }

  // TODO: use it in "buildGenericView" for display [ Login ] page
  public drawLoginPage(): void {
    const main: HTMLElement = document.querySelector('main')!;
    main.innerHTML = '';
    main.append(LoginView.showLoginView());
  }

  // TODO: use it in "buildGenericView" for display [ Registration ] page
  public drawRegistrationPage(): void {
    const main: HTMLElement = document.querySelector('main')!;
    main.innerHTML = '';
    main.append(new RegistrationView().buildRegistrationView());
  }

  // TODO: use it in "buildGenericView" for display [ 404 ] page
  public drawPage404(): void {
    new Page404View().init();
  }
}
