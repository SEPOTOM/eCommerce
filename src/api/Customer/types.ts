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

export interface EmailUpdateAction extends UpdateAction {
  email: string;
}

export interface PasswordData {
  version: number;
  currentPassword: string;
  newPassword: string;
}
