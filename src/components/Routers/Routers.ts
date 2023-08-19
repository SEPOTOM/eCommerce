import Alpine from 'alpinejs';
import RoutersAlpine from './Alpine/RoutersAlpine';

export default class Routers {
  public initRoute(): void {
    document.body.setAttribute('x-data', 'Routers()');
    Alpine.data('Routers', RoutersAlpine);
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
