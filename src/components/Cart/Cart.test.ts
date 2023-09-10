import Cart from './Cart';

describe('Cart class', () => {
  const instance = new Cart();

  it('must be defined', () => {
    expect(Cart).toBeDefined();
  });

  it('an instance must have a getCart method', () => {
    expect(instance.getCart).toBeDefined();
  });

  it('an instance must have a getProductsInfo method', () => {
    expect(instance.getProductsInfo).toBeDefined();
  });

  it('an instance must have a updateProductQuantity method', () => {
    expect(instance.updateProductQuantity).toBeDefined();
  });
});
