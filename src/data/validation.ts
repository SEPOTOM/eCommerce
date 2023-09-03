export const ErrorMessages = {
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

export const RegExps = {
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

export enum InputTypes {
  EMAIL = 'email',
  PASSWORD = 'password',
}
