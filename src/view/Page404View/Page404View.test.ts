import Page404View from './Page404View';

describe('Main [404 page] test', (): void => {
  it('-- class "Page404View" should be defined', (): void => {
    expect(Page404View).toBeDefined();
  });

  it('-- method "draw" should be defined', () => {
    expect(new Page404View().draw).toBeDefined();
  });
});
