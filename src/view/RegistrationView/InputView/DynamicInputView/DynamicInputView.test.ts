import DynamicInputView from './DynamicInputView';

describe('DynamicInputView class', () => {
  const regExp = /./;
  const message = '';

  it('must be defined', () => {
    expect(DynamicInputView).toBeDefined();
  });

  it('an instance must have a validateInput method', () => {
    const instance = new DynamicInputView(regExp, message);

    expect(instance.validateInput).toBeDefined();
  });

  it('an instance must have a setRegExp method', () => {
    const instance = new DynamicInputView(regExp, message);

    expect(instance.setRegExp).toBeDefined();
  });

  it('an instance must have a setErrorMessage method', () => {
    const instance = new DynamicInputView(regExp, message);

    expect(instance.setErrorMessage).toBeDefined();
  });
});
