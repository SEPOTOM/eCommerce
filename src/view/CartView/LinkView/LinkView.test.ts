import LinkView from './LinkView';

describe('LinkView class', () => {
  const instance = new LinkView();

  it('must be defined', () => {
    expect(LinkView).toBeDefined();
  });

  it('an instance must have a buildView method', () => {
    expect(instance.buildView).toBeDefined();
  });
});
