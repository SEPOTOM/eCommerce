import {
  CTP_AUTH_URL,
  CTP_API_URL,
  CTP_PROJECT_KEY,
  CTP_CLIENT_ID,
  CTP_CLIENT_SECRET,
  CTP_SCOPES,
} from '../APIClients/JSNinjas';
import Authorization from '../Authorization/Authorization';

import { IAllCategories, INavigation, ISingleCategory, IBodyRequest } from './types/types';

export default class Navigation {
  static links = new Navigation().createNavigation();

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
      return await fetch(URL, BODY)
        .then((resp) => resp.json())
        .then((json) => json);
    } catch {
      return null;
    }
  }

  public async createNavigation(): Promise<INavigation[]> {
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
