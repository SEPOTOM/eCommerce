/* eslint-disable import/no-cycle */
import Alpine from 'alpinejs';
import RouterAlpine from './Alpine/RouterAlpine';

export default class Router {
  public initRoute(): void {
    document.body.setAttribute('x-data', 'Router()');
    Alpine.data('Router', RouterAlpine);
  }

  public static isCustomerLogin(): void {
    // TODO: It is necessary to leave such a decision for consideration in the future.
    // Alpine.$data(document.body).checkCustomerLogin();
    RouterAlpine().checkCustomerLogin();
  }

  public static toHomePage(): void {
    (document.querySelector('[data-element="header-logo"]') as HTMLElement)?.click();
  }
}
