import ProductView from './ProductView';
import Cart from '../../../components/Cart/Cart';

describe('ProductView class', () => {
  const instance = new ProductView(new Cart());

  it('must be defined', () => {
    expect(ProductView).toBeDefined();
  });

  it('an instance must have a buildView method', () => {
    expect(instance.buildView).toBeDefined();
  });

  it('an instance must have a updateTotalPrice method', () => {
    expect(instance.updateTotalPrice).toBeDefined();
  });

  it('an instance must have a getItemId method', () => {
    expect(instance.getItemId).toBeDefined();
  });
});
