/* eslint-disable import/no-cycle */
import Tokens from '../../components/Tokens/Tokens';
import { CTP_API_URL, CTP_PROJECT_KEY } from '../APIClients/JSNinjas-custom';
import { CustomerResponse } from '../../types';

enum StorageNames {
  ID = 'customer-id',
}

enum ErrorMessages {
  NO_CUSTOMER = 'The customer with the given ID was not found',
  SERVER = 'Failed to connect to the server',
}

export default class Customer {
  public static setId(id: string): void {
    localStorage.setItem(StorageNames.ID, id);
  }

  public static getId(): string | null {
    return localStorage.getItem(StorageNames.ID) || null;
  }

  public static async getCurrentCustomer(): Promise<CustomerResponse | Error> {
    try {
      const endpoint = `${CTP_API_URL}/${CTP_PROJECT_KEY}/me`;
      const bearerToken = (await Tokens.getCustomerTokens()).access_token;

      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      });
      const data: CustomerResponse = await response.json();

      if ('message' in data) {
        return new Error(ErrorMessages.NO_CUSTOMER);
      }
      return data;
    } catch (err) {
      return new Error(ErrorMessages.SERVER);
    }
  }
}
