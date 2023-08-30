import BreadcrumbsViewHTML from './BreadcrumbsView.html';
import { IBreadCrumbsLink, ICategoryInfoJSON, INavigationLevel1 } from './types/types';
import Navigation from '../../api/Navigation/Navigation';

export default class BreadcrumbsView {
  public draw(array: IBreadCrumbsLink[]): void {
    Alpine.data('Breadcrumbs', () => ({ links: array }));

    const breadcrumbs: HTMLElement = document.querySelector('[data-element="breadcrumbs"]')!;
    breadcrumbs.innerHTML = BreadcrumbsViewHTML;
  }

  public static clear() {
    const breadcrumbs: HTMLElement = document.querySelector('[data-element="breadcrumbs"]')!;
    breadcrumbs.innerHTML = '';
    localStorage.removeItem('category-path');
  }

  public static async createCategoryPath(json: ICategoryInfoJSON | null): Promise<void> {
    if (!json) return;

    Navigation.menu.then((data: INavigationLevel1[]): void => {
      const categoryId = json.id;
      const parentId = json?.parent?.id;
      const breadcrumb: IBreadCrumbsLink[] = [];

      if (parentId) {
        const parent: INavigationLevel1[] = data.filter((item: INavigationLevel1) => item.categoryId === parentId);
        breadcrumb.push({
          name: parent[0].text,
          link: parent[0].link,
        });
      }

      if (categoryId && parentId) {
        const parent: INavigationLevel1[] = data.filter((item: INavigationLevel1) => item.categoryId === parentId);
        const category: INavigationLevel1[] = parent[0].children!.filter(
          (item: INavigationLevel1) => item.categoryId === categoryId
        );

        breadcrumb.push({
          name: category[0].text,
          link: category[0].link,
        });
      }

      if (categoryId && !parentId) {
        const category: INavigationLevel1[] = data.filter((item: INavigationLevel1) => item.categoryId === categoryId);
        breadcrumb.push({
          name: category[0].text,
          link: category[0].link,
        });
      }

      localStorage.setItem('category-path', JSON.stringify(breadcrumb));
      new BreadcrumbsView().draw(breadcrumb);
    });
  }

  public static async createProductPath(productLink: IBreadCrumbsLink): Promise<void> {
    let arrayCrumbs: IBreadCrumbsLink[] = [];

    const categoryLink: string | null = localStorage.getItem('category-path');

    if (categoryLink) arrayCrumbs = arrayCrumbs.concat(JSON.parse(categoryLink));
    arrayCrumbs.push(productLink);

    new BreadcrumbsView().draw(arrayCrumbs);
  }
}
