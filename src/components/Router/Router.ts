import Alpine from 'alpinejs';
import RouterAlpine from './Alpine/RouterAlpine';

export default class Router {
  public initRoute(): void {
    document.body.setAttribute('x-data', 'Router()');
    Alpine.data('Router', RouterAlpine);
  }

  public static checkCustomerLogin(): void {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const component = Alpine.$data(document.body);
    component.checkCustomerLogin();
  }

  public static toHomePage(): void {
    (document.querySelector('[data-element="header-logo"]') as HTMLElement).click();
  }
}
