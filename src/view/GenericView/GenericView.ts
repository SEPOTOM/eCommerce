import LoginView from '../LoginView/LoginView';
import loginIcon from '../../assets/svg/login.svg';

export default class GenericView {
  private static loginButtonStyles: string[] = ['w-10'];

  public static buildGenericView(): void {
    const wrapper: HTMLDivElement = document.createElement('div');
    const header: HTMLElement = GenericView.buildHeaderView();
    const main: HTMLElement = GenericView.buildMainView();
    const footer: HTMLElement = GenericView.buildFooterView();
    wrapper.appendChild(header);
    wrapper.appendChild(main);
    wrapper.appendChild(footer);
    document.body.appendChild(wrapper);
  }

  private static getLoginButton(): HTMLImageElement {
    const loginImg: HTMLImageElement = document.createElement('img');
    loginImg.src = loginIcon;

    LoginView.addStyles(loginImg, GenericView.loginButtonStyles);

    loginImg.addEventListener('click', (): void => {
      const main: HTMLElement = document.querySelector('main') as HTMLElement;
      main.appendChild(LoginView.showLoginView());
    });

    return loginImg;
  }

  private static buildHeaderView(): HTMLElement {
    const header: HTMLElement = document.createElement('header');

    header.appendChild(GenericView.getLoginButton());
    return header;
  }

  private static buildMainView(): HTMLElement {
    const main: HTMLElement = document.createElement('main');
    main.textContent = 'main placeholder';

    return main;
  }

  private static buildFooterView(): HTMLElement {
    const footer: HTMLElement = document.createElement('footer');
    footer.textContent = 'footer placeholder';

    return footer;
  }
}
