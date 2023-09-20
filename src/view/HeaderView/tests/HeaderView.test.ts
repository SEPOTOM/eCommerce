import '@testing-library/jest-dom';
import HeaderView from '../HeaderView';
import HeaderViewAlpine from '../Alpine/HeaderViewAlpine';

// Way to test private method
const header = new HeaderView();
const headerProto = Object.getPrototypeOf(header);

describe('Main [Header] test', (): void => {
  document.body.innerHTML = '<span data-element="cart-count"></span>';

  it('-- class "HeaderView" should be defined', (): void => {
    expect(HeaderView).toBeDefined();
  });

  it('-- class "HeaderView", all method exist & return nothing', () => {
    expect(headerProto.draw).toBeDefined();
    expect(HeaderView.setBasketCount).toBeDefined();
    expect(headerProto.setDefaultCartAmount).toBeDefined();
    expect(headerProto.draw()).toBeFalsy();
    expect(HeaderView.setBasketCount(1)).toBeFalsy();
    expect(headerProto.setDefaultCartAmount()).toBeFalsy();
  });

  it('-- Alpine "HeaderView" object, all properties exist & some return nothing', () => {
    expect(HeaderViewAlpine()).toHaveProperty('showMobileMenu');
    expect(HeaderViewAlpine()).toHaveProperty('showAccountDropdown');
  });
});
