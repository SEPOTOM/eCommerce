import Navigation from './Navigation';

describe('Main [Navigation] test', (): void => {
    it('-- сlass "Navigation" should be defined', (): void => {
      expect(Navigation).toBeDefined();
    });

    it('-- сlass "Navigation" has properties', (): void => {
        expect(Navigation).toHaveProperty('allCategoryLinks');
        expect(Navigation).toHaveProperty('menu');
      });
  
    it('-- all methods exist', (): void => {
      expect(new Navigation().createRouteCategoryLinks).toBeDefined();
      expect(new Navigation().createMenu).toBeDefined();
    });
});
