import InputView from './InputView';

describe('InputView class', () => {
  it('must be defined', () => {
    expect(InputView).toBeDefined();
  });

  it('an instance must have a buildInputView method', () => {
    const instance = new InputView();

    expect(instance.buildInputView).toBeDefined();
  });

  it('an instance must have a validateInput method', () => {
    const instance = new InputView();

    expect(instance.validateInput).toBeDefined();
  });
});
