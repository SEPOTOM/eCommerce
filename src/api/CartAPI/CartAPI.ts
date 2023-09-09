/* eslint-disable import/no-cycle */
import { CTP_API_URL, CTP_PROJECT_KEY } from '../APIClients/JSNinjas-custom';
import Tokens from '../../components/Tokens/Tokens';
import { CartResponse, IError, CartsResponse } from '../../types';

enum ErrorMessages {
  SERVER = 'Failed to connect to the server. Please, check your connection or try again later.',
  TRY_LATER = 'Please, try again later.',
  NO_CART = 'Could not find the cart for the current customer. Please, try again later.',
}

export default class CartAPI {
  public static async get(): Promise<CartResponse | Error> {
    const endpoint = `${CTP_API_URL}/${CTP_PROJECT_KEY}/me/carts`;
    const tokens = await Tokens.getCustomerTokens();

    if (!tokens) {
      return new Error(ErrorMessages.SERVER);
    }

    const bearerToken = tokens.access_token;

    try {
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      });
      const data: CartsResponse | IError = await response.json();

      if ('message' in data) {
        return new Error(`${data.message} ${ErrorMessages.TRY_LATER}`);
      }

      if (!data.results[0]) {
        return new Error(ErrorMessages.NO_CART);
      }

      return data.results[0];
    } catch (err) {
      return new Error(ErrorMessages.SERVER);
    }
  }
}
