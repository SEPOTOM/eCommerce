import { CTP_API_URL, CTP_PROJECT_KEY } from '../APIClients/JSNinjas';
import {
  IAllCategories,
  INavigation,
  ISingleCategory,
  IBodyRequest,
  INavigationLevel1,
  INavigationLevel2,
  IRouteProductLink,
  IShortProductsJSON,
  IAllProducts,
} from './types/types';

export default class Navigation {
  public async getCategoryJSON(token: string): Promise<IAllCategories | null> {
    const URL: string = `${CTP_API_URL}/${CTP_PROJECT_KEY}/categories`;

    try {
      return await fetch(URL, this.setBodyRequest(token)).then((resp) => resp.json());
    } catch {
      return null;
    }
  }

  public async getAllproductJSON(token: string): Promise<IAllProducts | null> {
    const URL: string = `${CTP_API_URL}/${CTP_PROJECT_KEY}/products?limit=100`;

    try {
      return await fetch(URL, this.setBodyRequest(token)).then((resp) => resp.json());
    } catch {
      return null;
    }
  }

  public createProductsLinks(json: IShortProductsJSON[]): IRouteProductLink[] {
    const productLinks: IRouteProductLink[] = [];

    json.forEach((item: IShortProductsJSON): void => {
      productLinks.push({
        link: `/${item.key}`,
        productId: item.id,
      });
    });

    return productLinks;
  }

  public createRouteCategoryLinks(json: ISingleCategory[]): INavigation[] {
    const navigation: INavigation[] = [];

    // Get links from CommerceTools
    json.forEach((data: ISingleCategory): void => {
      navigation.push({
        text: data.name['en-US'],
        link: `/${data.key}`,
        categoryId: data.id,
      });
    });

    // Add additional links
    navigation.push({
      text: 'About us',
      link: '/about-us',
    });

    return navigation;
  }

  public createMenu(json: ISingleCategory[]): INavigationLevel1[] {
    let level1: INavigationLevel1[] = this.createMenuLevel1(json);
    const level2: INavigationLevel2[] = this.createMenuLevel2(json);

    level1 = this.combineMenuLevels(level1, level2);

    // Add additional links
    level1.push({
      text: 'About us',
      link: '/about-us',
    });

    return level1;
  }

  private createMenuLevel1(array: ISingleCategory[]): INavigationLevel1[] {
    const result: INavigationLevel1[] = [];

    array.forEach((item: ISingleCategory): void => {
      if (!item.parent) {
        result.push({
          text: item.name['en-US'],
          link: `/${item.key}`,
          categoryId: item.id,
          children: [],
        });
      }
    });

    return result;
  }

  private createMenuLevel2(array: ISingleCategory[]): INavigationLevel2[] {
    const result: INavigationLevel2[] = [];

    array.forEach((item: ISingleCategory): void => {
      if (item.parent) {
        result.push({
          text: item.name['en-US'],
          link: `/${item.key}`,
          categoryId: item.id,
          parentId: item.parent.id,
        });
      }
    });

    return result;
  }

  private combineMenuLevels(lvl1: INavigationLevel1[], lvl2: INavigationLevel2[]): INavigationLevel1[] {
    for (let i = 0; i < lvl2.length; i += 1) {
      for (let j = 0; j < lvl1.length; j += 1) {
        if (lvl2[i].parentId === lvl1[j].categoryId) {
          lvl1[j].children!.push(lvl2[i]);
        }
      }
    }

    return lvl1;
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
