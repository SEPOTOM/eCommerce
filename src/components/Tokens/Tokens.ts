import Authorization from '../../api/Authorization/Authorization';
import { ICustomerLoginResponse, TokenPayload } from '../../types';

export default class Tokens {
  // Please use the Tokens.customerTokens object once a customer logged in successfully
  private static customerTokens: ICustomerLoginResponse;

  public static setCustomerTokens(tokens: ICustomerLoginResponse): void {
    Tokens.customerTokens = tokens;
    localStorage.setItem(TokenPayload.EXPIRES_IN, `${Date.now() + Tokens.customerTokens.expires_in}`);
    localStorage.setItem(TokenPayload.REFRESH_TOKEN, `${Tokens.customerTokens.refresh_token}`);
    localStorage.setItem(TokenPayload.SCOPE, `${Tokens.customerTokens.scope}`);
    localStorage.setItem(TokenPayload.TOKEN_TYPE, `${Tokens.customerTokens.token_type}`);
  }

  public static async getCustomerTokens(): Promise<ICustomerLoginResponse> {
    if (
      (Number(localStorage.getItem(TokenPayload.EXPIRES_IN)) < Date.now() || !Tokens.customerTokens) &&
      localStorage.getItem(TokenPayload.REFRESH_TOKEN)
    ) {
      await Tokens.refreshCustomerTokens();
    }
    return Tokens.customerTokens;
  }

  private static async refreshCustomerTokens(): Promise<void> {
    const newTokens = await Authorization.refreshCustomerToken(
      localStorage.getItem(TokenPayload.REFRESH_TOKEN) as string
    );
    if ('access_token' in newTokens) {
      Tokens.customerTokens = {
        access_token: newTokens.access_token,
        expires_in: Number(localStorage.getItem(TokenPayload.EXPIRES_IN)),
        scope: localStorage.getItem(TokenPayload.SCOPE) as string,
        refresh_token: localStorage.getItem(TokenPayload.REFRESH_TOKEN) as string,
        token_type: localStorage.getItem(TokenPayload.TOKEN_TYPE) as string,
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
