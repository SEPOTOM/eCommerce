import ProductView from './ProductView';

describe('ProductView class', () => {
  const instance = new ProductView();

  it('must be defined', () => {
    expect(ProductView).toBeDefined();
  });

  it('an instance must have a buildView method', () => {
    expect(instance.buildView).toBeDefined();
  });
});
