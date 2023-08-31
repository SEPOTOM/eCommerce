import Catalog from './Catalog';

describe('Main [Catalog] test', (): void => {
  it('-- сlass "Catalog" should be defined', (): void => {
    expect(Catalog).toBeDefined();
  });

  it('-- all methods exist', (): void => {
    expect(Catalog.getCategoryInfoJSON).toBeDefined();
    expect(Catalog.getAllProductsJSON).toBeDefined();
    expect(new Catalog().createProductsLinks).toBeDefined();
  });
});

describe('Check work Catalog fetch methods', () => {
  it('-- check "getCategoryInfoJSON" method', async () => {
    const ctagoryId = '5a64b445-8662-4959-a874-dc666cd26335';
    await expect(Catalog.getCategoryInfoJSON(ctagoryId)).resolves.toBe(null);
  });
});
