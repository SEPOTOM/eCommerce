/* eslint-disable import/no-cycle */
import LoginView from '../view/LoginView/LoginView';
import HomepageView from '../view/HomepageView/HomepageView';
import Page404View from '../view/Page404View/Page404View';
import RegistrationView from '../view/RegistrationView/RegistrationView';
import ProductView from '../view/ProductView/ProductView';

const routers: { [key: string]: () => void } = {
  '404': new Page404View().draw,
  '/': new HomepageView().draw,
  '/product': () => new ProductView().draw(),
  '/login': () => LoginView.draw(),
  '/registration': () => RegistrationView.draw(),
};

export default routers;
