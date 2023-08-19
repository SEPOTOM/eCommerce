import HomepageView from '../../view/HomepageView/HomepageView';
import Routers from '../Routers/Routers';

export default class App {
  public loadDefaultPage(): void {
    new HomepageView().drawDefaultContent();
  }

  public runRoute(): void {
    new Routers().initRoute();
  }
}
