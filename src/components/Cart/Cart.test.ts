import Cart from "./Cart";

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

  it('an instance must have a removeProduct method', () => {
    expect(instance.removeProduct).toBeDefined();
  });

  it('an instance must have a getTotalPrice method', () => {
    expect(instance.getTotalPrice).toBeDefined();
  });
});
