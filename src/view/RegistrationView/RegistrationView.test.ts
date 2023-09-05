import RegistrationView from './RegistrationView';

describe('RegistrationView class', () => {
  it('must be defined', () => {
    expect(RegistrationView).toBeDefined();
  });

  it('an instance must have a buildRegistrationView method', () => {
    const instance = new RegistrationView();

    expect(instance.buildRegistrationView).toBeDefined();
  });
});
