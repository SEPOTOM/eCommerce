import '@testing-library/jest-dom';
import BreadcrumbsView from '../BreadcrumbsView';
import testData from './data';

describe('[ BreadcrumbsView ]: common test', (): void => {
  it('-- class "BreadcrumbsView" should be defined', (): void => {
    expect(BreadcrumbsView).toBeDefined();
  });

  it('-- all methods exist', (): void => {
    expect(new BreadcrumbsView().draw).toBeDefined();
    expect(BreadcrumbsView.clear).toBeDefined();
    expect(BreadcrumbsView.getCategoryLink).toBeDefined();
    expect(BreadcrumbsView.createProductPath).toBeDefined();
  });
});

describe('[BreadcrumbsView]: method testing', (): void => {
  document.body.innerHTML = '<div data-element="breadcrumbs"></div>';

  it('-- methods "clear" / "draw" / "getCategoryLink" / "createProductPath" return void', async () => {
    expect(BreadcrumbsView.clear()).toBeFalsy();
    expect(new BreadcrumbsView().draw(testData.draw)).toBeFalsy();
    expect(BreadcrumbsView.getCategoryLink(testData.getCategoryLink.json, testData.getCategoryLink.token)).toBeFalsy();
    await expect(BreadcrumbsView.createProductPath(testData.createProductPath)).toEqual(Promise.resolve());
  });
});
