const US_POSTAL_CODE_REGEXP_STRING = '(^\\d{5}$)|(^\\d{5}-\\d{4}$)';
const UK_POSTAL_CODE_REGEXP_STRING =
  '(^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\\s?[0-9][A-Za-z]{2})$)';

export const RegExps = {
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
