import '@testing-library/jest-dom';
import Page404View from './Page404View';

describe('Main [404 page] test', (): void => {
  it('-- сlass "Page404View" should be defined', (): void => {
    expect(Page404View).toBeDefined();
  });

  it('-- method "draw" should be defined & return void', () => {
    document.body.innerHTML = '<main></main>';
    expect(new Page404View().draw).toBeDefined();
    expect(new Page404View().draw()).toBeFalsy();
  });
});
