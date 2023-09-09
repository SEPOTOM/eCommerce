/* eslint-disable import/no-cycle */
import { CTP_API_URL, CTP_PROJECT_KEY } from '../APIClients/JSNinjas-custom';
import Tokens from '../../components/Tokens/Tokens';
import { CartResponse, IError } from '../../types';
import { UpdateRequest, LineItemChangeQuantityAction } from './types';

// In the future, instead of using this constant,
// the Cart.get method will accept the id as a parameter
const TEMPORARY_CART_ID = '88482500-e579-4965-82bc-f155a4f32d97';

enum ErrorMessages {
  SERVER = 'Failed to connect to the server. Please, check your connection or try again later.',
  TRY_LATER = 'Please, try again later.',
}

export default class CartAPI {
  public static async get(): Promise<CartResponse | Error> {
    const endpoint = `${CTP_API_URL}/${CTP_PROJECT_KEY}/me/carts/${TEMPORARY_CART_ID}`;
    const requestOptions = {
      method: 'GET',
    };

    return this.sendRequest(endpoint, requestOptions);
  }

  public static async updateQuantity(
    quantity: number,
    lineItemId: string,
    cartVersion: number
  ): Promise<CartResponse | Error> {
    const updateQuantityAction: LineItemChangeQuantityAction = {
      quantity,
      lineItemId,
      action: 'changeLineItemQuantity',
    };
    const bodyData: UpdateRequest = {
      version: cartVersion,
      actions: [updateQuantityAction],
    };

    const endpoint = `${CTP_API_URL}/${CTP_PROJECT_KEY}/me/carts/${TEMPORARY_CART_ID}`;
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyData),
    };

    return this.sendRequest(endpoint, requestOptions);
  }

  private static async sendRequest(endpoint: string, requestOptions: RequestInit): Promise<CartResponse | Error> {
    const tokens = await Tokens.getCustomerTokens();

    if (!tokens) {
      return new Error(ErrorMessages.SERVER);
    }

    const bearerToken = tokens.access_token;

    try {
      const response = await fetch(endpoint, {
        ...requestOptions,
        headers: {
          ...requestOptions.headers,
          Authorization: `Bearer ${bearerToken}`,
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
}
