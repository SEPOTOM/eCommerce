import Converter from '../../../components/Converter/Converter';
import HTML from './UserInfoView.html';
import InputView from '../InputView/InputView';
import DateInputView from '../InputView/DateInputView/DateInputView';
import SelectView from '../SelectView/SelectView';
import { UserInfoCredentials } from '../types';
import { UserInfoInputsOptions, DataAttrs, Countries } from '../data';

const BIRTH_DATE_INPUT_INDEX = 4;
const COUNTRIES_INDEX = 5;

export default class UserInfoView {
  private view = Converter.htmlToElement<HTMLDivElement>(HTML) || document.createElement('div');

  private select: HTMLSelectElement | null = null;

  private inputObjects: InputView[] = [];

  public buildView(): HTMLDivElement {
    const rows = this.view.querySelectorAll(`[${DataAttrs.ROW}]`);

    this.configureSelect(rows);
    this.configureInputs(rows);

    return this.view;
  }

  public getSelect(): HTMLSelectElement | null {
    return this.select;
  }

  public validateInputs(): void {
    this.inputObjects.forEach((inputObject) => {
      inputObject.validateInput();
    });
  }

  public collectCredentials(): UserInfoCredentials {
    const credentials: UserInfoCredentials = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
    };

    const inputs = this.view.querySelectorAll('input');
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

  private configureInputs(rows: NodeListOf<Element>): void {
    const labels = this.view.querySelectorAll(`[${DataAttrs.LABEL}]`);

    UserInfoInputsOptions.forEach((inputOptions, index) => {
      const localInputOptions = inputOptions;
      const id = labels[index].getAttribute('for') || '';

      localInputOptions.id = id;
      localInputOptions.dataAttr = {
        name: 'type',
        value: id,
      };

      let inputObject: InputView | null = null;

      if (index === BIRTH_DATE_INPUT_INDEX) {
        inputObject = new DateInputView();
      } else {
        inputObject = new InputView();
      }

      this.inputObjects.push(inputObject);

      const inputRow = inputObject.buildInputView(localInputOptions);

      rows[index].append(inputRow);
    });
  }

  private configureSelect(rows: NodeListOf<Element>): void {
    const countriesRow = rows[COUNTRIES_INDEX];
    const label = countriesRow.querySelector(`[${DataAttrs.LABEL}]`);
    const id = label?.getAttribute('for') || '';

    this.select = new SelectView().buildSelectView(Countries, id);

    countriesRow.append(this.select);
  }
}
