/* eslint-disable import/no-cycle */
import { CTP_API_URL, CTP_PROJECT_KEY } from '../APIClients/JSNinjas-custom';
import Tokens from '../../components/Tokens/Tokens';
import { UpdateRequest, LineItemChangeQuantityAction, LineItemRemoveAction, AddDiscountCodeAction } from './types';
import { GlobalErrorMessages } from '../../data/errors';
import { CartResponse, IError, CartsResponse, IAddLineItem, ICartTemplate } from '../../types';

enum ErrorMessages {
  SERVER = 'Operation error. Please, try later.',
  TRY_LATER = 'Please, try again later.',
  LOG_IN = 'Please, login to get to a cart.',
  WRONG_PROMO = 'Wrong promo code.',
}

enum ErrorCodes {
  WRONG_PROMO = 'DiscountCodeNonApplicable',
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

  public static async updateLineItem(cartID: string, payload: IAddLineItem): Promise<CartResponse | Error> {
    const endpoint = `${CTP_API_URL}/${CTP_PROJECT_KEY}/carts/${cartID}`;
    const requestOptions = {
      method: 'POST',
      headers: {},
      body: JSON.stringify(payload),
    };

    return CartAPI.sendRequest(endpoint, requestOptions);
  }

  public static async clearCart(
    itemsIds: string[],
    cartId: string,
    cartVersion: number
  ): Promise<CartResponse | Error> {
    const removeItemsActions: LineItemRemoveAction[] = itemsIds.map((itemId) => ({
      action: 'removeLineItem',
      lineItemId: itemId,
    }));
    const bodyData: UpdateRequest = {
      version: cartVersion,
      actions: removeItemsActions,
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

  public static async addPromoCode(
    promoCode: string,
    cartId: string,
    cartVersion: number
  ): Promise<CartResponse | Error> {
    const addCodeAction: AddDiscountCodeAction = {
      action: 'addDiscountCode',
      code: promoCode,
    };
    const bodyData: UpdateRequest = {
      version: cartVersion,
      actions: [addCodeAction],
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

  public static async createCustomerCart(payload: ICartTemplate): Promise<CartResponse | Error> {
    const endpoint = `${CTP_API_URL}/${CTP_PROJECT_KEY}/me/carts`;

    const requestOptions = {
      method: 'POST',
      headers: {},
      body: JSON.stringify(payload),
    };

    return CartAPI.sendRequest(endpoint, requestOptions);
  }

  public static async getCartByID(id: string): Promise<CartResponse | Error> {
    const endpoint = `${CTP_API_URL}/${CTP_PROJECT_KEY}/me/carts/${id}`;

    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };

    return CartAPI.sendRequest(endpoint, requestOptions);
  }

  public static async getActiveCartVersion(): Promise<number> {
    const cart = await CartAPI.get();

    let cartVersion: number = 0;
    if ('version' in cart) {
      cartVersion = Number(cart.version);
    }

    return cartVersion;
  }

  private static async sendRequest(endpoint: string, requestOptions: RequestInit): Promise<CartResponse | Error> {
    const tokens = await Tokens.getCustomerTokens();

    if (!tokens || !tokens.access_token) {
      return new Error(ErrorMessages.LOG_IN);
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
        return this.defineError(data);
      }

      if ('results' in data && data.results[0]) {
        return data.results[0];
      }
      if ('results' in data) {
        return new Error(GlobalErrorMessages.NO_CART);
      }

      return data;
    } catch (err) {
      return new Error(ErrorMessages.SERVER);
    }
  }

  private static defineError(error: IError): Error {
    if (error.errors[0].code === ErrorCodes.WRONG_PROMO) {
      return new Error(ErrorMessages.WRONG_PROMO);
    }

    return new Error(`${error.message} ${ErrorMessages.TRY_LATER}`);
  }
}
