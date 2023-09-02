import PasswordModalView from './PasswordModalView';

describe('PasswordModalView class', () => {
  const instance = new PasswordModalView();

  it('must be defined', () => {
    expect(PasswordModalView).toBeDefined();
  });

  it('an instance must have a buildView method', () => {
    expect(instance.buildView).toBeDefined();
  });

  it('an instance must have a show method', () => {
    expect(instance.show).toBeDefined();
  });

  it('an instance must have a hide method', () => {
    expect(instance.hide).toBeDefined();
  });
});
