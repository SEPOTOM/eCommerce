import { InputOptions, PatternAndMessage } from '../../types';

export enum DataAttrs {
  ADDRESSES_LIST = 'data-addresses-list',
  ADDRESSES_TITLE = 'data-addresses-title',
  ERROR_TEXT = 'data-error-text',
  CANCEL_BUTTON = 'data-cancel-button',
  SAVE_BUTTON = 'data-save-button',
  EDIT_BUTTON = 'data-edit-button',
  INFO_BLOCK = 'data-info-block',
  EDIT_BLOCK = 'data-edit-block',
  ROW = 'data-row-profile',
  LABEL = 'data-label-profile',
}

export enum ParagraphLabels {
  FIRST_NAME = 'First name:',
  LAST_NAME = 'Last name:',
  BIRTH_DATE = 'Date of birth:',
}

export enum AddressLabels {
  STREET = 'Street:',
  CITY = 'City:',
  COUNTRY = 'Country:',
  CODE = 'Postal code:',
}

export enum AddressTypes {
  BILLING = 'billing',
  SHIPPING = 'shipping',
}

export const ValidationData: Record<string, PatternAndMessage[]> = {
  FIRST_NAME: [],
  LAST_NAME: [],
  DATE: [],
};

export const UserInfoInputsOptions: InputOptions[] = [
  { validationData: ValidationData.FIRST_NAME },
  { validationData: ValidationData.LAST_NAME },
  { validationData: ValidationData.DATE },
];
