import DateInputView from './DateInputView';

describe('DateInputView class', () => {
  it('must be defined', () => {
    expect(DateInputView).toBeDefined();
  });

  it('an instance must have a validateInput method', () => {
    const instance = new DateInputView();

    expect(instance.validateInput).toBeDefined();
  });
});
