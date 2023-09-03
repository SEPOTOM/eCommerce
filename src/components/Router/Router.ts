/* eslint-disable import/no-cycle */
import Alpine from 'alpinejs';
import RouterAlpine from './Alpine/RouterAlpine';
import { AlpineRouter } from '../../types';

export default class Router {
  public initRoute(token: string): void {
    document.body.setAttribute('x-data', 'Router()');
    Alpine.data('Router', () => ({ token, ...RouterAlpine }));
  }

  public static isCustomerLogin(): void {
    /* eslint-disable @typescript-eslint/ban-ts-comment */
    //  @ts-ignore
    const router: AlpineRouter = Alpine.$data(document.body);
    try {
      router.checkCustomerLogin();
    } catch (e) {
      /* eslint-disable no-empty */
    }
  }

  public static toHomePage(): void {
    (document.querySelector('[data-element="header-logo"]') as HTMLElement)?.click();
  }
}
