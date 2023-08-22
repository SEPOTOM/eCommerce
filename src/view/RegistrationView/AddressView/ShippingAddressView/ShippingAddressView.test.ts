import ShippingAddressView from './ShippingAddressView';

describe('ShippingAddressView class', () => {
  it('class ShippingAddressView must be defined', () => {
    expect(ShippingAddressView).toBeDefined();
  });

  // Method exist
  it('-- сlass "BillingAddressView", all method exist', () => {
    expect(new ShippingAddressView().buildAddressBlockView).toBeDefined();
    expect(new ShippingAddressView().collectCredentials).toBeDefined();
    expect(new ShippingAddressView().validateInputs).toBeDefined();
    expect(new ShippingAddressView().getUseAsCheckbox).toBeDefined();
    expect(new ShippingAddressView().getSelect).toBeDefined();
    expect(new ShippingAddressView().getTextFields).toBeDefined();
    expect(new ShippingAddressView().trackTextFields).toBeDefined();
    expect(new ShippingAddressView().untrackTextFields).toBeDefined();
    expect(new ShippingAddressView().disable).toBeDefined();
    expect(new ShippingAddressView().enable).toBeDefined();
  });
});
