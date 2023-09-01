import Alpine from 'alpinejs';
import CatalogViewHTML from './CatalogView.html';
/* eslint-disable import/no-cycle */
import CategoryViewAlpine from './Alpine/CatalogViewAlpine';

export default class CatalogView {
  public draw(id: string): void {
    const categoryInfo = { ...CategoryViewAlpine, categoryId: id };
    Alpine.data('CategoryInfo', () => categoryInfo);

    const main: HTMLElement = document.querySelector('main')!;
    main.innerHTML = CatalogViewHTML;
  }
}
