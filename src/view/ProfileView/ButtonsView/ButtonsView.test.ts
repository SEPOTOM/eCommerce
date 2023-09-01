import ButtonsView from './ButtonsView';

describe('ButtonsView class', () => {
  const instance = new ButtonsView();

  it('must be defined', () => {
    expect(ButtonsView).toBeDefined();
  });

  it('an instance must have a buildView method', () => {
    expect(instance.buildView).toBeDefined();
  });

  it('an instance must have a getCancelButton method', () => {
    expect(instance.getCancelButton).toBeDefined();
  });

  it('an instance must have a getSaveButton method', () => {
    expect(instance.getSaveButton).toBeDefined();
  });

  it('an instance must have a showSuccessMessage method', () => {
    expect(instance.showSuccessMessage).toBeDefined();
  });

  it('an instance must have a showErrorMessage method', () => {
    expect(instance.showErrorMessage).toBeDefined();
  });

  it('an instance must have a hideSuccessMessage method', () => {
    expect(instance.hideSuccessMessage).toBeDefined();
  });

  it('an instance must have a hideErrorMessage method', () => {
    expect(instance.hideErrorMessage).toBeDefined();
  });
});
