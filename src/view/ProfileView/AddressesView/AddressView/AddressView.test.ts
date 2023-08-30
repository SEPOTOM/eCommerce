import AddressView from './AddressView';

describe('AddressView class', () => {
  const instance = new AddressView();

  it('must be defined', () => {
    expect(AddressView).toBeDefined();
  });

  it('an instance must have a buildView method', () => {
    expect(instance.buildView).toBeDefined();
  });

  it('an instance must have a getView method', () => {
    expect(instance.getView).toBeDefined();
  });

  it('an instance must have a makeDefault method', () => {
    expect(instance.makeDefault).toBeDefined();
  });

  it('an instance must have a isDefault method', () => {
    expect(instance.isDefault).toBeDefined();
  });
});
