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
});
