import LoginView from '../LoginView/LoginView';

export default class GenericView {
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

  public static getLoginButton(): HTMLButtonElement {
    const loginButton: HTMLButtonElement = document.createElement('button');
    loginButton.innerHTML = 'Login button';
    loginButton.classList.add('border-solid');
    loginButton.classList.add('border-black');

    loginButton.addEventListener('click', (): void => {
      LoginView.showLoginView();
    });

    return loginButton;
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
