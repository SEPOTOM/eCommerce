import '@testing-library/jest-dom';
import FooterView from './FooterView';

describe('Main [Footer] test', (): void => {
  it('-- сlass "FooterView" should be defined', (): void => {
    expect(FooterView).toBeDefined();
  });

  it('-- method "draw" should be defined & return void', () => {
    expect(new FooterView().draw).toBeDefined();
    expect(new FooterView().draw()).toBeFalsy();
  });
});
