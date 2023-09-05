import InputView from './InputView';

describe('InputView class', () => {
  const instance = new InputView();

  it('must be defined', () => {
    expect(InputView).toBeDefined();
  });

  it('an instance must have a buildInputView method', () => {
    expect(instance.buildInputView).toBeDefined();
  });

  it('an instance must have a validateInput method', () => {
    expect(instance.validateInput).toBeDefined();
  });

  it('an instance must have a makeSmall method', () => {
    expect(instance.makeSmall).toBeDefined();
  });

  it('an instance must have a makeErrorDynamic method', () => {
    expect(instance.makeErrorDynamic).toBeDefined();
  });

  it('an instance must have a setValue method', () => {
    expect(instance.setValue).toBeDefined();
  });

  it('an instance must have a hideError method', () => {
    expect(instance.hideError).toBeDefined();
  });
});
