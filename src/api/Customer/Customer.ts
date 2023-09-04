/* eslint-disable import/no-cycle */
import Tokens from '../../components/Tokens/Tokens';
import { CTP_API_URL, CTP_PROJECT_KEY } from '../APIClients/JSNinjas-custom';
import { CustomerDataResponse, IError, Address } from '../../types';
import {
  Action,
  EmailUpdateAction,
  FirstNameUpdateAction,
  LastNameUpdateAction,
  BirthDateUpdateAction,
  AddressAddAction,
  IdAddressAction,
  AddressUpdateAction,
  UpdateRequest,
  PasswordData,
} from './types';
import { Actions } from './data';

enum ErrorMessages {
  SERVER = 'Failed to connect to the server.',
  LOG_IN = 'Please, log in first.',
  TRY_LATER = 'Please, check your connection or try again later.',
}

enum ErrorsCodes {
  INVALID_CURRENT_PASSWORD = 'InvalidCurrentPassword',
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

  public updateAddresses(addresses: Address[]): Customer {
    addresses.forEach((address) => {
      const action: AddressUpdateAction = {
        address,
        addressId: `${address.id}`,
        action: Actions.CHANGE_ADDRESS,
      };

      this.actions.push(action);
    });

    return this;
  }

  public deleteAddresses(addresses: Address[]): Customer {
    addresses.forEach((address) => {
      const action: IdAddressAction = {
        addressId: `${address.id}`,
        action: Actions.REMOVE_ADDRESS,
      };

      this.actions.push(action);
    });

    return this;
  }

  public async addBillingAddresses(billingAddresses: Address[]): Promise<CustomerDataResponse | Error> {
    const billingActions = this.getAddressesActions(billingAddresses);
    const billingResponse = await this.sendUpdateRequest(billingActions);

    if (billingResponse instanceof Error) {
      return billingResponse;
    }

    const untypedBillingAddresses = this.getUntypedAddresses(billingResponse);
    const billingSetActions = untypedBillingAddresses.map((address) => {
      const action: IdAddressAction = {
        action: Actions.ADD_BILLING_ADDRESS,
        addressId: `${address.id}`,
      };

      return action;
    });

    const billingSetResponse = this.sendUpdateRequest(billingSetActions);

    if (billingSetResponse instanceof Error) {
      return billingSetResponse;
    }

    return billingSetResponse;
  }

  public async addShippingAddresses(shippingAddresses: Address[]): Promise<CustomerDataResponse | Error> {
    const shippingActions = this.getAddressesActions(shippingAddresses);
    const shippingResponse = await this.sendUpdateRequest(shippingActions);

    if (shippingResponse instanceof Error) {
      return shippingResponse;
    }

    const untypedShippingAddresses = this.getUntypedAddresses(shippingResponse);
    const shippingSetActions = untypedShippingAddresses.map((address) => {
      const action: IdAddressAction = {
        action: Actions.ADD_SHIPPING_ADDRESS,
        addressId: `${address.id}`,
      };

      return action;
    });

    const shippingSetResponse = this.sendUpdateRequest(shippingSetActions);

    if (shippingSetResponse instanceof Error) {
      return shippingSetResponse;
    }

    return shippingSetResponse;
  }

  public async sendUpdateRequest(actions = this.actions): Promise<CustomerDataResponse | Error> {
    try {
      const endpoint = `${CTP_API_URL}/${CTP_PROJECT_KEY}/me`;
      const bearerToken = (await Tokens.getCustomerTokens()).access_token;
      const bodyData: UpdateRequest = {
        actions,
        version: Customer.version,
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

  private getAddressesActions(addresses: Address[]): Action[] {
    return addresses.map((address) => {
      const action: AddressAddAction = {
        address,
        action: Actions.ADD_ADDRESS,
      };

      return action;
    });
  }

  private getUntypedAddresses(data: CustomerDataResponse): Address[] {
    return data.addresses.filter(
      (address) =>
        !data.shippingAddressIds.includes(`${address.id}`) && !data.billingAddressIds.includes(`${address.id}`)
    );
  }
}
