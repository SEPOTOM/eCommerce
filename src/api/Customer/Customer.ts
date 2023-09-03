/* eslint-disable import/no-cycle */
import Tokens from '../../components/Tokens/Tokens';
import { CTP_API_URL, CTP_PROJECT_KEY } from '../APIClients/JSNinjas-custom';
import { CustomerDataResponse, IError } from '../../types';
import {
  UpdateAction,
  EmailUpdateAction,
  FirstNameUpdateAction,
  LastNameUpdateAction,
  BirthDateUpdateAction,
  UpdateRequest,
  PasswordData,
} from './types';
import { UpdateActions } from './data';

enum ErrorMessages {
  SERVER = 'Failed to connect to the server.',
  LOG_IN = 'Please, log in first.',
  TRY_LATER = 'Please, check your connection or try again later.',
}

enum ErrorsCodes {
  INVALID_CURRENT_PASSWORD = 'InvalidCurrentPassword',
}

export default class Customer {
  private updateActions: UpdateAction[] = [];

  private static version: number = 0;

  public static async getCurrentCustomer(): Promise<CustomerDataResponse | Error> {
    const endpoint = `${CTP_API_URL}/${CTP_PROJECT_KEY}/me`;
    const tokens = await Tokens.getCustomerTokens();

    if (!tokens) {
      return new Error(ErrorMessages.LOG_IN);
    }

    const bearerToken = tokens.access_token;

    try {
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      });
      const data: CustomerDataResponse = await response.json();

      if ('message' in data) {
        return new Error(ErrorMessages.LOG_IN);
      }

      this.setVersion(data.version);

      return data;
    } catch (err) {
      return new Error(`${ErrorMessages.SERVER} ${ErrorMessages.TRY_LATER}`);
    }
  }

  public static setVersion(version: number): void {
    this.version = version;
  }

  public static async changePassword(
    currentPassword: string,
    newPassword: string
  ): Promise<CustomerDataResponse | Error> {
    const tokens = await Tokens.getCustomerTokens();

    if (!tokens) {
      return new Error(ErrorMessages.LOG_IN);
    }

    const endpoint = `${CTP_API_URL}/${CTP_PROJECT_KEY}/me/password`;
    const bearerToken = tokens.access_token;
    const bodyData: PasswordData = { currentPassword, newPassword, version: this.version };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyData),
      });
      const data: CustomerDataResponse | IError = await response.json();

      if ('errors' in data) {
        return this.getError(data);
      }

      this.setVersion(data.version);

      return data;
    } catch (err) {
      return new Error(`${ErrorMessages.SERVER} ${ErrorMessages.TRY_LATER}`);
    }
  }

  public updateEmail(email: string): Customer {
    const action: EmailUpdateAction = {
      email,
      action: UpdateActions.EMAIL,
    };

    this.updateActions.push(action);

    return this;
  }

  public updateFirstName(firstName: string): Customer {
    const action: FirstNameUpdateAction = {
      firstName,
      action: UpdateActions.FIRST_NAME,
    };

    this.updateActions.push(action);

    return this;
  }

  public updateLastName(lastName: string): Customer {
    const action: LastNameUpdateAction = {
      lastName,
      action: UpdateActions.LAST_NAME,
    };

    this.updateActions.push(action);

    return this;
  }

  public updateBirthDate(formattedBirthDate: string): Customer {
    const action: BirthDateUpdateAction = {
      dateOfBirth: formattedBirthDate,
      action: UpdateActions.BIRTH_DATE,
    };

    this.updateActions.push(action);

    return this;
  }

  public async sendUpdateRequest(): Promise<CustomerDataResponse | Error> {
    try {
      const endpoint = `${CTP_API_URL}/${CTP_PROJECT_KEY}/me`;
      const bearerToken = (await Tokens.getCustomerTokens()).access_token;
      const bodyData: UpdateRequest = {
        version: Customer.version,
        actions: this.updateActions,
      };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyData),
      });
      const data: CustomerDataResponse | Error = await response.json();

      if ('message' in data) {
        return new Error(`${data.message} ${ErrorMessages.TRY_LATER}`);
      }

      Customer.setVersion(data.version);

      return data;
    } catch (err) {
      return new Error(`${ErrorMessages.SERVER} ${ErrorMessages.TRY_LATER}`);
    }
  }

  private static getError(data: IError): Error {
    const error = data.errors[0];

    if (error.code === ErrorsCodes.INVALID_CURRENT_PASSWORD) {
      return new Error(error.message);
    }

    return new Error(`${ErrorMessages.SERVER} ${ErrorMessages.TRY_LATER}`);
  }
}
