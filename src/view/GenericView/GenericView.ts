import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Homepage from '../Homepage/Homepage';

import LoginView from '../LoginView/LoginView';
import loginIcon from '../../assets/svg/login.svg';

export default class GenericView {
    private header: Header;

    private footer: Footer;
  
    private homepage: Homepage;

  private static loginButtonStyles: string[] = ['w-10'];

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

// TODO: if you need check Login page, please change it in the buildGenericView method
  private drawLoginPage(): void {
    this.header.init();
    this.getLoginButton();
    this.footer.init();
  }

  private getLoginButton(): HTMLImageElement {
    const loginImg: HTMLImageElement = document.createElement('img');
    loginImg.src = loginIcon;

    LoginView.addStyles(loginImg, GenericView.loginButtonStyles);

    loginImg.addEventListener('click', (): void => {
      const main: HTMLElement = document.querySelector('main') as HTMLElement;
      main.appendChild(LoginView.showLoginView());
    });

    return loginImg;
  }
}


