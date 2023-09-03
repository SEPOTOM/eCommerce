import Page404View from './../../../view/Page404View/Page404View';
import LoginView from './../../..//view/LoginView/LoginView';
import HomepageView from './../../..//view/HomepageView/HomepageView';
import RegistrationView from './../../..//view/RegistrationView/RegistrationView';
import ProfileView from './../../..//view/ProfileView/ProfileView';
import CatalogView from './../../..//view/CatalogView/CatalogView';
import BreadcrumbsView from './../../..//view/BreadcrumbsView/BreadcrumbsView';
import ProductView from './../../..//view/ProductView/ProductView';

/* eslint-disable import/no-cycle */
// import routers from '../../../data/routers';
import Tokens from '../../Tokens/Tokens';
import Router from '../Router';

// import links
import Navigation from '../../../api/Navigation/Navigation';

// Types
import { INavigation, IRouteProductLink } from './../../../api/Navigation/types/types';

const RouterAlpine = {
  isCustomerLogin: false,
  activeItemMenu: -1,
  routers: {},
  menu: null,

  init(): void {
    this.createRoutingPath();
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

      if (this.isCustomerLogin && (path === '/login' || path === '/registration')) {
        Router.toHomePage();
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        this.routers[path] ? this.routers[path]() : this.routers['404']();
      }
    });
  },

  checkCustomerLogin(): void {
    Tokens.getCustomerTokens().then((data) => {
      this.isCustomerLogin = !!data?.access_token;
    });
  },

  createRoutingPath(): void {
    this.routers['404'] = () => {
      new Page404View().draw();
      BreadcrumbsView.clear();
    };

    this.routers['/'] = () => {
      new HomepageView().draw();
      BreadcrumbsView.clear();
    };

    this.routers['/login'] = () => {
      LoginView.draw();
      BreadcrumbsView.clear();
    };

    this.routers['/registration'] = () => {
      RegistrationView.draw();
      BreadcrumbsView.clear();
    };

    this.routers['/profile'] = () => {
      new ProfileView().draw();
      BreadcrumbsView.clear();
    };

    // Create category links & menu
    new Navigation().getCategoryJSON(this.token).then((json): void => {
      // create menu
      this.menu = new Navigation().createMenu(json?.results!);

      // create category roitung
      new Navigation().createRouteCategoryLinks(json?.results!).forEach((data: INavigation) => {
        if (data.categoryId) this.routers[data.link] = () => new CatalogView().draw(data.categoryId!, this.token);
      });
    });

    new Navigation().getAllproductJSON(this.token).then((json): void => {
      new Navigation().createProductsLinks(json?.results!).forEach((data: IRouteProductLink) => {
        this.routers[data.link] = () => new ProductView().draw(data.productId);
      });
    });
  },
};

/* eslint-disable max-lines-per-function */
export default RouterAlpine;
