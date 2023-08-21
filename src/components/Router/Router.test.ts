import Router from './Router';
import RouterAlpine from './Alpine/RouterAlpine';

describe('Main [Router] test', (): void => {
    it('-- сlass "Router" should be defined', (): void => {
        expect(Router).toBeDefined();
    });

    // Method exist
    it('-- method "initRoute" should be defined', () => {
        expect(new Router().initRoute).toBeDefined();
    });

    it('-- method "isCustomerLogin" should be defined', () => {
        expect(Router.isCustomerLogin).toBeDefined();
    });

    it('-- method "toHomePage" should be defined', () => {
        expect(Router.toHomePage).toBeDefined();
    });

    // Method has void type
    it('-- method "initRoute" should return nothing', () => {
        expect(new Router().initRoute()).toBeFalsy();
    });

    it('-- method "isCustomerLogin" should return nothing', () => {
        expect(Router.isCustomerLogin()).toBeFalsy();
    });

    it('-- method "toHomePage" should return nothing', () => {
        expect(Router.toHomePage()).toBeFalsy();
    });

    // Check Alpine props
    it('-- Alpine Route object has property => isCustomerLogin', () => {
        expect(RouterAlpine()).toHaveProperty('isCustomerLogin');
    });

    it('-- Alpine Route object has method => init', () => {
        expect(RouterAlpine()).toHaveProperty('init');
    });

    it('-- Alpine Route object has method => route', () => {
        expect(RouterAlpine()).toHaveProperty('route');
    });

    it('-- Alpine Route object has method => logout', () => {
        expect(RouterAlpine()).toHaveProperty('logout');
    });

    it('-- Alpine Route object has method => handleLocation', () => {
        expect(RouterAlpine()).toHaveProperty('handleLocation');
    });

    it('-- Alpine Route object has method => checkCustomerLogin', () => {
        expect(RouterAlpine()).toHaveProperty('checkCustomerLogin');
    });

    // Check Alpine methods
    it('-- method "logout" should return nothing', () => {
        expect(RouterAlpine().logout()).toBeFalsy();
    });

    it('-- method "checkCustomerLogin" should return nothing', () => {
        expect(RouterAlpine().checkCustomerLogin()).toBeFalsy();
    });
});