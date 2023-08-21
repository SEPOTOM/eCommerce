import BillingAddressView from './BillingAddressView';

describe('BillingAddressView class', () => {
  it('must be defined', () => {
    expect(BillingAddressView).toBeDefined();
  });

  it('an instance must have a buildAddressBlockView method', () => {
    const instance = new BillingAddressView();

    expect(instance.buildAddressBlockView).toBeDefined();
  });

  it('an instance must have a collectCredentials method', () => {
    const instance = new BillingAddressView();

    expect(instance.collectCredentials).toBeDefined();
  });

  it('an instance must have a validateInputs method', () => {
    const instance = new BillingAddressView();

    expect(instance.validateInputs).toBeDefined();
  });

  it('an instance must have a getUseAsCheckbox method', () => {
    const instance = new BillingAddressView();

    expect(instance.getUseAsCheckbox).toBeDefined();
  });

  it('an instance must have a getSelect method', () => {
    const instance = new BillingAddressView();

    expect(instance.getSelect).toBeDefined();
  });

  it('an instance must have a getTextFields method', () => {
    const instance = new BillingAddressView();

    expect(instance.getTextFields).toBeDefined();
  });

  it('an instance must have a trackTextFields method', () => {
    const instance = new BillingAddressView();

    expect(instance.trackTextFields).toBeDefined();
  });

  it('an instance must have a untrackTextFields method', () => {
    const instance = new BillingAddressView();

    expect(instance.untrackTextFields).toBeDefined();
  });

  it('an instance must have a disable method', () => {
    const instance = new BillingAddressView();

    expect(instance.disable).toBeDefined();
  });

  it('an instance must have a enable method', () => {
    const instance = new BillingAddressView();

    expect(instance.enable).toBeDefined();
  });
});
