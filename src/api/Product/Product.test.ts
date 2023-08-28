import Product from './Product';

describe('Class "Product"', () => {
  const product = new Product();

  it('Should be defined', () => {
    expect(Product).toBeDefined();
  });

  it('Should be possible to create class instance', () => {
    expect(product).toBeDefined();
  });

  it('Method "getCategoryByID" should be defined', () => {
    expect(product.getProductByID).toBeDefined();
  });

  it('Method "getProductByID" should response with error on wrong input parameters', () => {
    const id = String(Math.random());
    const clientToken = String(Math.random());

    const categoryError = product.getProductByID(id, clientToken);

    expect(categoryError).not.toHaveProperty('productType');
  });
});
