import Authorization from '../../api/Authorization/Authorization';
import { ICustomerLoginResponse } from '../../types';

export default class Tokens {
  // Please use the Tokens.customerTokens object once a customer logged in successfully
  private static customerTokens: ICustomerLoginResponse;

  public static setCustomerTokens(tokens: ICustomerLoginResponse): void {
    Tokens.customerTokens = tokens;
    localStorage.setItem('expires_in', `${Date.now() + Tokens.customerTokens.expires_in}`);
    localStorage.setItem('refresh_token', `${Tokens.customerTokens.refresh_token}`);
    localStorage.setItem('scope', `${Tokens.customerTokens.scope}`);
    localStorage.setItem('token_type', `${Tokens.customerTokens.token_type}`);
  }

  public static async getCustomerTokens(): Promise<ICustomerLoginResponse> {
    if (
      (Number(localStorage.getItem('expires_in')) < Date.now() || !Tokens.customerTokens) &&
      localStorage.getItem('refresh_token')
    ) {
      await Tokens.refreshCustomerTokens();
    }
    return Tokens.customerTokens;
  }

  private static async refreshCustomerTokens(): Promise<void> {
    const newTokens = await Authorization.refreshCustomerToken(localStorage.getItem('refresh_token') as string);
    if ('access_token' in newTokens) {
      Tokens.customerTokens = {
        access_token: newTokens.access_token,
        expires_in: Number(localStorage.getItem('expires_in')),
        scope: localStorage.getItem('scope') as string,
        refresh_token: localStorage.getItem('refresh_token') as string,
        token_type: localStorage.getItem('token_type') as string,
      };
    }
  }

  public static deleteCustomerTokens(): void {
    Tokens.setCustomerTokens({
      access_token: '',
      expires_in: 0,
      scope: '',
      refresh_token: '',
      token_type: '',
    });
  }
}
