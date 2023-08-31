import '@testing-library/jest-dom';
import HomepageView from './HomepageView';

describe('Main [Home page] test', (): void => {
  it('-- сlass "HomepageView" should be defined', (): void => {
    expect(HomepageView).toBeDefined();
  });

  it('-- all methods should be defined & return void', () => {
    expect(new HomepageView().drawDefaultContent).toBeDefined();
    expect(new HomepageView().draw).toBeDefined();
    expect(new HomepageView().drawDefaultContent()).toBeFalsy();
    expect(new HomepageView().draw()).toBeFalsy();
  });
});
