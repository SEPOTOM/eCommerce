import { EventCallback, InputOptions } from './types';

const EMAIL_REGEXP = /^\S+@\S+\.\S+$/;
const PASSWORD_REGEXP = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?!.*\s)(.{8,})$/;
const LETTERS_REGEXP = /^[^\W\d_]+$/;
const DATE_REGEXP = /^[0-9]{1,2}\/[0-9]{2,}\/[0-9]{4,}$/;
const STREET_REGEXP = /^.+$/;
const US_POSTAL_CODE_REGEXP_STRING = '(^\\d{5}$)|(^\\d{5}-\\d{4}$)';
const UK_POSTAL_CODE_REGEXP_STRING =
  '(^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\\s?[0-9][A-Za-z]{2})$)';
const POSTAL_CODES_REGEXP = new RegExp(`${US_POSTAL_CODE_REGEXP_STRING}|${UK_POSTAL_CODE_REGEXP_STRING}`);
const MONTHS_IN_YEAR = 12;
const MAX_DAYS_IN_MONTH = 31;
const MIN_USER_AGE = 18;
const MS_IN_YEAR = 31536000000;

enum LabelTexts {
  EMAIL = 'Email',
  PASSWORD = 'Password',
  FIRST_NAME = 'First name',
  LAST_NAME = 'Last name',
  BIRTH_DATE = 'Date of birth',
  STREET = 'Street',
  CITY = 'City',
  POSTAL_CODE = 'Postal code',
}

enum InputTypes {
  EMAIL = 'email',
  PASSWORD = 'password',
  TEXT = 'text',
}

export default class RegistrationView {
  public static buildRegistrationView(): HTMLFormElement {
    const form = document.createElement('form');

    const userInfoRows = RegistrationView.buildUserInfoRows();
    userInfoRows.forEach((userInfoRow) => form.append(userInfoRow));

    const addressRows = RegistrationView.buildAddressRows();
    addressRows.forEach((addressRow) => form.append(addressRow));

    return form;
  }

  private static buildUserInfoRows(): HTMLElement[] {
    const rows: HTMLElement[] = [];

    const emailRow = RegistrationView.buildInputRowView(LabelTexts.EMAIL, {
      type: InputTypes.EMAIL,
      regExp: EMAIL_REGEXP,
      fieldName: LabelTexts.EMAIL,
    });
    rows.push(emailRow);

    const passwordRow = RegistrationView.buildInputRowView(LabelTexts.PASSWORD, {
      type: InputTypes.PASSWORD,
      regExp: PASSWORD_REGEXP,
      fieldName: LabelTexts.PASSWORD,
    });
    rows.push(passwordRow);

    const firstNameRow = RegistrationView.buildInputRowView(LabelTexts.FIRST_NAME, {
      type: InputTypes.TEXT,
      regExp: LETTERS_REGEXP,
      fieldName: LabelTexts.FIRST_NAME,
    });
    rows.push(firstNameRow);

    const lastNameRow = RegistrationView.buildInputRowView(LabelTexts.LAST_NAME, {
      type: InputTypes.TEXT,
      regExp: LETTERS_REGEXP,
      fieldName: LabelTexts.LAST_NAME,
    });
    rows.push(lastNameRow);

    const birthDateRow = RegistrationView.buildInputRowView(LabelTexts.BIRTH_DATE, {
      type: InputTypes.TEXT,
      regExp: DATE_REGEXP,
      fieldName: LabelTexts.BIRTH_DATE,
    });
    rows.push(birthDateRow);

    return rows;
  }

  private static buildAddressRows(): HTMLElement[] {
    const rows: HTMLElement[] = [];

    const streetRow = RegistrationView.buildInputRowView(LabelTexts.STREET, {
      type: InputTypes.TEXT,
      regExp: STREET_REGEXP,
      fieldName: LabelTexts.STREET,
    });
    rows.push(streetRow);

    const cityRow = RegistrationView.buildInputRowView(LabelTexts.CITY, {
      type: InputTypes.TEXT,
      regExp: LETTERS_REGEXP,
      fieldName: LabelTexts.CITY,
    });
    rows.push(cityRow);

    const postalCodeRow = RegistrationView.buildInputRowView(LabelTexts.POSTAL_CODE, {
      type: InputTypes.TEXT,
      regExp: POSTAL_CODES_REGEXP,
      fieldName: LabelTexts.POSTAL_CODE,
    });
    rows.push(postalCodeRow);

    return rows;
  }

  private static buildInputRowView(labelText: LabelTexts, inputOptions: InputOptions): HTMLElement {
    const row = document.createElement('div');

    const input = RegistrationView.buildInputView(inputOptions);

    const label = RegistrationView.buildLabelView(labelText, input);
    row.append(label);

    return row;
  }

  private static buildLabelView(text: LabelTexts, widget: HTMLElement): HTMLLabelElement {
    const label = document.createElement('label');
    label.textContent = text;

    label.append(widget);

    return label;
  }

  private static buildInputView({ type, regExp, fieldName }: InputOptions): HTMLInputElement {
    const input = document.createElement('input');
    input.type = type;
    input.required = true;

    let callback: EventCallback | null = null;

    if (fieldName === LabelTexts.BIRTH_DATE) {
      callback = (e: Event): void => {
        if (e.currentTarget instanceof HTMLInputElement) {
          RegistrationView.validateDateInput(input, regExp, fieldName);
        }
      };
    } else {
      callback = (e: Event): void => {
        if (e.currentTarget instanceof HTMLInputElement) {
          RegistrationView.validateInput(input, regExp, fieldName);
        }
      };
    }

    if (callback) {
      input.addEventListener('change', callback);
    }

    return input;
  }

  private static validateInput(input: HTMLInputElement, regExp: RegExp, fieldName: string): void {
    if (regExp.test(input.value)) {
      console.log(`${fieldName} is valid!`);
    } else {
      console.error(`${fieldName} is invalid!`);
    }
  }

  private static validateDateInput(input: HTMLInputElement, regExp: RegExp, fieldName: string): void {
    if (!regExp.test(input.value)) {
      console.error(`${fieldName} must be in the format MM/DD/YYYY!`);
      return;
    }

    const [month, day, year] = input.value.split('/').map((str: string) => Number(str));

    if (month > MONTHS_IN_YEAR || day > MAX_DAYS_IN_MONTH) {
      console.error(`${fieldName} is invalid!`);
      return;
    }

    const userBirthDateTimestamp = new Date(year, month, day).getTime();
    const currentDateTimestamp = Date.now();
    const userAge = (currentDateTimestamp - userBirthDateTimestamp) / MS_IN_YEAR;

    if (userAge > MIN_USER_AGE) {
      console.log(`${fieldName} is valid!`);
    } else {
      console.error(`Your age must be over ${MIN_USER_AGE} years old`);
    }
  }
}
