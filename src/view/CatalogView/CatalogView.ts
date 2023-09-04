import Alpine from 'alpinejs';
import CatalogViewWrapperHTML from './html/CategoryViewWrapper.html';
import CatalogViewHeaderHTML from './html/CategoryViewHeader.html';
import CatalogViewProductsHTML from './html/CategoryViewProducts.html';
import CatalogViewFilteringHTML from './html/CategoryViewFiltering.html';

/* eslint-disable import/no-cycle */
import CategoryViewAlpine from './Alpine/CatalogViewAlpine';
import { IBodyRequest, IShortCategoryJSON } from './types/types';
import { CTP_API_URL, CTP_PROJECT_KEY } from '../../api/APIClients/JSNinjas';

import BreadcrumbsView from '../BreadcrumbsView/BreadcrumbsView';

export default class CatalogView {
  public draw(id: string, token: string): void {
    this.getCategoryCommonInfoJSON(id, token).then((json) => {
      Alpine.data('CategoryInfo', () => ({
        ...CategoryViewAlpine,
        categoryId: id,
        token,
        title: json?.name['en-US'],
        description: json?.description['en-US'],
        setBodyRequest: () => this.setBodyRequest(token),
      }));

      this.drawCategoryBlock();
      BreadcrumbsView.getCategoryLink(json!, token);
    });
  }

  private drawCategoryBlock(): void {
    const main: HTMLElement = document.querySelector('main')!;
    main.innerHTML = CatalogViewWrapperHTML;

    const wrapper: HTMLElement = document.querySelector('[data-element="category-wrapper"]')!;
    wrapper.innerHTML = CatalogViewHeaderHTML;
    wrapper.innerHTML += CatalogViewFilteringHTML;
    wrapper.innerHTML += CatalogViewProductsHTML;
  }

  public async getCategoryCommonInfoJSON(id: string, token: string): Promise<IShortCategoryJSON | null> {
    const URL: string = `${CTP_API_URL}/${CTP_PROJECT_KEY}/categories/${id}`;

    try {
      return await fetch(URL, this.setBodyRequest(token)).then((resp) => resp.json());
    } catch {
      return null;
    }
  }

  private setBodyRequest(token: string): IBodyRequest {
    return {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }
}
