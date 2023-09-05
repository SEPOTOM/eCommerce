import Navigation from '../Navigation';
import testData from './data';

// Way to test private method
const navigation = new Navigation();
const navigationProto = Object.getPrototypeOf(navigation);

describe('[Navigation]: common test', (): void => {
  it('-- class "Navigation" should be defined', (): void => {
    expect(Navigation).toBeDefined();
  });

  it('-- all methods exist', (): void => {
    expect(navigationProto.getCategoryJSON).toBeDefined();
    expect(navigationProto.getAllproductJSON).toBeDefined();
    expect(navigationProto.createProductsLinks).toBeDefined();
    expect(navigationProto.createRouteCategoryLinks).toBeDefined();
    expect(navigationProto.createMenu).toBeDefined();
    expect(navigationProto.createMenuLevel1).toBeDefined();
    expect(navigationProto.createMenuLevel2).toBeDefined();
    expect(navigationProto.combineMenuLevels).toBeDefined();
    expect(navigationProto.setBodyRequest).toBeDefined();
  });
});

describe('[Navigation]: method testing', (): void => {
  it('-- methods "getCategoryJSON" / "getAllproductJSON" fetch works', async () => {
    await expect(navigationProto.getCategoryJSON(testData.token)).toEqual(Promise.resolve());
    await expect(navigationProto.getAllproductJSON(testData.token)).toEqual(Promise.resolve());
  });

  it('-- methods for creating links are work correctly', (): void => {
    expect(navigationProto.createProductsLinks(testData.productJSON)).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ link: testData.createProductsLinks.result[0].link }),
        expect.objectContaining({ productId: testData.createProductsLinks.result[0].productId }),
      ])
    );

    expect(navigationProto.createRouteCategoryLinks(testData.singleCategoryJSON)).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ text: testData.createRouteCategoryLinks.result[0].text }),
        expect.objectContaining({ link: testData.createRouteCategoryLinks.result[0].link }),
      ])
    );

    expect(navigationProto.setBodyRequest(testData.token)).toEqual(expect.objectContaining(testData.bodyRequest));
  });
});

describe('[Navigation]: menu method testing', (): void => {
  it('-- methods for creating links are work correctly', (): void => {
    expect(navigationProto.createMenuLevel1(testData.singleCategoryJSON)).toEqual(expect.arrayContaining([]));

    expect(navigationProto.createMenuLevel2(testData.singleCategoryJSON)).toEqual(expect.arrayContaining([]));

    expect(
      navigationProto.combineMenuLevels(testData.createMenuLevel1.result, testData.createMenuLevel2.result)
    ).toEqual(expect.arrayContaining([]));

    expect(navigationProto.createMenu(testData.singleCategoryJSON)).toEqual(expect.arrayContaining([]));
  });
});
