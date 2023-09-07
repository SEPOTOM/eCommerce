import { CTP_API_URL, CTP_PROJECT_KEY } from '../APIClients/JSNinjas-custom';
import Tokens from '../../components/Tokens/Tokens';
import { CartResponse, IError } from '../../types';

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
