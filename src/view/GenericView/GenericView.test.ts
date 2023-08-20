import GenericView from './GenericView';

describe('GenericView general test', (): void => {
  const newGenericView = new GenericView();

  it('Class GenericView should be defined', (): void => {
    expect(GenericView).toBeDefined();
  });

  it('Class GenericView should have buildGenericView method', (): void => {
    expect(newGenericView.buildGenericView).toBeDefined();
  });
});
