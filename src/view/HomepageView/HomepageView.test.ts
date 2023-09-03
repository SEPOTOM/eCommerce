import HomepageView from './HomepageView';

describe('Main [Home page] test', (): void => {
  it('-- сlass "HomepageView" should be defined', (): void => {
    expect(HomepageView).toBeDefined();
  });

  it('-- method "drawDefaultContent" should be defined', () => {
    expect(new HomepageView().drawDefaultContent).toBeDefined();
  });

  it('-- method "draw" should be defined', () => {
    expect(new HomepageView().draw).toBeDefined();
  });
});
