import {
  CTP_AUTH_URL,
  CTP_API_URL,
  CTP_PROJECT_KEY,
  CTP_CLIENT_ID,
  CTP_CLIENT_SECRET,
  CTP_SCOPES,
} from '../APIClients/JSNinjas';
import Authorization from '../Authorization/Authorization';
/* eslint-disable import/no-cycle */
// import Tokens from '../../components/Tokens/Tokens';
import { IBodyRequest, IShortCategoryJSON, IShortProductsJSON, IRouteProductLink } from './types/types';

export default class Catalog {
  static productLinks: Promise<IRouteProductLink[]> = new Catalog().createProductsLinks();

  public static async getCategoryInfoJSON(id: string): Promise<IShortCategoryJSON | null> {
    const TOKEN: string = await new Catalog().getBearerToken();
    const URL: string = `${CTP_API_URL}/${CTP_PROJECT_KEY}/categories/${id}`;
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

  public static async getAllProductsJSON(): Promise<IShortProductsJSON | null> {
    const TOKEN: string = await new Catalog().getBearerToken();
    const URL: string = `${CTP_API_URL}/${CTP_PROJECT_KEY}/products`;
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

  public async createProductsLinks(): Promise<IRouteProductLink[]> {
    const JSON: IShortProductsJSON | null = await Catalog.getAllProductsJSON();
    const productLinks: IRouteProductLink[] = [];

    // Get links from CommerceTools
    JSON?.results.forEach((data): void => {
      const item: IRouteProductLink = {
        link: `/${data.key}`,
        produtId: data.id,
      };

      productLinks.push(item);
    });

    return productLinks;
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
