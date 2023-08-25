/* eslint-disable import/no-cycle */
import LoginView from '../view/LoginView/LoginView';
import HomepageView from '../view/HomepageView/HomepageView';
import Page404View from '../view/Page404View/Page404View';
import RegistrationView from '../view/RegistrationView/RegistrationView';

const routers: { [key: string]: () => void } = {
  '404': new Page404View().draw,
  '/': new HomepageView().draw,
  '/login': () => LoginView.draw(),
  '/registration': () => RegistrationView.draw(),
  '/profile': () => {
    const main = document.querySelector('main');

    if (main) {
      main.innerHTML =
        '<div class="flex justify-center items-center flex-grow basis-full text-2xl">profile page placeholder</div>';
    }
  },
};

export default routers;
