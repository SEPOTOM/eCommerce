/* eslint-disable import/no-cycle */
import { CTP_API_URL, CTP_PROJECT_KEY } from '../APIClients/JSNinjas-custom';
import Tokens from '../../components/Tokens/Tokens';
import { UpdateRequest, LineItemChangeQuantityAction, LineItemRemoveAction } from './types';
import { CartResponse, IError, CartsResponse, IAddLineItem, ICartTemplate } from '../../types';

enum ErrorMessages {
  SERVER = 'Failed to connect to the server. Please, check your connection or try again later.',
  TRY_LATER = 'Please, try again later.',
  NO_CART = 'Could not find the cart for the current customer. Please, try again later.',
}

export default class CartAPI {
  public static async get(): Promise<CartResponse | Error> {
    const endpoint = `${CTP_API_URL}/${CTP_PROJECT_KEY}/me/carts`;
    const requestOptions = {
      method: 'GET',
    };

    return this.sendRequest(endpoint, requestOptions);
  }

  public static async updateQuantity(
    quantity: number,
    lineItemId: string,
    cartVersion: number,
    cartId: string
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

    const endpoint = `${CTP_API_URL}/${CTP_PROJECT_KEY}/me/carts/${cartId}`;
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyData),
    };

    return this.sendRequest(endpoint, requestOptions);
  }

  public static async removeItem(
    lineItemId: string,
    cartVersion: number,
    cartId: string
  ): Promise<CartResponse | Error> {
    const removeItemAction: LineItemRemoveAction = {
      lineItemId,
      action: 'removeLineItem',
    };
    const bodyData: UpdateRequest = {
      version: cartVersion,
      actions: [removeItemAction],
    };

    const endpoint = `${CTP_API_URL}/${CTP_PROJECT_KEY}/me/carts/${cartId}`;
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
      const data: CartsResponse | CartResponse | IError = await response.json();

      if ('message' in data) {
        return new Error(`${data.message} ${ErrorMessages.TRY_LATER}`);
      }

      if ('results' in data && data.results[0]) {
        return data.results[0];
      }
      if ('results' in data) {
        return new Error(ErrorMessages.NO_CART);
      }

      return data;
    } catch (err) {
      return new Error(ErrorMessages.SERVER);
    }
  }

  public static async updateLineItem(cartID: string, payload: IAddLineItem): Promise<CartResponse | Error> {
    const endpoint = `${CTP_API_URL}/${CTP_PROJECT_KEY}/carts/${cartID}`;
    const tokens = await Tokens.getCustomerTokens();

    if (!tokens) {
      return new Error(ErrorMessages.SERVER);
    }

    const bearerToken = tokens.access_token;

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
        body: JSON.stringify(payload),
      });
      const data: CartResponse | Error = await response.json();

      return data;
    } catch (err) {
      return new Error(ErrorMessages.SERVER);
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

  public static async createCustomerCart(payload: ICartTemplate): Promise<CartResponse | Error> {
    const endpoint = `${CTP_API_URL}/${CTP_PROJECT_KEY}/me/carts`;
    const tokens = await Tokens.getCustomerTokens();
    const bearerToken = tokens.access_token;

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

  public static async getActiveCartVersion(): Promise<number> {
    const cart = await CartAPI.get();

    let cartVersion: number = 0;
    if ('version' in cart) {
      cartVersion = Number(cart.version);
    }

    return cartVersion;
  }
}
