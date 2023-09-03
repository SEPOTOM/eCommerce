import { Actions } from './data';

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
