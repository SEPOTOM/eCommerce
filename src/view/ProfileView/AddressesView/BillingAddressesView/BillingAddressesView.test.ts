import BillingAddressesView from './BillingAddressesView';

describe('BillingAddressesView class', () => {
  const instance = new BillingAddressesView();

  it('must be defined', () => {
    expect(BillingAddressesView).toBeDefined();
  });

  it('an instance must have a buildView method', () => {
    expect(instance.buildView).toBeDefined();
  });
});
