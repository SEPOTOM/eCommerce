import {
  CTP_AUTH_URL,
  CTP_API_URL,
  CTP_PROJECT_KEY,
  CTP_CLIENT_ID,
  CTP_CLIENT_SECRET,
  CTP_SCOPES,
} from '../APIClients/JSNinjas';
import Authorization from '../Authorization/Authorization';

import {
  IAllCategories,
  INavigation,
  ISingleCategory,
  IBodyRequest,
  INavigationLevel1,
  INavigationLevel2,
} from './types/types';

export default class Navigation {
  static allCategoryLinks = new Navigation().createRouteCategoryLinks();

  static menu = new Navigation().createMenu();

  private async getCategoryJSON(): Promise<IAllCategories | null> {
    const TOKEN: string = await this.getBearerToken();
    const URL: string = `${CTP_API_URL}/${CTP_PROJECT_KEY}/categories`;
    const BODY: IBodyRequest = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    };

    try {
      return await fetch(URL, BODY).then((resp) => resp.json());
    } catch {
      return null;
    }
  }

  public async createRouteCategoryLinks(): Promise<INavigation[]> {
    const JSON: IAllCategories | null = await this.getCategoryJSON();
    const navigation: INavigation[] = [];

    // Get links from CommerceTools
    JSON?.results.forEach((data: ISingleCategory): void => {
      const item: INavigation = {
        text: data.name['en-US'],
        link: `/${data.key}`,
        categoryId: data.id,
      };

      navigation.push(item);
    });

    // Add additional links
    navigation.push({
      text: 'About us',
      link: '/about-us',
    });

    return navigation;
  }

  public async createMenu(): Promise<INavigation[]> {
    const JSON: IAllCategories | null = await this.getCategoryJSON();
    const level1: INavigationLevel1[] = [];
    const level2: INavigationLevel2[] = [];

    JSON?.results.forEach((data: ISingleCategory): void => {
      if (!data.parent) {
        level1.push({
          text: data.name['en-US'],
          link: `/${data.key}`,
          categoryId: data.id,
          children: [],
        });
      } else {
        level2.push({
          text: data.name['en-US'],
          link: `/${data.key}`,
          categoryId: data.id,
          parentId: data.parent.id,
        });
      }
    });

    for (let i = 0; i < level2.length; i += 1) {
      for (let j = 0; j < level1.length; j += 1) {
        if (level2[i].parentId === level1[j].categoryId) {
          level1[j].children!.push(level2[i]);
        }
      }
    }

    // Add additional links
    level1.push({
      text: 'About us',
      link: '/about-us',
    });

    return level1;
  }

  private async getBearerToken(): Promise<string> {
    const endpoint = `${CTP_AUTH_URL}/oauth/token?grant_type=client_credentials&scope=${CTP_SCOPES}`;
    const basicToken = btoa(`${CTP_CLIENT_ID}:${CTP_CLIENT_SECRET}`);
    const data = await Authorization.loginClient(endpoint, basicToken);

    if ('message' in data) {
      return '';
    }
    return data.access_token;
  }
}
