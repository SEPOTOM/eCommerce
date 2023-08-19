import routers from '../../../data/routers';
import Tokens from '../../Tokens/Tokens';

export default () => ({
  isCustomerLogin: false,

  init(): void {
    this.handleLocation();
    this.checkCustomerLogin();

    window.addEventListener('popstate', () => {
      this.handleLocation();
    });
  },

  route(event: Event): void {
    event.preventDefault();

    const link: HTMLAnchorElement | null = (event.target as HTMLLinkElement).closest('a');
    let href: string | undefined = link?.href;

    href = !href ? window.location.origin : href;

    window.history.pushState({}, '', href);
    this.handleLocation();
  },

  logout(): void {
    Tokens.deleteCustomerTokens();
  },

  handleLocation(): void {
    const path: string = window.location.pathname;
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    routers[path] ? routers[path]() : routers['404']();
  },

  checkCustomerLogin(): void {
    this.isCustomerLogin = !!localStorage.getItem('refresh_token');
  },
});
