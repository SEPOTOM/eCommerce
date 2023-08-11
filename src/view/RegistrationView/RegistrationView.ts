import htmlToElement from '../../utils/htmlToElement';
import SimpleInputView from './InputView/SimpleInputView/SimpleInputView';
import DateInputView from './InputView/DateInputView/DateInputView';
import SelectView from './SelectView/SelectView';
import { InputOptions } from './types';
import HTML from './RegistrationView.html';

const EMAIL_REGEXP = /^\S+@\S+\.\S+$/;
const PASSWORD_REGEXP = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?!.*\s)(.{8,})$/;
const LETTERS_REGEXP = /^[^\W\d_]+$/;
const DATE_REGEXP = /^[0-9]{1,2}\/[0-9]{2,}\/[0-9]{4,}$/;
const STREET_REGEXP = /^.+$/;
const US_POSTAL_CODE_REGEXP_STRING = '(^\\d{5}$)|(^\\d{5}-\\d{4}$)';
const UK_POSTAL_CODE_REGEXP_STRING =
  '(^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\\s?[0-9][A-Za-z]{2})$)';
const POSTAL_CODES_REGEXP = new RegExp(`${US_POSTAL_CODE_REGEXP_STRING}|${UK_POSTAL_CODE_REGEXP_STRING}`);
const BIRTH_DATE_INPUT_INDEX = 4;
const Countries = {
  US: 'The United States',
  UK: 'The United Kingdom',
};

enum InputTypes {
  EMAIL = 'email',
  PASSWORD = 'password',
}

enum ClassNames {
  FORM = 'reg-form',
  LABEL = 'reg-form__label',
  BUTTON = 'reg-form__button',
  ROW = 'reg-form__row',
}

const inputOptions: InputOptions[] = [
  { regExp: EMAIL_REGEXP, type: InputTypes.EMAIL },
  { regExp: PASSWORD_REGEXP, type: InputTypes.PASSWORD },
  { regExp: LETTERS_REGEXP },
  { regExp: LETTERS_REGEXP },
  { regExp: DATE_REGEXP },
  { regExp: STREET_REGEXP },
  { regExp: LETTERS_REGEXP },
  { regExp: POSTAL_CODES_REGEXP },
];

export default class RegistrationView {
  private form = htmlToElement<HTMLFormElement>(HTML) || document.createElement('form');

  public buildRegistrationView(): HTMLFormElement {
    const rows = this.form.querySelectorAll(`.${ClassNames.ROW}`);

    RegistrationView.configureSelect(rows);
    this.configureInputs(rows);
    this.configureButton();

    return this.form;
  }

  private configureInputs(rows: NodeListOf<Element>): void {
    const labels = this.form.querySelectorAll(`.${ClassNames.LABEL}`);

    inputOptions.forEach((inputOption, index) => {
      const localInputOption = inputOption;

      localInputOption.id = labels[index].getAttribute('for') || '';

      let input: HTMLInputElement | null = null;

      if (index === BIRTH_DATE_INPUT_INDEX) {
        input = new DateInputView().buildInputView(localInputOption);
      } else {
        input = new SimpleInputView().buildInputView(localInputOption);
      }

      rows[index].append(input);
    });
  }

  private static configureSelect(rows: NodeListOf<Element>): void {
    const lastRow = rows[rows.length - 1];
    const label = lastRow.querySelector(`.${ClassNames.LABEL}`);
    const id = label?.getAttribute('for') || '';

    const select = new SelectView().buildSelectView(Countries, id);
    lastRow.append(select);
  }

  private configureButton(): void {
    const button = this.form.querySelector(`.${ClassNames.BUTTON}`);
    button?.addEventListener('click', this.sendForm);
  }

  private sendForm(e: Event): void {
    e.preventDefault();

    const { form } = this;
    const formValid = RegistrationView.validateForm(form);

    if (formValid) {
      console.log('Sending form...');
    } else {
      console.error('Form is invalid!');
    }
  }

  private static validateForm(form: HTMLElement): boolean {
    let valid = true;

    const inputs = form.querySelectorAll('input');
    inputs.forEach((input) => {
      if (input.dataset.valid === 'false') {
        valid = false;
      }
    });

    return valid;
  }
}
