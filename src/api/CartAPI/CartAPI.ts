/* eslint-disable import/no-cycle */
import { CTP_API_URL, CTP_PROJECT_KEY } from '../APIClients/JSNinjas-custom';
import Tokens from '../../components/Tokens/Tokens';
import { CartResponse, IError, IAddLineItem, ICartTemplate } from '../../types';

// In the future, instead of using this constant,
// the Cart.get method will accept the id as a parameter
const TEMPORARY_CART_ID = 'f689b145-49c7-43bf-9ef2-d86831ab238c';

enum ErrorMessages {
  SERVER = 'Failed to connect to the server. Please, check your connection or try again later.',
  TRY_LATER = 'Please, try again later.',
}

export default class CartAPI {
  public static async get(): Promise<CartResponse | Error> {
    const endpoint = `${CTP_API_URL}/${CTP_PROJECT_KEY}/me/carts/${TEMPORARY_CART_ID}`;
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
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      const data: CartResponse | IError = await response.json();

      if ('message' in data) {
        return new Error(`${data.message} ${ErrorMessages.TRY_LATER}`);
      }

      return data;
    } catch (err) {
      return new Error(ErrorMessages.SERVER);
    }
  }

  public static async updateLineItem(cartID: string, payload: IAddLineItem): Promise<void> {
    const endpoint = `${CTP_API_URL}/${CTP_PROJECT_KEY}/carts/${cartID}`;
    const tokens = await Tokens.getCustomerTokens();
    const bearerToken = tokens.access_token;

    if (bearerToken) {
      try {
        await fetch(endpoint, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
          body: JSON.stringify(payload),
        });
      } catch (err) {
        console.log(ErrorMessages.SERVER);
      }
    }
  }

  public static async getCartByID(id: string): Promise<CartResponse | Error> {
    const endpoint = `${CTP_API_URL}/${CTP_PROJECT_KEY}/me/carts/${id}`;
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
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      const data: CartResponse | IError = await response.json();

      if ('message' in data) {
        return new Error(`${data.message} ${ErrorMessages.TRY_LATER}`);
      }

      return data;
    } catch (err) {
      return new Error(ErrorMessages.SERVER);
    }
  }

  public static async getCarts(): Promise<CartResponse | Error> {
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
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      const data: CartResponse | IError = await response.json();

      if ('message' in data) {
        return new Error(`${data.message} ${ErrorMessages.TRY_LATER}`);
      }

      return data;
    } catch (err) {
      return new Error(ErrorMessages.SERVER);
    }
  }

  public static async createCustomerCart(payload: ICartTemplate): Promise<CartResponse | Error> {
    const endpoint = `${CTP_API_URL}/${CTP_PROJECT_KEY}/carts`;
    const tokens = await Tokens.getCustomerTokens();
    const bearerToken = tokens.access_token;

    console.log(tokens.access_token);

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
        body: JSON.stringify(payload),
      });
      const newCartID: CartResponse | Error = await response.json();
      return newCartID;
    } catch (err) {
      return new Error(ErrorMessages.SERVER);
    }
  }
}
