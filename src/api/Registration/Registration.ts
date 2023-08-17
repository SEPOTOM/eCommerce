import {
  CTP_AUTH_URL,
  CTP_API_URL,
  CTP_PROJECT_KEY,
  CTP_CLIENT_ID,
  CTP_CLIENT_SECRET,
  CTP_SCOPES,
} from '../APIClients/JSNinjas-custom';
import { CustomerCredentials } from '../../types';
import { IClientLoginResponse } from '../Authorization/Types';

enum ErrorMessages {
  SERVER = 'Failed to connect to the server',
}

export default class Registration {
  public async register(credentials: CustomerCredentials): Promise<void> {
    const bearerToken = await this.getBearerToken();

    if (bearerToken === '') {
      return;
    }

    const endpoint = `${CTP_API_URL}/${CTP_PROJECT_KEY}/customers?scope=${CTP_SCOPES}`;
    const body = JSON.stringify(credentials);

    let data;

    try {
      const response = await fetch(endpoint, {
        body,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          'Content-Type': 'application/json',
        },
      });
      data = await response.json();
    } catch (err) {
      console.error(ErrorMessages.SERVER);
      return;
    }

    console.log(data);
  }

  private async getBearerToken(): Promise<string> {
    const endpoint = `${CTP_AUTH_URL}/oauth/token?grant_type=client_credentials&scope=${CTP_SCOPES}`;
    const basicToken = btoa(`${CTP_CLIENT_ID}:${CTP_CLIENT_SECRET}`);

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          Authorization: `Basic ${basicToken}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      const data: IClientLoginResponse = await response.json();

      return data.access_token;
    } catch (err) {
      console.error(ErrorMessages.SERVER);
      return '';
    }
  }
}
