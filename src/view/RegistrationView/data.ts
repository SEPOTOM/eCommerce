import { PatternAndMessage, InputOptions } from './types';

const ErrorMessages = {
  EMAIL: 'Incorrect format (e.g., user@example.com)',
  DATE: 'Incorrect format (MM/DD/YYYY)',
  MIN_LENGTH: 'Too short: at least 8 characters',
  ONE_UPPERCASE: 'No letter, uppercase',
  ONE_LOWERCASE: 'No letter, lowercase',
  ONE_DIGIT: 'Need at least 1 digit',
  ONE_SPECIAL: 'Add special character !@#$%^&*',
  NO_EDGE_WHITESPACE: 'Do not use leading or trailing whitespace',
  ONE_AT_SYMBOL: 'Missed "@" symbol',
  DOMAIN: 'Wrong domain (e.g., example.com)',
  ONE_SYMBOL: 'Too short: at least 1 characters',
  LETTERS: 'Use only Latin letters',
  WORDS: 'Use only Latin letters or whitespace',
};

const RegExps = {
  EMAIL: /^\S+@\S+\.\S+$/,
  LETTERS: /^[^\W\d_]+$/,
  WORDS: /^[A-Za-z ]+$/,
  DATE: /^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4,}$/,
  STREET: /^.+$/,
  MIN_LENGTH: /.{8,}/,
  ONE_UPPERCASE: /[A-Z]/,
  ONE_LOWERCASE: /[a-z]/,
  ONE_DIGIT: /\d/,
  ONE_SPECIAL: /[!@#$%^&*]/,
  NO_EDGE_WHITESPACE: /^(?!\s).*(?<!\s)$/,
  AT_SYMBOL: /@/,
  DOMAIN: /@[^\s@]+\.[^\s@]+/,
  ONE_SYMBOL: /.+/,
};

enum InputTypes {
  EMAIL = 'email',
  PASSWORD = 'password',
}

export const DEFAULT_COUNTRY = 'US';

export const Countries = {
  US: 'The United States',
  UK: 'The United Kingdom',
};

export const ValidationData: Record<string, PatternAndMessage[]> = {
  EMAIL: [
    [RegExps.AT_SYMBOL, ErrorMessages.ONE_AT_SYMBOL],
    [RegExps.DOMAIN, ErrorMessages.DOMAIN],
    [RegExps.NO_EDGE_WHITESPACE, ErrorMessages.NO_EDGE_WHITESPACE],
    [RegExps.EMAIL, ErrorMessages.EMAIL],
  ],
  PASSWORD: [
    [RegExps.MIN_LENGTH, ErrorMessages.MIN_LENGTH],
    [RegExps.ONE_UPPERCASE, ErrorMessages.ONE_UPPERCASE],
    [RegExps.ONE_LOWERCASE, ErrorMessages.ONE_LOWERCASE],
    [RegExps.ONE_DIGIT, ErrorMessages.ONE_DIGIT],
    [RegExps.ONE_SPECIAL, ErrorMessages.ONE_SPECIAL],
    [RegExps.NO_EDGE_WHITESPACE, ErrorMessages.NO_EDGE_WHITESPACE],
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
  STREET: [
    [RegExps.ONE_SYMBOL, ErrorMessages.ONE_SYMBOL],
    [RegExps.NO_EDGE_WHITESPACE, ErrorMessages.NO_EDGE_WHITESPACE],
  ],
  CITY: [
    [RegExps.ONE_SYMBOL, ErrorMessages.ONE_SYMBOL],
    [RegExps.NO_EDGE_WHITESPACE, ErrorMessages.NO_EDGE_WHITESPACE],
    [RegExps.WORDS, ErrorMessages.WORDS],
  ],
  POSTAL_CODES: [[RegExps.NO_EDGE_WHITESPACE, ErrorMessages.NO_EDGE_WHITESPACE]],
};

export const PostalCodeRegExps: Record<string, RegExp> = {
  US: /(^\d{5}$)|(^\d{5}-\d{4}$)/,
  UK: /(^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})$)/,
};

export const PostalCodeErrorMessages: Record<string, string> = {
  US: 'Incorrect format (e.g., 90210)',
  UK: 'Incorrect format (e.g., SW1 2AA)',
};

export const UserInfoInputsOptions: InputOptions[] = [
  { validationData: ValidationData.EMAIL },
  { validationData: ValidationData.PASSWORD, type: InputTypes.PASSWORD },
  { validationData: ValidationData.FIRST_NAME },
  { validationData: ValidationData.LAST_NAME },
  { validationData: ValidationData.DATE },
];

export const AddressInputsOptions: InputOptions[] = [
  { validationData: ValidationData.STREET },
  { validationData: ValidationData.CITY },
  { validationData: ValidationData.POSTAL_CODES },
];

export enum DataAttrs {
  TITLE = 'data-title-reg',
  ROW = 'data-row-reg',
  LABEL = 'data-label-reg',
  BUTTON = 'data-button-reg',
  COUNTRIES_ROW = 'data-countries-row-reg',
  DEFAULT_ADDRESS = 'data-default-address-reg',
}

export enum FormErrorMessages {
  INVALID = 'Form is invalid!',
}
