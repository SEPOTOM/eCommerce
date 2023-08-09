import LoginView from '../LoginView/LoginView';

export default class GenericView {
  public buildGenericView(): void {
    const wrapper: HTMLDivElement = document.createElement('div');
    const header: HTMLElement = this.buildHeaderView();
    const main: HTMLElement = this.buildMainView();
    const footer: HTMLElement = this.buildFooterView();
    wrapper.appendChild(header);
    wrapper.appendChild(main);
    wrapper.appendChild(footer);
    document.body.appendChild(wrapper);
  }

  private getLoginButton(): HTMLButtonElement {
    const loginButton: HTMLButtonElement = document.createElement('button');
    loginButton.innerHTML = 'Login button';
    loginButton.classList.add('border-solid');
    loginButton.classList.add('border-black');

    loginButton.addEventListener('click', (): void => {
      LoginView.showLoginView();
    });

    return loginButton;
  }

  private buildHeaderView(): HTMLElement {
    const header: HTMLElement = document.createElement('header');

    header.appendChild(this.getLoginButton());
    return header;
  }

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
