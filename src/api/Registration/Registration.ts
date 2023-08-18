import {
  CTP_AUTH_URL,
  CTP_API_URL,
  CTP_PROJECT_KEY,
  CTP_CLIENT_ID,
  CTP_CLIENT_SECRET,
  CTP_SCOPES,
} from '../APIClients/JSNinjas-custom';
import { CustomerCredentials } from '../../types';
import Authorization from '../Authorization/Authorization';

enum ErrorMessages {
  SERVER = 'Failed to connect to the server',
}

export default class Registration {
  public async register(credentials: CustomerCredentials): Promise<boolean> {
    const bearerToken = await this.getBearerToken();

    if (bearerToken === '') {
      return false;
    }

    const endpoint = `${CTP_API_URL}/${CTP_PROJECT_KEY}/customers?scope=${CTP_SCOPES}`;
    const body = JSON.stringify(credentials);

    let response;

    try {
      response = await fetch(endpoint, {
        body,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();

      console.log(data);
    } catch (err) {
      console.error(ErrorMessages.SERVER);
    }

    return response?.ok || false;
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
