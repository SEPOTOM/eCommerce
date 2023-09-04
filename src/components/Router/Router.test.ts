import Router from './Router';
import RouterAlpine from './Alpine/RouterAlpine';

describe('Main [Router] test', (): void => {
  it('-- сlass "Router" should be defined', (): void => {
    expect(Router).toBeDefined();
  });

  it('-- сlass "Router", all method exist & return nothing', () => {
    expect(new Router().initRoute).toBeDefined();
    expect(Router.isCustomerLogin).toBeDefined();
    expect(Router.toHomePage).toBeDefined();
    expect(Router.isCustomerLogin()).toBeFalsy();
    expect(Router.toHomePage()).toBeFalsy();
  });
});

describe('[Router alpine] test', (): void => {
  it('-- Alpine "Route" object, all properties exist & some return nothing', () => {
    expect(RouterAlpine).toHaveProperty('isCustomerLogin');
    expect(RouterAlpine).toHaveProperty('route');
    expect(RouterAlpine).toHaveProperty('menu');
    expect(RouterAlpine).toHaveProperty('init');
    expect(RouterAlpine).toHaveProperty('logout');
    expect(RouterAlpine).toHaveProperty('route');
    expect(RouterAlpine).toHaveProperty('route');
    expect(RouterAlpine).toHaveProperty('handleLocation');
    expect(RouterAlpine).toHaveProperty('checkCustomerLogin');
    expect(RouterAlpine).toHaveProperty('createRoutingPath');
    expect(RouterAlpine.logout()).toBeFalsy();
    expect(RouterAlpine.checkCustomerLogin()).toBeFalsy();
  });
});
