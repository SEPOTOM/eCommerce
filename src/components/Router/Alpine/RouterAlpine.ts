/* eslint-disable import/no-cycle */
import routers from '../../../data/routers';
import Tokens from '../../Tokens/Tokens';
import Router from '../Router';
import { AlpineRouter } from '../../../types';

// import links
import Navigation from '../../../api/Navigation/Navigation';
import Catalog from '../../../api/Catalog/Catalog';

const RouterAlpine: AlpineRouter = {
  isCustomerLogin: false,
  activeItemMenu: -1,

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
    this.activeItemMenu = -1;
  },

  logout(): void {
    Tokens.deleteCustomerTokens();
  },

  handleLocation(): void {
    const path: string = window.location.pathname;

    // Added a redirect check if the user is already logged in.
    Tokens.getCustomerTokens().then((data) => {
      this.isCustomerLogin = !!data?.access_token;

      Navigation.allCategoryLinks.then(() => {
        Catalog.productLinks.then(() => {
          if (this.isCustomerLogin && (path === '/login' || path === '/registration')) {
            Router.toHomePage();
          } else {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            routers[path] ? routers[path]() : routers['404']();
          }
        });
      });
    });
  },

  checkCustomerLogin(): void {
    Tokens.getCustomerTokens().then((data) => {
      this.isCustomerLogin = !!data?.access_token;
    });
  },
};

/* eslint-disable max-lines-per-function */
export default () => RouterAlpine;
