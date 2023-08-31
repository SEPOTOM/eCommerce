import ProductModalView from './ProductModalView';

describe('Class "ProductModalView"', (): void => {
  const productModel = new ProductModalView();

  it('Should be defined', (): void => {
    expect(ProductModalView).toBeDefined();
  });

  it('Should be possible to create an instance', (): void => {
    expect(productModel).toBeDefined();
  });

  it('Should have "showProductModal" method', () => {
    expect(productModel.showProductModal).toBeDefined();
  });
});
