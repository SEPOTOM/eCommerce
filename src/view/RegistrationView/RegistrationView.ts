import { EventCallback } from './types';

const EMAIL_REGEXP = /^\S+@\S+\.\S+$/;
const PASSWORD_REGEXP = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?!.*\s)(.{8,})$/;
const LETTERS_REGEXP = /^[^\W\d_]+$/;
const DATE_REGEXP = /^[0-9]{1,2}\/[0-9]{2,}\/[0-9]{4,}$/;
const STREET_REGEXP = /^.+$/;
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

    const emailRow = RegistrationView.buildRowView(LabelTexts.EMAIL, InputTypes.EMAIL, EMAIL_REGEXP, LabelTexts.EMAIL);
    rows.push(emailRow);

    const passwordRow = RegistrationView.buildRowView(
      LabelTexts.PASSWORD,
      InputTypes.PASSWORD,
      PASSWORD_REGEXP,
      LabelTexts.PASSWORD
    );
    rows.push(passwordRow);

    const firstNameRow = RegistrationView.buildRowView(
      LabelTexts.FIRST_NAME,
      InputTypes.TEXT,
      LETTERS_REGEXP,
      LabelTexts.FIRST_NAME
    );
    rows.push(firstNameRow);

    const lastNameRow = RegistrationView.buildRowView(
      LabelTexts.LAST_NAME,
      InputTypes.TEXT,
      LETTERS_REGEXP,
      LabelTexts.LAST_NAME
    );
    rows.push(lastNameRow);

    const birthDateRow = RegistrationView.buildRowView(
      LabelTexts.BIRTH_DATE,
      InputTypes.TEXT,
      DATE_REGEXP,
      LabelTexts.BIRTH_DATE
    );
    rows.push(birthDateRow);

    return rows;
  }

  private static buildAddressRows(): HTMLElement[] {
    const rows: HTMLElement[] = [];

    const streetRow = RegistrationView.buildRowView(
      LabelTexts.STREET,
      InputTypes.TEXT,
      STREET_REGEXP,
      LabelTexts.STREET
    );
    rows.push(streetRow);

    const cityRow = RegistrationView.buildRowView(LabelTexts.CITY, InputTypes.TEXT, LETTERS_REGEXP, LabelTexts.CITY);
    rows.push(cityRow);

    return rows;
  }

  private static buildRowView(
    labelText: LabelTexts,
    inputType: InputTypes,
    regExp: RegExp,
    fieldName: string
  ): HTMLElement {
    const row = document.createElement('div');

    const label = RegistrationView.buildLabelView(labelText, inputType, regExp, fieldName);
    row.append(label);

    return row;
  }

  private static buildLabelView(
    text: LabelTexts,
    inputType: InputTypes,
    regExp: RegExp,
    fieldName: string
  ): HTMLLabelElement {
    const label = document.createElement('label');
    label.textContent = text;

    const input = RegistrationView.buildInputView(inputType, regExp, fieldName);
    label.append(input);

    return label;
  }

  private static buildInputView(type: InputTypes, regExp: RegExp, fieldName: string): HTMLInputElement {
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
