import Converter from '../../components/Converter/Converter';
import InputView from './InputView/InputView';
import DateInputView from './InputView/DateInputView/DateInputView';
import DynamicInputView from './InputView/DynamicInputView/DynamicInputView';
import SelectView from './SelectView/SelectView';
import { InputOptions } from './types';
import { ValidationData, Countries, PostalCodeErrorMessages, PostalCodeRegExps } from './data';
import HTML from './RegistrationView.html';
import Registration from '../../api/Registration/Registration';
import { CustomerCredentials } from '../../types';

const DEFAULT_COUNTRY = 'US';
const BIRTH_DATE_INPUT_INDEX = 4;
const POSTAL_CODE_INPUT_INDEX = 7;

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
  { validationData: ValidationData.EMAIL },
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

  private select: HTMLSelectElement | null = null;

  private postalCodeInputObject: DynamicInputView | null = null;

  private inputObjects: InputView[] = [];

  public buildRegistrationView(): HTMLFormElement {
    const rows = this.form.querySelectorAll(`.${ClassNames.ROW}`);

    this.configureSelect(rows);
    this.configureInputs(rows);
    this.configureButton();
    this.configureForm();

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

      let inputObject: InputView | null = null;

      if (index === BIRTH_DATE_INPUT_INDEX) {
        inputObject = new DateInputView();
      } else if (index === POSTAL_CODE_INPUT_INDEX) {
        this.postalCodeInputObject = new DynamicInputView(
          PostalCodeRegExps[DEFAULT_COUNTRY],
          PostalCodeErrorMessages[DEFAULT_COUNTRY]
        );
        inputObject = this.postalCodeInputObject;
      } else {
        inputObject = new InputView();
      }

      this.inputObjects.push(inputObject);

      const inputRow = inputObject.buildInputView(localInputOption);

      rows[index].append(inputRow);
    });
  }

  private configureSelect(rows: NodeListOf<Element>): void {
    const lastRow = rows[rows.length - 1];
    const label = lastRow.querySelector(`.${ClassNames.LABEL}`);
    const id = label?.getAttribute('for') || '';

    this.select = new SelectView().buildSelectView(Countries, id);

    this.select.addEventListener('change', this.changePostalCodeInputValidation.bind(this));

    lastRow.append(this.select);
  }

  private configureButton(): void {
    const button = this.form.querySelector(`.${ClassNames.BUTTON}`);
    button?.addEventListener('click', this.sendForm.bind(this));
  }

  private configureForm(): void {
    this.validateInputs = this.validateInputs.bind(this);
    this.form.addEventListener('click', this.validateInputs);
  }

  private async sendForm(e: Event): Promise<void> {
    e.preventDefault();

    const { form } = this;
    const formValid = RegistrationView.validateForm(form);

    if (formValid) {
      const credentials = this.collectCredentials();
      const ok = await new Registration().register(credentials);

      if (ok) {
        form.dataset.registered = 'true';
      } else {
        form.dataset.registered = 'false';
      }
    } else {
      console.error('Form is invalid!');
    }
  }

  private changePostalCodeInputValidation(): void {
    const countyCode = `${this.select?.value}`;

    this.postalCodeInputObject?.setRegExp(PostalCodeRegExps[countyCode]);
    this.postalCodeInputObject?.setErrorMessage(PostalCodeErrorMessages[countyCode]);

    this.postalCodeInputObject?.validateInput();
  }

  private validateInputs(): void {
    this.inputObjects.forEach((inputObject) => {
      inputObject.validateInput();
    });

    this.inputObjects = [];

    this.form.removeEventListener('click', this.validateInputs);
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
