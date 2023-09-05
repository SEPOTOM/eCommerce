import ParagraphView from './ParagraphView';

describe('ParagraphView class', () => {
  const instance = new ParagraphView();

  it('must be defined', () => {
    expect(ParagraphView).toBeDefined();
  });

  it('an instance must have a buildView method', () => {
    expect(instance.buildView).toBeDefined();
  });

  it('an instance must have a getContent method', () => {
    expect(instance.getContent).toBeDefined();
  });

  it('an instance must have a setContent method', () => {
    expect(instance.setContent).toBeDefined();
  });
});
