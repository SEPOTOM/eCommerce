import { InputOptions, PatternAndMessage } from '../../types';
import { RegExps, ErrorMessages } from '../../data/validation';

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
  VALID = 'data-valid',
}

export enum ParagraphLabels {
  EMAIL = 'Email:',
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
  EMAIL: [
    [RegExps.AT_SYMBOL, ErrorMessages.ONE_AT_SYMBOL],
    [RegExps.DOMAIN, ErrorMessages.DOMAIN],
    [RegExps.NO_EDGE_WHITESPACE, ErrorMessages.NO_EDGE_WHITESPACE],
    [RegExps.EMAIL, ErrorMessages.EMAIL],
  ],
  FIRST_NAME: [
    [RegExps.ONE_SYMBOL, ErrorMessages.ONE_SYMBOL],
    [RegExps.NO_EDGE_WHITESPACE, ErrorMessages.NO_EDGE_WHITESPACE],
    [RegExps.LETTERS, ErrorMessages.LETTERS],
  ],
  LAST_NAME: [
    [RegExps.ONE_SYMBOL, ErrorMessages.ONE_SYMBOL],
    [RegExps.NO_EDGE_WHITESPACE, ErrorMessages.NO_EDGE_WHITESPACE],
    [RegExps.LETTERS, ErrorMessages.LETTERS],
  ],
  DATE: [
    [RegExps.DATE, ErrorMessages.DATE],
    [RegExps.NO_EDGE_WHITESPACE, ErrorMessages.NO_EDGE_WHITESPACE],
  ],
};

export const UserInfoInputsOptions: InputOptions[] = [
  { validationData: ValidationData.EMAIL },
  { validationData: ValidationData.FIRST_NAME },
  { validationData: ValidationData.LAST_NAME },
  { validationData: ValidationData.DATE },
];

export const BIRTH_DATE_INPUT_INDEX = 3;
