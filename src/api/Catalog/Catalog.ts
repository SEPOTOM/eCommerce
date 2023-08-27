import { CTP_API_URL, CTP_PROJECT_KEY } from '../APIClients/JSNinjas';
import Tokens from './../../components/Tokens/Tokens';
import { IBodyRequest, IShortCategoryJSON, IShortProductsJSON, IRouteProductLink } from './types/types';

export default class Catalog {
  static productLinks: Promise<IRouteProductLink[]> = new Catalog().createProductsLinks();

  public static async getCategoryInfoJSON(id: string): Promise<IShortCategoryJSON | null> {
    const TOKEN: string = await Tokens.getClientAccessToken();
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
    const TOKEN: string = await Tokens.getClientAccessToken();
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
}
