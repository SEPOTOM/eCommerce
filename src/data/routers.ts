/* eslint-disable import/no-cycle */
import LoginView from '../view/LoginView/LoginView';
import HomepageView from '../view/HomepageView/HomepageView';
import Page404View from '../view/Page404View/Page404View';
import RegistrationView from '../view/RegistrationView/RegistrationView';
import ProfileView from '../view/ProfileView/ProfileView';
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
  '/profile': () => {
    new ProfileView().draw();
    BreadcrumbsView.clear();
  },
};

Navigation.allCategoryLinks.then((arrayLink: INavigation[]) => {
  arrayLink.forEach((data: INavigation) => {
    if (data.categoryId) routers[data.link] = () => new CatalogView().draw(data.categoryId!);
  });
});

Catalog.productLinks.then((arrayLink) => {
  arrayLink.forEach((data: IRouteProductLink) => {
    routers[data.link] = () => new ProductView().draw(data.productId);
  });
});

export default routers;
