/* eslint-disable import/no-cycle */
import Tokens from '../../components/Tokens/Tokens';
import { CTP_API_URL, CTP_PROJECT_KEY } from '../APIClients/JSNinjas-custom';
import { CustomerDataResponse } from '../../types';

enum ErrorMessages {
  NO_CUSTOMER = 'The customer with the given ID was not found',
  SERVER = 'Failed to connect to the server',
}

export default class Customer {
  public static async getCurrentCustomer(): Promise<CustomerDataResponse | Error> {
    try {
      const endpoint = `${CTP_API_URL}/${CTP_PROJECT_KEY}/me`;
      const bearerToken = (await Tokens.getCustomerTokens()).access_token;

      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      });
      const data: CustomerDataResponse = await response.json();

      if ('message' in data) {
        return new Error(ErrorMessages.NO_CUSTOMER);
      }
      return data;
    } catch (err) {
      return new Error(ErrorMessages.SERVER);
    }
  }
}
