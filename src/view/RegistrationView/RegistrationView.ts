import Converter from '../../components/Converter/Converter';
import SimpleInputView from './InputView/SimpleInputView/SimpleInputView';
import DateInputView from './InputView/DateInputView/DateInputView';
import SelectView from './SelectView/SelectView';
import { InputOptions } from './types';
import { RegExps, Countries } from './data';
import HTML from './RegistrationView.html';
import Registration from '../../api/Registration/Registration';
import { CustomerCredentials } from '../../types';

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
  { regExp: RegExps.EMAIL, type: InputTypes.EMAIL },
  { regExp: RegExps.PASSWORD, type: InputTypes.PASSWORD },
  { regExp: RegExps.LETTERS },
  { regExp: RegExps.LETTERS },
  { regExp: RegExps.DATE },
  { regExp: RegExps.STREET },
  { regExp: RegExps.LETTERS },
  { regExp: RegExps.POSTAL_CODES },
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
      const id = labels[index].getAttribute('for') || '';

      localInputOption.id = id;
      localInputOption.dataAttr = {
        name: 'type',
        value: id,
      };

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
    button?.addEventListener('click', this.sendForm.bind(this));
  }

  private sendForm(e: Event): void {
    e.preventDefault();

    const { form } = this;
    const formValid = RegistrationView.validateForm(form);

    if (formValid) {
      const credentials = this.collectCredentials();
      new Registration().register(credentials);
    } else {
      console.error('Form is invalid!');
    }
  }

  private collectCredentials(): CustomerCredentials {
    const credentials: CustomerCredentials = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
    };

    const inputs = this.form.querySelectorAll('input');
    inputs.forEach((input) => {
      const inputType = `${input.dataset.type}`;

      if (inputType === 'email') {
        credentials.email = input.value;
      }
      if (inputType === 'password') {
        credentials.password = input.value;
      }
      if (inputType === 'first-name') {
        credentials.firstName = input.value;
      }
      if (inputType === 'last-name') {
        credentials.lastName = input.value;
      }
    });

    return credentials;
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
