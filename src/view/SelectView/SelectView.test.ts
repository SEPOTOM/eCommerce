import SelectView from './SelectView';

describe('RegistrationView class', () => {
  it('must be defined', () => {
    expect(SelectView).toBeDefined();
  });

  it('an instance must have a buildSelectView method', () => {
    const instance = new SelectView();

    expect(instance.buildSelectView).toBeDefined();
  });
});
