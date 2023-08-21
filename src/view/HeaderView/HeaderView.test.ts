import HeaderView from './HeaderView';
import HeaderViewAlpine from './Alpine/HeaderViewAlpine';

describe('Main [Header] test', (): void => {
  it('-- сlass "HeaderView" should be defined', (): void => {
    expect(HeaderView).toBeDefined();
  });

  it('-- method "draw" should be defined', () => {
    expect(new HeaderView().draw).toBeDefined();
  });

  it('-- method "draw" should return nothing', () => {
    expect(new HeaderView().draw()).toBeFalsy();
  });

  it('-- Alpine header object has property => showMobileMenu', () => {
    expect(HeaderViewAlpine()).toHaveProperty('showMobileMenu');
  });

  it('-- Alpine header object has property => showAccountDropdown', () => {
    expect(HeaderViewAlpine()).toHaveProperty('showAccountDropdown');
  });

  it('-- Alpine header object has property => menu', () => {
    expect(HeaderViewAlpine()).toHaveProperty('menu');
  });
});
