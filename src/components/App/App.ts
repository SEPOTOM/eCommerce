import HomepageView from '../../view/HomepageView/HomepageView';
import Router from '../Router/Router';
import BreadcrumbsView from '../../view/BreadcrumbsView/BreadcrumbsView';

export default class App {
  public loadDefaultPage(): void {
    new HomepageView().drawDefaultContent();
    BreadcrumbsView.clear();
  }

  public runRoute(token: string): void {
    new Router().initRoute(token);
  }
}
