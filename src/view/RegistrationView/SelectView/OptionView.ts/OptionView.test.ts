import OptionView from './OptionView';

describe('OptionView class', () => {
  it('must be defined', () => {
    expect(OptionView).toBeDefined();
  });

  it('an instance must have a buildOptionView method', () => {
    const instance = new OptionView();

    expect(instance.buildOptionView).toBeDefined();
  });
});
