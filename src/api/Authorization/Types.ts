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

interface IError {
  statusCode: number;
  message: string;
  errors: [];
  error: string;
  error_description: string;
}

export { IClientLoginResponse, ICustomerLoginResponse, IError };
