import CartView from './CartView';

describe('CartView class', () => {
  const instance = new CartView();

  it('must be defined', () => {
    expect(CartView).toBeDefined();
  });

  it('an instance must have a draw method', () => {
    expect(instance.draw).toBeDefined();
  });
});
