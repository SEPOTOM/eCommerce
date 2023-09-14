import '@testing-library/jest-dom';
import HeaderView from '../HeaderView';
import HeaderViewAlpine from '../Alpine/HeaderViewAlpine';

// Way to test private method
const header = new HeaderView();
const heaerProto = Object.getPrototypeOf(header);

describe('Main [Header] test', (): void => {
  document.body.innerHTML = '<span data-element="cart-count"></span>';

  it('-- сlass "HeaderView" should be defined', (): void => {
    expect(HeaderView).toBeDefined();
  });

  it('-- сlass "HeaderView", all method exist & return nothing', () => {
    expect(heaerProto.draw).toBeDefined();
    expect(HeaderView.setBasketCount).toBeDefined();
    expect(heaerProto.setDefaultCartAmount).toBeDefined();
    expect(heaerProto.draw()).toBeFalsy();
    expect(HeaderView.setBasketCount(1)).toBeFalsy();
    expect(heaerProto.setDefaultCartAmount()).toBeFalsy();
  });

  it('-- Alpine "HeaderView" object, all properties exist & some return nothing', () => {
    expect(HeaderViewAlpine()).toHaveProperty('showMobileMenu');
    expect(HeaderViewAlpine()).toHaveProperty('showAccountDropdown');
  });
});
