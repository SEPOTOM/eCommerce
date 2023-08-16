import GenericView from './GenericView';

describe('GenericView general test', (): void => {
  it('Class GenericView should be defined', (): void => {
    expect(GenericView).toBeDefined();
  });
  it('Class GenericView should have "buildGenericView" method', (): void => {
    expect(GenericView.buildGenericView).toBeDefined();
  });
});
