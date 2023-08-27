import CatalogViewHTML from './CatalogView.html';
import CategoryViewAlpine from './Alpine/CatalogViewAlpine';

export default class CatalogView {
  public draw(id: string): void {
    const categoryInfo = { ...CategoryViewAlpine, categoryId: id };
    Alpine.data('CategoryInfo', () => categoryInfo);

    const main: HTMLElement = document.querySelector('main')!;
    main.innerHTML = CatalogViewHTML;
  }
}
