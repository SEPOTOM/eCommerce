import CartAPI from './CartAPI';

describe('CartAPI class', () => {
  it('must be defined', () => {
    expect(CartAPI).toBeDefined();
  });

  it('must have a get method', () => {
    expect(CartAPI.get).toBeDefined();
  });
});
