/* eslint-disable import/no-cycle */
import Alpine from 'alpinejs';
import RouterAlpine from './Alpine/RouterAlpine';

export default class Router {
  public initRoute(): void {
    document.body.setAttribute('x-data', 'Router()');
    Alpine.data('Router', RouterAlpine);
  }

  public static isCustomerLogin(): void {
    //  @ts-ignore
    Alpine.$data(document.body).checkCustomerLogin();
  }

  public static toHomePage(): void {
    (document.querySelector('[data-element="header-logo"]') as HTMLElement)?.click();
  }
}
