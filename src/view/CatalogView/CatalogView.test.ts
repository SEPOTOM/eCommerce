import '@testing-library/jest-dom';
import CatalogView from './CatalogView';
import CatalogViewAlpine from './Alpine/CatalogViewAlpine';

describe('Main [Catalog] test', (): void => {
  it('-- сlass "CatalogView" should be defined', (): void => {
    expect(CatalogView).toBeDefined();
  });

  it('-- сlass "CatalogView", all method exist & return nothing', () => {
    document.body.innerHTML = '<main></main>';
    const id = 'test-id';
    expect(new CatalogView().draw).toBeDefined();
    expect(new CatalogView().draw(id)).toBeFalsy();
  });

  it('-- Alpine "CatalogView" object, all properties exist', () => {
    expect(CatalogViewAlpine).toHaveProperty('title');
    expect(CatalogViewAlpine).toHaveProperty('description');
    expect(CatalogViewAlpine).toHaveProperty('products');
    expect(CatalogViewAlpine).toHaveProperty('init');
    expect(CatalogViewAlpine).toHaveProperty('priceConverter');
  });

  it('-- Alpine "CatalogView" object, init method falsy', () => {
    expect(CatalogViewAlpine.init()).toBeFalsy();
  });

  it('-- Alpine "CatalogView" object, check priceConverter method', () => {
    expect(CatalogViewAlpine.priceConverter('29000.98')).toBe('29 000.98');
  });
});
