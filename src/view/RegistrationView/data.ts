import { PatternAndMessage } from './types';

const US_POSTAL_CODE_REGEXP_STRING = '(^\\d{5}$)|(^\\d{5}-\\d{4}$)';
const UK_POSTAL_CODE_REGEXP_STRING =
  '(^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\\s?[0-9][A-Za-z]{2})$)';

const ErrorMessages = {
  EMAIL: 'The email must be in the format example@email.com',
  PASSWORD: 'Password is invalid',
  FIRST_NAME: 'First name is invalid',
  LAST_NAME: 'Last name is invalid',
  DATE: 'The date must be in the format MM/DD/YYYY',
  STREET: 'Street is invalid',
  CITY: 'City is invalid',
  POSTAL_CODES: 'Postal code is invalid',
};

const RegExps = {
  EMAIL: /^\S+@\S+\.\S+$/,
  PASSWORD: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?!.*\s)(.{8,})$/,
  LETTERS: /^[^\W\d_]+$/,
  DATE: /^[0-9]{1,2}\/[0-9]{2,}\/[0-9]{4,}$/,
  STREET: /^.+$/,
  POSTAL_CODES: new RegExp(`${US_POSTAL_CODE_REGEXP_STRING}|${UK_POSTAL_CODE_REGEXP_STRING}`),
};

export const Countries = {
  US: 'The United States',
  UK: 'The United Kingdom',
};

export const ValidationData: Record<string, PatternAndMessage[]> = {
  EMAIL: [[RegExps.EMAIL, ErrorMessages.EMAIL]],
  PASSWORD: [[RegExps.PASSWORD, ErrorMessages.PASSWORD]],
  FIRST_NAME: [[RegExps.LETTERS, ErrorMessages.FIRST_NAME]],
  LAST_NAME: [[RegExps.LETTERS, ErrorMessages.LAST_NAME]],
  DATE: [[RegExps.DATE, ErrorMessages.DATE]],
  STREET: [[RegExps.STREET, ErrorMessages.STREET]],
  CITY: [[RegExps.LETTERS, ErrorMessages.CITY]],
  POSTAL_CODES: [[RegExps.POSTAL_CODES, ErrorMessages.POSTAL_CODES]],
};
