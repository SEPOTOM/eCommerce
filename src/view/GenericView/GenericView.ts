import LoginView from '../LoginView/LoginView';
import loginIcon from '../../assets/svg/login.svg';

export default class GenericView {
  public static loginButtonStyles: string[] = ['w-10'];

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

  public static getLoginButton(): HTMLImageElement {
    const loginImg: HTMLImageElement = document.createElement('img');
    loginImg.src = loginIcon;

    LoginView.addStyles(loginImg, GenericView.loginButtonStyles);

    loginImg.addEventListener('click', (): void => {
      LoginView.showLoginView();
    });

    return loginImg;
  }

  public static buildHeaderView(): HTMLElement {
    const header: HTMLElement = document.createElement('header');

    header.appendChild(GenericView.getLoginButton());
    return header;
  }

  public static buildMainView(): HTMLElement {
    const main: HTMLElement = document.createElement('main');
    main.textContent = 'main placeholder';

    return main;
  }

  public static buildFooterView(): HTMLElement {
    const footer: HTMLElement = document.createElement('footer');
    footer.textContent = 'footer placeholder';

    return footer;
  }
}
