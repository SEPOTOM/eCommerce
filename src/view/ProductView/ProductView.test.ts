import ProductView from "./ProductView";

describe('Class "ProductView"', (): void => {
  const product = new ProductView();

  it('Should be defined', (): void => {
    expect(product).toBeDefined();
  });

  it('Should have "draw" method', () => {
    expect(product.draw).toBeDefined();
  });
});