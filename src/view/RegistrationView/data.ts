import { PatternAndMessage } from './types';

const ErrorMessages = {
  EMAIL: 'The email must be in the format example@email.com',
  FIRST_NAME: 'First name is invalid',
  LAST_NAME: 'Last name is invalid',
  DATE: 'The date must be in the format MM/DD/YYYY',
  STREET: 'Street is invalid',
  CITY: 'City is invalid',
  POSTAL_CODES: 'Postal code is invalid',
  MIN_LENGTH: 'Must be at least 8 characters long',
  ONE_UPPERCASE: 'There must be at least one uppercase character (A-Z)',
  ONE_LOWERCASE: 'There must be at least one lowercase character (a-z)',
  ONE_DIGIT: 'There must be at least one digit',
  ONE_SPECIAL: 'There must be at least one special character (!@#$%^&*)',
  NO_EDGE_WHITESPACE: 'There should be no leading or trailing whitespace',
};

const RegExps = {
  EMAIL: /^\S+@\S+\.\S+$/,
  LETTERS: /^[^\W\d_]+$/,
  DATE: /^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4,}$/,
  STREET: /^.+$/,
  MIN_LENGTH: /.{8,}/,
  ONE_UPPERCASE: /[A-Z]/,
  ONE_LOWERCASE: /[a-z]/,
  ONE_DIGIT: /\d/,
  ONE_SPECIAL: /[!@#$%^&*]/,
  NO_EDGE_WHITESPACE: /^\S.*\S$/,
};

export const Countries = {
  US: 'The United States',
  UK: 'The United Kingdom',
};

export const ValidationData: Record<string, PatternAndMessage[]> = {
  EMAIL: [[RegExps.EMAIL, ErrorMessages.EMAIL]],
  PASSWORD: [
    [RegExps.MIN_LENGTH, ErrorMessages.MIN_LENGTH],
    [RegExps.ONE_UPPERCASE, ErrorMessages.ONE_UPPERCASE],
    [RegExps.ONE_LOWERCASE, ErrorMessages.ONE_LOWERCASE],
    [RegExps.ONE_DIGIT, ErrorMessages.ONE_DIGIT],
    [RegExps.ONE_SPECIAL, ErrorMessages.ONE_SPECIAL],
    [RegExps.NO_EDGE_WHITESPACE, ErrorMessages.NO_EDGE_WHITESPACE],
  ],
  FIRST_NAME: [[RegExps.LETTERS, ErrorMessages.FIRST_NAME]],
  LAST_NAME: [[RegExps.LETTERS, ErrorMessages.LAST_NAME]],
  DATE: [[RegExps.DATE, ErrorMessages.DATE]],
  STREET: [[RegExps.STREET, ErrorMessages.STREET]],
  CITY: [[RegExps.LETTERS, ErrorMessages.CITY]],
  POSTAL_CODES: [[RegExps.NO_EDGE_WHITESPACE, ErrorMessages.NO_EDGE_WHITESPACE]],
};

export const PostalCodeRegExps: Record<string, RegExp> = {
  US: /(^\d{5}$)|(^\d{5}-\d{4}$)/,
  UK: /(^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})$)/,
};

export const PostalCodeErrorMessages: Record<string, string> = {
  US: 'Enter the correct postal code for the United States',
  UK: 'Enter the correct postal code for the United Kingdom',
};
