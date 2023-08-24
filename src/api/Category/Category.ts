import {
  CTP_PROJECT_KEY,
  // CTP_CLIENT_SECRET,
  // CTP_CLIENT_ID,
  // CTP_AUTH_URL,
  CTP_API_URL,
  // CTP_SCOPES,
} from '../APIClients/JSNinjas-custom';
import { ICategory, IError, IClientLoginResponse } from '../../types';

export default class Category {
  public async getCategoryByID(id: string, clientToken: string): Promise<ICategory | IError | Error> {
    const queryString: string = `${CTP_API_URL}/${CTP_PROJECT_KEY}/categories/${id}`;
    let responseJSON: ICategory | IError | Error;

    try {
      const responsePromise = await fetch(queryString, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${clientToken}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      responseJSON = await responsePromise.json();
    } catch (error) {
      responseJSON = new Error('Please check your network connection and try again.');
    }
    return responseJSON;
  }
}