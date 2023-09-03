import Alpine from 'alpinejs';
import BreadcrumbsViewHTML from './BreadcrumbsView.html';
/* eslint-disable import/no-cycle */
import CatalogView from '../CatalogView/CatalogView';
import { IBreadCrumbsLink, ICategoryInfoJSON } from './types/types';

export default class BreadcrumbsView {
  public draw(array: IBreadCrumbsLink[]): void {
    Alpine.data('Breadcrumbs', () => ({ links: array }));

    const breadcrumbs: HTMLElement = document.querySelector('[data-element="breadcrumbs"]')!;
    breadcrumbs.innerHTML = BreadcrumbsViewHTML;
  }

  public static clear(): void {
    const breadcrumbs: HTMLElement = document.querySelector('[data-element="breadcrumbs"]')!;
    breadcrumbs.innerHTML = '';
    localStorage.removeItem('category-path');
  }

  public static getCategoryLink(json: ICategoryInfoJSON, token: string): void {
    const breadcrumb: IBreadCrumbsLink[] = [];

    // create current category link
    if (!json.parent) {
      breadcrumb.push({
        name: json.name['en-US'],
        link: `/${json.key}`,
      });

      localStorage.setItem('category-path', JSON.stringify(breadcrumb));
      new BreadcrumbsView().draw(breadcrumb);
    }

    // if current have a parent category
    if (json.parent) {
      new CatalogView()
        .getCategoryCommonInfoJSON(json.parent.id, token)
        .then((parentJSON: ICategoryInfoJSON | null): void => {
          if (!parentJSON) return;

          breadcrumb.push({
            name: json.name['en-US'],
            link: `/${json.key}`,
          });

          breadcrumb.unshift({
            name: parentJSON.name['en-US'],
            link: `/${parentJSON.key}`,
          });

          localStorage.setItem('category-path', JSON.stringify(breadcrumb));
          new BreadcrumbsView().draw(breadcrumb);
        });
    }
  }

  public static async createProductPath(productLink: IBreadCrumbsLink): Promise<void> {
    let arrayCrumbs: IBreadCrumbsLink[] = [];

    const categoryLink: string | null = localStorage.getItem('category-path');

    if (categoryLink) arrayCrumbs = arrayCrumbs.concat(JSON.parse(categoryLink));
    arrayCrumbs.push(productLink);

    new BreadcrumbsView().draw(arrayCrumbs);
  }
}
