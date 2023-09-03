import FooterView from './FooterView';
// import FooterViewAlpine from './Alpine/FooterViewAlpine';

describe('Main [Footer] test', (): void => {
  it('-- сlass "FooterView" should be defined', (): void => {
    expect(FooterView).toBeDefined();
  });

  it('-- method "draw" should be defined', () => {
    expect(new FooterView().draw).toBeDefined();
  });
});
