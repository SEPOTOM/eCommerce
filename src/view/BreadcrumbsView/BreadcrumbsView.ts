import BreadcrumbsViewHTML from './BreadcrumbsView.html';
import { IBreadCrumbsLink } from './types/types';

export default class BreadcrumbsView {
  public draw(array: IBreadCrumbsLink[]): void {
    Alpine.data('Breadcrumbs', () => ({ links: array }));

    const breadcrumbs: HTMLElement = document.querySelector('[data-element="breadcrumbs"]')!;
    breadcrumbs.innerHTML = BreadcrumbsViewHTML;
  }

  public static clear() {
    const breadcrumbs: HTMLElement = document.querySelector('[data-element="breadcrumbs"]')!;
    breadcrumbs.innerHTML = '';
    localStorage.removeItem('previousCategory');
  }
}
