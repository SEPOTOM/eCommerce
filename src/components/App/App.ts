import HomepageView from '../../view/HomepageView/HomepageView';
import Router from '../Router/Router';

export default class App {
  public loadDefaultPage(): void {
    new HomepageView().drawDefaultContent();
  }

  public runRoute(): void {
    new Router().initRoute();
  }
}
