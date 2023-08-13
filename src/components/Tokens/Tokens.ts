import Authorization from '../../api/Authorization/Authorization';
import { ICustomerLoginResponse } from '../../api/Authorization/Types';

export default class Tokens {
  // Please use the Tokens.customerTokens object once a customer logged in successfully
  private static customerTokens: ICustomerLoginResponse;

  public static setCustomerTokens(tokens: ICustomerLoginResponse): void {
    Tokens.customerTokens = tokens;
    localStorage.setItem('expires_in', `${Date.now() + Tokens.customerTokens.expires_in}`);
    localStorage.setItem('refresh_token', `${Tokens.customerTokens.refresh_token}`);
  }

  public static async getCustomerTokens(): Promise<ICustomerLoginResponse> {
    if (Number(localStorage.getItem('expires_in')) < Date.now()) {
      await Tokens.refreshCustomerTokens();
    }
    return Tokens.customerTokens;
  }

  public static async refreshCustomerTokens() {
    const newTokens = await Authorization.refreshCustomerToken(Tokens.customerTokens.refresh_token);
    if ('access_token' in newTokens) {
      Tokens.setCustomerTokens(newTokens);
    }
  }
}
