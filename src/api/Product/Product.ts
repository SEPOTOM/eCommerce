import {
  CTP_PROJECT_KEY,
  CTP_CLIENT_SECRET,
  CTP_CLIENT_ID,
  CTP_AUTH_URL,
  CTP_API_URL,
  CTP_SCOPES,
} from '../APIClients/JSNinjas';
import { IProduct } from '../../types';

export default class Product {
  public async getProductByID(id: string, clientToken: string) {
    const queryString: string = `${CTP_API_URL}/${CTP_PROJECT_KEY}/products/${id}`;
    let responseJSON: IProduct | Error;

    try {
      const response: Response = await fetch(queryString, {
        method: 'GET',
        headers: {
          Authorization: `Basic ${clientToken}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      responseJSON = await response.json();
    } catch (error) {
      responseJSON = new Error('Please check your network connection and try again.');
    }

    return responseJSON;
  }
}