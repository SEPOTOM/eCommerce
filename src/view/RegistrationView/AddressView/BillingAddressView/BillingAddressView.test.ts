import BillingAddressView from './BillingAddressView';

describe('BillingAddressView class', () => {
  it('must be defined', () => {
    expect(BillingAddressView).toBeDefined();
  });

  // Method exist
  it('-- сlass "BillingAddressView", all method exist', () => {
    expect(new BillingAddressView().buildAddressBlockView).toBeDefined();
    expect(new BillingAddressView().collectCredentials).toBeDefined();
    expect(new BillingAddressView().validateInputs).toBeDefined();
    expect(new BillingAddressView().getUseAsCheckbox).toBeDefined();
    expect(new BillingAddressView().getSelect).toBeDefined();
    expect(new BillingAddressView().getTextFields).toBeDefined();
    expect(new BillingAddressView().trackTextFields).toBeDefined();
    expect(new BillingAddressView().untrackTextFields).toBeDefined();
    expect(new BillingAddressView().disable).toBeDefined();
    expect(new BillingAddressView().enable).toBeDefined();
  });
});
