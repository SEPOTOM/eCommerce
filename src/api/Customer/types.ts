import { Actions } from './data';
import { Address } from '../../types';

export interface UpdateRequest {
  version: number;
  actions: Action[];
}

export interface Action {
  action: Actions;
}

export interface FirstNameUpdateAction extends Action {
  firstName: string;
}

export interface LastNameUpdateAction extends Action {
  lastName: string;
}

export interface BirthDateUpdateAction extends Action {
  dateOfBirth: string;
}

export interface EmailUpdateAction extends Action {
  email: string;
}

export interface PasswordData {
  version: number;
  currentPassword: string;
  newPassword: string;
}

export interface AddressAddAction extends Action {
  address: Address;
}

export interface IdAddressAction extends Action {
  addressId: string;
}

export interface AddressUpdateAction extends Action {
  address: Address;
  addressId: string;
}
