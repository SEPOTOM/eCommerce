import {
  CTP_PROJECT_KEY,
  CTP_CLIENT_SECRET,
  CTP_CLIENT_ID,
  CTP_AUTH_URL,
  /* CTP_API_URL, */
  CTP_SCOPES,
} from '../APIClients/JSNinjas-MobileSPA';
import { IClientLoginResponse, ICustomerLoginResponse, IError } from './Types';

export default class Authorization {
  public static async loginClient(): Promise<IClientLoginResponse | IError | Error> {
    const queryString: string = `${CTP_AUTH_URL}/oauth/token?grant_type=client_credentials&scope=${CTP_SCOPES}`;
    let responseJSON: ICustomerLoginResponse | IError | Error;

    try {
      const response: Response = await fetch(queryString, {
        method: 'POST',
        headers: {
          Authorization: `Basic ${btoa(`${CTP_CLIENT_ID}:${CTP_CLIENT_SECRET}`)}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      responseJSON = await response.json();
    } catch (error) {
      responseJSON = new Error('Please check your network connection or try again.');
    }

    return responseJSON;
  }

  public static async loginBasicAuth(
    login: string,
    password: string
  ): Promise<ICustomerLoginResponse | IError | Error> {
    const queryString: string = `${CTP_AUTH_URL}/oauth/${CTP_PROJECT_KEY}/customers/token?grant_type=password&username=${login}&password=${password}&scope=${CTP_SCOPES}`;
    let responseJSON: ICustomerLoginResponse | IError | Error;

    try {
      const responsePromise = await fetch(queryString, {
        method: 'POST',
        headers: {
          Authorization: `Basic ${btoa(`${CTP_CLIENT_ID}:${CTP_CLIENT_SECRET}`)}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      responseJSON = await responsePromise.json();
    } catch (error) {
      responseJSON = new Error('Please check your network connection or try again.');
    }
    return responseJSON;
  }
}
