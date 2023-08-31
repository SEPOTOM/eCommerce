/* eslint-disable import/no-cycle */
import Tokens from '../../components/Tokens/Tokens';
import { CTP_API_URL, CTP_PROJECT_KEY } from '../APIClients/JSNinjas-custom';
import { CustomerDataResponse } from '../../types';
import {
  UpdateAction,
  FirstNameUpdateAction,
  LastNameUpdateAction,
  BirthDateUpdateAction,
  UpdateRequest,
} from './types';
import { UpdateActions } from './data';

enum ErrorMessages {
  NO_CUSTOMER = 'The customer with the given ID was not found',
  SERVER = 'Failed to connect to the server',
  TRY_LATER = 'Please, try again later.',
}

export default class Customer {
  private updateActions: UpdateAction[] = [];

  private static version: number = 0;

  public static async getCurrentCustomer(): Promise<CustomerDataResponse | Error> {
    try {
      const endpoint = `${CTP_API_URL}/${CTP_PROJECT_KEY}/me`;
      const bearerToken = (await Tokens.getCustomerTokens()).access_token;

      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      });
      const data: CustomerDataResponse = await response.json();

      if ('message' in data) {
        return new Error(ErrorMessages.NO_CUSTOMER);
      }

      this.setVersion(data.version);

      return data;
    } catch (err) {
      return new Error(ErrorMessages.SERVER);
    }
  }

  public static setVersion(version: number): void {
    this.version = version;
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
        return new Error(`${data.message}. ${ErrorMessages.TRY_LATER}`);
      }

      Customer.setVersion(data.version);

      return data;
    } catch (err) {
      return new Error(ErrorMessages.SERVER);
    }
  }
}
