import PasswordInputView from './PasswordInputView';

describe('PasswordInputView class', () => {
  const instance = new PasswordInputView();

  it('must be defined', () => {
    expect(PasswordInputView).toBeDefined();
  });

  it('an instance must have a validateInput method', () => {
    expect(instance.validateInput).toBeDefined();
  });
});
