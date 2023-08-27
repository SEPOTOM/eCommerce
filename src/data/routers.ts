/* eslint-disable import/no-cycle */
import LoginView from '../view/LoginView/LoginView';
import HomepageView from '../view/HomepageView/HomepageView';
import Page404View from '../view/Page404View/Page404View';
import RegistrationView from '../view/RegistrationView/RegistrationView';
import ProfileView from '../view/ProfileView/ProfileView';

const routers: { [key: string]: () => void } = {
  '404': new Page404View().draw,
  '/': new HomepageView().draw,
  '/login': () => LoginView.draw(),
  '/registration': () => RegistrationView.draw(),
  '/profile': () => new ProfileView().draw(),
};

export default routers;
