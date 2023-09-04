import '@testing-library/jest-dom';
import CatalogView from '../CatalogView';
import CatalogViewAlpine from '../Alpine/CatalogViewAlpine';
import testData from './data';

// Way to test private method
const catalog = new CatalogView();
const catalogProto = Object.getPrototypeOf(catalog);

describe('[ CatalogView ]: common test', (): void => {
  it('-- class "CatalogView" should be defined', (): void => {
    expect(CatalogView).toBeDefined();
  });

  it('-- all methods exist', (): void => {
    expect(catalogProto.draw).toBeDefined();
    expect(catalogProto.drawCategoryBlock).toBeDefined();
    expect(catalogProto.getCategoryCommonInfoJSON).toBeDefined();
    expect(catalogProto.setBodyRequest).toBeDefined();
  });
});

describe('[CatalogView]: method testing', (): void => {
  document.body.innerHTML = '<main></main>';

  it('-- all methods work correctly', async () => {
    expect(catalogProto.drawCategoryBlock()).toBeFalsy();
    expect(catalogProto.setBodyRequest(testData.token)).toEqual(expect.objectContaining(testData.bodyRequest));
    await expect(catalogProto.getCategoryCommonInfoJSON(testData.categoryId, testData.token)).toEqual(
      Promise.resolve()
    );
  });
});

describe('[CatalogView Alpine]: common test', (): void => {
  it('-- Alpine "CatalogView" object, all properties exist', () => {
    expect(CatalogViewAlpine).toHaveProperty('title');
    expect(CatalogViewAlpine).toHaveProperty('description');
    expect(CatalogViewAlpine).toHaveProperty('isLoading');
    expect(CatalogViewAlpine).toHaveProperty('products');
    expect(CatalogViewAlpine).toHaveProperty('urlPath');
    expect(CatalogViewAlpine).toHaveProperty('searchRequest');
    expect(CatalogViewAlpine).toHaveProperty('searchResultCount');
    expect(CatalogViewAlpine).toHaveProperty('filterQuery');
    expect(CatalogViewAlpine).toHaveProperty('filterActiveProps');
    expect(CatalogViewAlpine).toHaveProperty('filterAllProps');
    expect(CatalogViewAlpine).toHaveProperty('sortQuery');
    expect(CatalogViewAlpine).toHaveProperty('sortActive');
    expect(CatalogViewAlpine).toHaveProperty('init');
    expect(CatalogViewAlpine).toHaveProperty('getProductsByQuery');
    expect(CatalogViewAlpine).toHaveProperty('setProductData');
    expect(CatalogViewAlpine).toHaveProperty('getAllFilterProps');
    expect(CatalogViewAlpine).toHaveProperty('sortBy');
    expect(CatalogViewAlpine).toHaveProperty('filterBy');
    expect(CatalogViewAlpine).toHaveProperty('clearFilter');
    expect(CatalogViewAlpine).toHaveProperty('quickSearch');
    expect(CatalogViewAlpine).toHaveProperty('clearQuickSearch');
    expect(CatalogViewAlpine).toHaveProperty('priceConverter');
  });
});

describe('[CatalogView Alpine]: method testing', (): void => {
  it('-- Alpine "CatalogView" object, check priceConverter method', () => {
    expect(CatalogViewAlpine.priceConverter(testData.price.before)).toBe(testData.price.after);
  });

  it('-- Alpine "CatalogView" object, to be falsy', () => {
    expect(CatalogViewAlpine.init()).toBeFalsy();
    expect(CatalogViewAlpine.clearQuickSearch()).toBeFalsy();
    expect(CatalogViewAlpine.clearFilter()).toBeFalsy();
    expect(CatalogViewAlpine.quickSearch()).toBeFalsy();
    expect(CatalogViewAlpine.getProductsByQuery()).toBeFalsy();

    expect(CatalogViewAlpine.sortBy(testData.sort.type, testData.sort.direction, testData.sort.activeText)).toBeFalsy();
  });
});
