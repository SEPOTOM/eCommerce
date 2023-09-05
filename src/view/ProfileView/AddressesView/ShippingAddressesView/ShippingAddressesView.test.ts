import ShippingAddressesView from './ShippingAddressesView';

describe('ShippingAddressesView class', () => {
  const instance = new ShippingAddressesView();

  it('must be defined', () => {
    expect(ShippingAddressesView).toBeDefined();
  });

  it('an instance must have a buildView method', () => {
    expect(instance.buildView).toBeDefined();
  });
});
