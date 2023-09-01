import '@testing-library/jest-dom';
import BreadcrumbsView from './BreadcrumbsView';

describe('Main [BreadcrumbsView] test', (): void => {
  it('-- class "BreadcrumbsView" should be defined', (): void => {
    expect(BreadcrumbsView).toBeDefined();
  });

  it('-- all methods exist', (): void => {
    expect(new BreadcrumbsView().draw).toBeDefined();
    expect(BreadcrumbsView.clear).toBeDefined();
    expect(BreadcrumbsView.createCategoryPath).toBeDefined();
  });
});

describe('[BreadcrumbsView] test method "clear"', (): void => {
  it('-- method return void & breadcrumbs is empty', (): void => {
    document.body.innerHTML = '<div data-element="breadcrumbs"></div>';
    const breadcrumbs = document.querySelector('[data-element="breadcrumbs"]');

    BreadcrumbsView.clear();
    expect(BreadcrumbsView.clear()).toBeFalsy();
    expect(breadcrumbs).toBeEmptyDOMElement();
  });
});

describe('[BreadcrumbsView] test method "draw"', (): void => {
  it('-- method return void & work correctly', (): void => {
    document.body.innerHTML = '<div data-element="breadcrumbs"></div>';
    const data = [{ name: 'Test', link: '/test' }];

    expect(new BreadcrumbsView().draw(data)).toBeFalsy();
  });
});
