/* eslint-disable import/no-cycle */
import Tokens from '../../components/Tokens/Tokens';
import { CTP_API_URL, CTP_PROJECT_KEY } from '../APIClients/JSNinjas-custom';
import { CustomerDataResponse } from '../../types';
import {
  Action,
  EmailUpdateAction,
  FirstNameUpdateAction,
  LastNameUpdateAction,
  BirthDateUpdateAction,
  UpdateRequest,
} from './types';
import { Actions } from './data';

enum ErrorMessages {
  SERVER = 'Failed to connect to the server.',
  LOG_IN = 'Please, log in first.',
  TRY_LATER = 'Please, check your connection or try again later.',
}

export default class Customer {
  private actions: Action[] = [];

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

  public updateEmail(email: string): Customer {
    const action: EmailUpdateAction = {
      email,
      action: Actions.EMAIL,
    };

    this.actions.push(action);

    return this;
  }

  public updateFirstName(firstName: string): Customer {
    const action: FirstNameUpdateAction = {
      firstName,
      action: Actions.FIRST_NAME,
    };

    this.actions.push(action);

    return this;
  }

  public updateLastName(lastName: string): Customer {
    const action: LastNameUpdateAction = {
      lastName,
      action: Actions.LAST_NAME,
    };

    this.actions.push(action);

    return this;
  }

  public updateBirthDate(formattedBirthDate: string): Customer {
    const action: BirthDateUpdateAction = {
      dateOfBirth: formattedBirthDate,
      action: Actions.BIRTH_DATE,
    };

    this.actions.push(action);

    return this;
  }

  public async sendUpdateRequest(): Promise<CustomerDataResponse | Error> {
    try {
      const endpoint = `${CTP_API_URL}/${CTP_PROJECT_KEY}/me`;
      const bearerToken = (await Tokens.getCustomerTokens()).access_token;
      const bodyData: UpdateRequest = {
        version: Customer.version,
        actions: this.actions,
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
}
