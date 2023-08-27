/* eslint-disable import/no-cycle */
import LoginView from '../view/LoginView/LoginView';
import HomepageView from '../view/HomepageView/HomepageView';
import Page404View from '../view/Page404View/Page404View';
import RegistrationView from '../view/RegistrationView/RegistrationView';
import CatalogView from '../view/CatalogView/CatalogView';
import BreadcrumbsView from '../view/BreadcrumbsView/BreadcrumbsView';
import ProductView from '../view/ProductView/ProductView';

// import navigation links
import Navigation from '../api/Navigation/Navigation';
import { INavigation } from '../api/Navigation/types/types';

// import all products links
import Catalog from '../api/Catalog/Catalog';
import { IRouteProductLink } from '../api/Catalog/types/types';

const routers: { [key: string]: () => void } = {
  '404': () => {
    new Page404View().draw();
    BreadcrumbsView.clear();
  },
  '/': () => {
    new HomepageView().draw();
    BreadcrumbsView.clear();
  },
  '/login': () => {
    LoginView.draw();
    BreadcrumbsView.clear();
  },
  '/registration': () => {
    RegistrationView.draw();
    BreadcrumbsView.clear();
  },
  '/product': () => new ProductView().draw(),
  '/profile': () => {
    const main = document.querySelector('main');

    if (main) {
      main.innerHTML =
        '<div class="flex justify-center items-center flex-grow basis-full text-2xl">profile page placeholder</div>';
    }
  },
};

Navigation.links.then((arrayLink: INavigation[]) => {
  arrayLink.forEach((data: INavigation) => {
    if (data.categoryId) routers[data.link] = () => new CatalogView().draw(data.categoryId!);
  });
});

Catalog.productLinks.then((arrayLink) => {
  arrayLink.forEach((data: IRouteProductLink) => {
    routers[data.link] = () => {
      const main: HTMLElement = document.querySelector('main')!;
      main.innerHTML = `Placeholder for product ${data.link}`;
    };
  });
});

export default routers;
