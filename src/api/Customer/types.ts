import { UpdateActions } from './data';

export interface UpdateRequest {
  version: number;
  actions: UpdateAction[];
}

export interface UpdateAction {
  action: UpdateActions;
}

export interface FirstNameUpdateAction extends UpdateAction {
  firstName: string;
}

export interface LastNameUpdateAction extends UpdateAction {
  lastName: string;
}

export interface BirthDateUpdateAction extends UpdateAction {
  dateOfBirth: string;
}