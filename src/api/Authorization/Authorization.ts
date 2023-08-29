import {
  CTP_PROJECT_KEY,
  CTP_CLIENT_SECRET,
  CTP_CLIENT_ID,
  CTP_AUTH_URL,
  /* CTP_API_URL, */
  CTP_SCOPES,
} from '../APIClients/JSNinjas-custom';
import { IClientLoginResponse, ICustomerLoginResponse, IError } from '../../types';

export default class Authorization {
  public static async loginClient(
    queryString: string,
    basicToken: string
  ): Promise<IClientLoginResponse | IError | Error> {
    let responseJSON: ICustomerLoginResponse | IError | Error;

    try {
      const response: Response = await fetch(queryString, {
        method: 'POST',
        headers: {
          Authorization: `Basic ${basicToken}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      responseJSON = await response.json();
    } catch (error) {
      responseJSON = new Error('Please check your network connection and try again.');
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
      responseJSON = new Error('Please check your network connection and try again.');
    }
    return responseJSON;
  }

  public static async refreshCustomerToken(refreshToken: string): Promise<ICustomerLoginResponse | IError | Error> {
    const queryString: string = `${CTP_AUTH_URL}/oauth/token?grant_type=refresh_token&refresh_token=${refreshToken}`;
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
      responseJSON = new Error(
        'Cannot reach out to server. Please, check your network connection and server availability.'
      );
    }
    return responseJSON;
  }
}
