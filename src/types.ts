export interface CustomerCredentials {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  dateOfBirth: string;
  addresses: Address[];
  shippingAddresses: number[];
  billingAddresses: number[];
  defaultShippingAddress?: number;
  defaultBillingAddress?: number;
}

export interface Address {
  country: string;
  streetName: string;
  postalCode: string;
  city: string;
  id?: string;
}

export interface CustomerResponse {
  customer: CustomerDataResponse;
}

export interface CustomerDataResponse {
  addresses: Address[];
  authenticationMode: string;
  billingAddressIds: string[];
  createdAt: string;
  createdBy: CreatedOrModifiedBy;
  email: string;
  firstName: string;
  id: string;
  isEmailVerified: boolean;
  lastMessageSequenceNumber: number;
  lastModifiedAt: string;
  lastModifiedBy: CreatedOrModifiedBy;
  lastName: string;
  middleName: string;
  password: string;
  shippingAddressIds: string[];
  stores: [];
  title: string;
  version: number;
  versionModifiedAt: string;
  dateOfBirth?: string;
  defaultBillingAddressId?: string;
  defaultShippingAddressId?: string;
}

export interface CreatedOrModifiedBy {
  isPlatformClient: boolean;
  clientId?: string;
  user?: {
    id: string;
    typeId: string;
  };
}

export interface RegErrorResponse {
  errors: RegError[];
  message: string;
  statusCode: number;
}

export interface RegError {
  code: string;
  message: string;
  detailedErrorMessage?: string;
  field?: string;
}

export interface ResponseInfo {
  ok: boolean;
  message: string;
}

export interface AlpineRouter {
  isCustomerLogin: boolean;
  init(): void;
  route(event: Event): void;
  logout(): void;
  handleLocation(): void;
  checkCustomerLogin(): void;
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
