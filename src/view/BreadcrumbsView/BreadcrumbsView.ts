import BreadcrumbsViewHTML from './BreadcrumbsView.html';
import { IBreadCrumbsLink } from './types/types';

export default class BreadcrumbsView {
  public draw(array: IBreadCrumbsLink[]): void {
    Alpine.data('Breadcrumbs', () => ({ links: array }));

    const breadcraumbs: HTMLElement = document.querySelector('[data-element="breadcrumbs"]')!;
    breadcraumbs.innerHTML = BreadcrumbsViewHTML;
  }

  public static clear() {
    const breadcraumbs: HTMLElement = document.querySelector('[data-element="breadcrumbs"]')!;
    breadcraumbs.innerHTML = '';
    localStorage.removeItem('previousCategory');
  }
}
