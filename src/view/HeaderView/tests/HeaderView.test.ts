import HeaderView from '../HeaderView';
import HeaderViewAlpine from '../Alpine/HeaderViewAlpine';

describe('Main [Header] test', (): void => {
  it('-- сlass "HeaderView" should be defined', (): void => {
    expect(HeaderView).toBeDefined();
  });

  it('-- сlass "HeaderView", all method exist & return nothing', () => {
    expect(new HeaderView().draw).toBeDefined();
    expect(new HeaderView().draw()).toBeFalsy();
  });

  it('-- Alpine "HeaderView" object, all properties exist & some return nothing', () => {
    expect(HeaderViewAlpine()).toHaveProperty('showMobileMenu');
    expect(HeaderViewAlpine()).toHaveProperty('showAccountDropdown');
  });
});
