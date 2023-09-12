import CartAPI from './CartAPI';

describe('CartAPI class', () => {
  it('must be defined', () => {
    expect(CartAPI).toBeDefined();
  });

  it('must have a get method', () => {
    expect(CartAPI.get).toBeDefined();
  });

  it('must have a updateQuantity method', () => {
    expect(CartAPI.updateQuantity).toBeDefined();
  });

  it('must have a removeItem method', () => {
    expect(CartAPI.removeItem).toBeDefined();
  });

  it('must have the updateLineItem method', () => {
    expect(CartAPI.updateLineItem).toBeDefined();
  });

  it('must have the getCartByID method', () => {
    expect(CartAPI.getCartByID).toBeDefined();
  });

  it('must have the createCustomerCart method', () => {
    expect(CartAPI.createCustomerCart).toBeDefined();
  });

  it('must have the getActiveCartVersion method', () => {
    expect(CartAPI.getActiveCartVersion).toBeDefined();
  });
});
