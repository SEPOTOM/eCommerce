import ShippingAddressView from './ShippingAddressView';

describe('ShippingAddressView class', () => {
  it('must be defined', () => {
    expect(ShippingAddressView).toBeDefined();
  });

  it('an instance must have a buildAddressBlockView method', () => {
    const instance = new ShippingAddressView();

    expect(instance.buildAddressBlockView).toBeDefined();
  });

  it('an instance must have a collectCredentials method', () => {
    const instance = new ShippingAddressView();

    expect(instance.collectCredentials).toBeDefined();
  });

  it('an instance must have a validateInputs method', () => {
    const instance = new ShippingAddressView();

    expect(instance.validateInputs).toBeDefined();
  });

  it('an instance must have a getUseAsCheckbox method', () => {
    const instance = new ShippingAddressView();

    expect(instance.getUseAsCheckbox).toBeDefined();
  });

  it('an instance must have a getSelect method', () => {
    const instance = new ShippingAddressView();

    expect(instance.getSelect).toBeDefined();
  });

  it('an instance must have a getTextFields method', () => {
    const instance = new ShippingAddressView();

    expect(instance.getTextFields).toBeDefined();
  });

  it('an instance must have a trackTextFields method', () => {
    const instance = new ShippingAddressView();

    expect(instance.trackTextFields).toBeDefined();
  });

  it('an instance must have a untrackTextFields method', () => {
    const instance = new ShippingAddressView();

    expect(instance.untrackTextFields).toBeDefined();
  });

  it('an instance must have a disable method', () => {
    const instance = new ShippingAddressView();

    expect(instance.disable).toBeDefined();
  });

  it('an instance must have a enable method', () => {
    const instance = new ShippingAddressView();

    expect(instance.enable).toBeDefined();
  });
});
