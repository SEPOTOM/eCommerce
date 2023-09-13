import { CTP_API_URL, CTP_PROJECT_KEY } from '../APIClients/JSNinjas-ReadOnly';
import Tokens from '../../components/Tokens/Tokens';
import { DiscountCodesResponse, DiscountCodeResponse, IError } from '../../types';

enum ErrorMessages {
  SERVER = 'Failed to connect to the server. Please, check your connection or try again later.',
  TRY_LATER = 'Please, try again later.',
}

export default class DiscountAPI {
  public static async getCodes(): Promise<DiscountCodeResponse[] | Error> {
    const bearerToken = await Tokens.getClientAccessToken();
    const endpoint = `${CTP_API_URL}/${CTP_PROJECT_KEY}/discount-codes`;

    try {
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      });
      const data: DiscountCodesResponse | IError = await response.json();

      if ('message' in data) {
        return new Error(`${data.message} ${ErrorMessages.TRY_LATER}`);
      }

      return data.results;
    } catch (err) {
      return new Error(ErrorMessages.SERVER);
    }
  }
}
