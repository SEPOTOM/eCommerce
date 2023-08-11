import {
  CTP_PROJECT_KEY,
  CTP_CLIENT_SECRET,
  CTP_CLIENT_ID,
  CTP_AUTH_URL,
  /* CTP_API_URL, */
  CTP_SCOPES,
} from '../APIClients/JSNinjas-MobileSPA';

interface IClientLoginResponse {
  access_token: string;
  expires_in: number;
  scope: string;
  token_type: string;
}

interface ICustomerLoginResponse {
  access_token: string;
  expires_in: number;
  scope: string;
  refresh_token: string;
  token_type: string;
}

interface IError {
  statusCode: number;
  message: string;
  errors: [];
  error: string;
  error_description: string;
}

class Authorization {
  public static async loginClient(): Promise<IClientLoginResponse> {
    const queryString: string = `${CTP_AUTH_URL}/oauth/token?grant_type=client_credentials&scope=${CTP_SCOPES}`;

    const response: Response = await fetch(queryString, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${btoa(`${CTP_CLIENT_ID}:${CTP_CLIENT_SECRET}`)}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const responseJSON: IClientLoginResponse = await response.json();

    return responseJSON;
  }

  public static async loginBasicAuth(login: string, password: string): Promise<ICustomerLoginResponse | IError> {
    const queryString: string = `${CTP_AUTH_URL}/oauth/${CTP_PROJECT_KEY}/customers/token?grant_type=password&username=${login}&password=${password}&scope=${CTP_SCOPES}`;

    const response: Response = await fetch(queryString, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${btoa(`${CTP_CLIENT_ID}:${CTP_CLIENT_SECRET}`)}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const responseJSON: ICustomerLoginResponse | IError = await response.json();

    return responseJSON;
  }
}

export { Authorization, IClientLoginResponse, ICustomerLoginResponse, IError };
