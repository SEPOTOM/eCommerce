import ErrorView from './ErrorView';

describe('ErrorView class', () => {
  const instance = new ErrorView();

  it('must be defined', () => {
    expect(ErrorView).toBeDefined();
  });

  it('an instance must have a buildView method', () => {
    expect(instance.buildView).toBeDefined();
  });
});
