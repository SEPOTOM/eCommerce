import {
  CTP_AUTH_URL,
  CTP_API_URL,
  CTP_PROJECT_KEY,
  CTP_CLIENT_ID,
  CTP_CLIENT_SECRET,
  CTP_SCOPES,
} from '../APIClients/JSNinjas-custom';
import { CustomerCredentials, ResponseInfo } from '../../types';
import Authorization from '../Authorization/Authorization';

enum ErrorMessages {
  SERVER = 'Failed to connect to the server',
}

export default class Registration {
  public async register(credentials: CustomerCredentials): Promise<ResponseInfo> {
    const result: ResponseInfo = {
      ok: false,
      message: ErrorMessages.SERVER,
    };

    const bearerToken = await this.getBearerToken();

    if (bearerToken === '') {
      return result;
    }

    const endpoint = `${CTP_API_URL}/${CTP_PROJECT_KEY}/customers?scope=${CTP_SCOPES}`;
    const body = JSON.stringify(credentials);

    try {
      const response = await fetch(endpoint, {
        body,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();

      if ('message' in data) {
        result.message = data.message;
      } else {
        result.ok = true;
      }
    } catch (err) {
      return result;
    }

    return result;
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
