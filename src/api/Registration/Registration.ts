import {
  // CTP_AUTH_URL,
  CTP_API_URL,
  CTP_PROJECT_KEY,
  // CTP_CLIENT_ID,
  // CTP_CLIENT_SECRET,
  CTP_SCOPES,
} from '../APIClients/JSNinjas-custom';
import { CustomerCredentials, ResponseInfo, RegErrorResponse, CustomerResponse } from '../../types';
import Authorization from '../Authorization/Authorization';
/* eslint-disable import/no-cycle */
import Tokens from '../../components/Tokens/Tokens';
import Customer from '../Customer/Customer';

enum ErrorMessages {
  SERVER = 'Failed to connect to the server. Please check your network connection or try again later.',
  EXISTING_EMAIL = 'Please either log in or use a different email address.',
  INVALID_FIELDS = 'Please check the correctness of the filled in fields or try again later.',
  TRY_AGAIN = 'Please try again later.',
}

enum ErrorCodes {
  DUPLICATE = 'DuplicateField',
  INVALID_JSON = 'InvalidJsonInput',
}

export default class Registration {
  public async register(credentials: CustomerCredentials): Promise<ResponseInfo> {
    const result: ResponseInfo = {
      ok: false,
      message: ErrorMessages.SERVER,
    };

    const bearerToken = await Tokens.getClientAccessToken();

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
      const data: RegErrorResponse | CustomerResponse = await response.json();

      if ('message' in data) {
        result.message = this.getMessage(data);
      } else {
        result.ok = true;
        Customer.setId(data.customer.id);
      }
    } catch (err) {
      return result;
    }

    return result;
  }

  public async login(login: string, password: string): Promise<void> {
    const loginResponse = await Authorization.loginBasicAuth(login, password);

    if ('message' in loginResponse) {
      return;
    }

    Tokens.setCustomerTokens(loginResponse);
  }

  private getMessage(data: RegErrorResponse): string {
    const specificError = data.errors[0];

    if (specificError.code === ErrorCodes.DUPLICATE && specificError.field === 'email') {
      return `${data.message} ${ErrorMessages.EXISTING_EMAIL}`;
    }

    if (specificError.code === ErrorCodes.INVALID_JSON) {
      return `${data.message} ${ErrorMessages.INVALID_FIELDS}`;
    }

    return `${data.message} ${ErrorMessages.TRY_AGAIN}`;
  }
}
