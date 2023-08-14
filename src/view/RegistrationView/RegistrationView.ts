import Converter from '../../components/Converter/Converter';
import InputView from './InputView/InputView';
import DateInputView from './InputView/DateInputView/DateInputView';
import SelectView from './SelectView/SelectView';
import { InputOptions } from './types';
import { ValidationData, Countries } from './data';
import HTML from './RegistrationView.html';

const BIRTH_DATE_INPUT_INDEX = 4;

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
  { validationData: ValidationData.EMAIL, type: InputTypes.EMAIL },
  { validationData: ValidationData.PASSWORD, type: InputTypes.PASSWORD },
  { validationData: ValidationData.FIRST_NAME },
  { validationData: ValidationData.LAST_NAME },
  { validationData: ValidationData.DATE },
  { validationData: ValidationData.STREET },
  { validationData: ValidationData.CITY },
  { validationData: ValidationData.POSTAL_CODES },
];

export default class RegistrationView {
  private form = Converter.htmlToElement<HTMLFormElement>(HTML) || document.createElement('form');

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

      let inputRow: HTMLDivElement | null = null;

      if (index === BIRTH_DATE_INPUT_INDEX) {
        inputRow = new DateInputView().buildInputView(localInputOption);
      } else {
        inputRow = new InputView().buildInputView(localInputOption);
      }

      rows[index].append(inputRow);
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
