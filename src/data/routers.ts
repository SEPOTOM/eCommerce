import GenericView from '../view/GenericView/GenericView';

const view = new GenericView();

const routers: { [key: string]: () => void } = {
  '404': view.drawPage404,
  '/': view.drawMainPage,
  '/login': view.drawLoginPage,
  '/registration': view.drawRegistrationPage,
};

export default routers;
