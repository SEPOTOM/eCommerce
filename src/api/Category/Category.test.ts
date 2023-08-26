import Category from "./Category";

describe('Class "Category"', () => {
  const category = new Category();

  it('Should be defined', () => {
    expect(Category).toBeDefined();
  });

  it('Should be possible to create class instance', () => {
    expect(category).toBeDefined();
  });

  it('Method "getCategoryByID" should be defined', () => {
    expect(category.getCategoryByID).toBeDefined();
  });

  it('Method "getCategoryByID" should response with error on wrong input parameters', () => {
    const id = String(Math.random());
    const clientToken = String(Math.random());

    const categoryError = category.getCategoryByID(id, clientToken);

    expect(categoryError).not.toHaveProperty('name');
  });
});