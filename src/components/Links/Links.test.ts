import Links from './Links';

describe('Links class', () => {
  it('must be defined', () => {
    expect(Links).toBeDefined();
  });

  it('must have a setCategoriesLinks method', () => {
    expect(Links.setCategoriesLinks).toBeDefined();
  });

  it('must have a getCategoriesLinks method', () => {
    expect(Links.getCategoriesLinks).toBeDefined();
  });
});
