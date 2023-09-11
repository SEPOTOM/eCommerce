import '@testing-library/jest-dom';
import AboutUsView from '../AboutUsView';

describe('[AboutUsView]: common test', (): void => {
  it('-- class "AboutUsView" should be defined', (): void => {
    expect(AboutUsView).toBeDefined();
  });

  it('-- method "draw" should be defined', () => {
    document.body.innerHTML = '<main></main>';
    expect(new AboutUsView().draw).toBeDefined();
    expect(new AboutUsView().draw()).toBeFalsy();
  });
});
