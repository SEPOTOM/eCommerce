export interface CustomerCredentials {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  addresses: Address[];
  shippingAddresses: number[];
  billingAddresses: number[];
}

export interface Address {
  country: string;
  streetName: string;
  postalCode: string;
  city: string;
}

interface IClientLoginResponse {
  access_token: string;
  expires_in: number;
  scope: string;
  token_type: string;
}

interface ICustomerLoginResponse {
  access_token: string;
  expires_in: number;
  scope: string;
  refresh_token: string;
  token_type: string;
}

interface IErrorItems {
  code: string;
  message: string;
}

interface IError {
  statusCode: number;
  message: string;
  errors: IErrorItems[];
  error: string;
  error_description: string;
}

enum TokenPayload {
  EXPIRES_IN = 'expires_in',
  REFRESH_TOKEN = 'refresh_token',
  SCOPE = 'scope',
  TOKEN_TYPE = 'token_type',
}

export { IClientLoginResponse, ICustomerLoginResponse, IError, TokenPayload };

export type EventCallback = (e: Event) => void;
