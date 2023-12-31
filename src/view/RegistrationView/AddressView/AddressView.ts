import Converter from '../../../components/Converter/Converter';
import HTML from './AddressView.html';
import InputView from '../../InputView/InputView';
import DynamicInputView from '../../InputView/DynamicInputView/DynamicInputView';
import SelectView from '../../SelectView/SelectView';
import { EventCallback, Address } from '../../../types';
import { AddressInputsOptions, DataAttrs } from '../data';
import { Countries, DEFAULT_COUNTRY } from '../../../data/countries';
import { PostalCodeErrorMessages, PostalCodeRegExps } from '../../../data/validation';

const POSTAL_CODE_INPUT_INDEX = 2;
const USE_AS_CHECKBOX_INDEX = 0;
const DEFAULT_CHECKBOX_INDEX = 1;

export default abstract class AddressView {
  private view: HTMLDivElement = Converter.htmlToElement<HTMLDivElement>(HTML) || document.createElement('div');

  private useAsCheckbox: HTMLInputElement | null = null;

  private defaultCheckbox: HTMLInputElement | null = null;

  private select: HTMLSelectElement | null = null;

  private postalCodeInputObject: DynamicInputView | null = null;

  private inputObjects: InputView[] = [];

  private trackingHandlers: EventCallback[] = [];

  private selectHandler: EventCallback | null = null;

  public buildAddressBlockView(
    titleText: string,
    ids: string[],
    checkboxesIds: string[],
    oppositeTitle: string,
    selectId: string
  ): HTMLDivElement {
    this.configureTitle(titleText);
    this.configureLabels(ids);
    this.configureInputs();
    this.configureSelect(selectId);
    this.configureCheckboxes(oppositeTitle, checkboxesIds);

    return this.view;
  }

  public validateInputs(): void {
    this.inputObjects.forEach((inputObject) => {
      inputObject.validateInput();
    });
  }

  public getUseAsCheckbox(): HTMLInputElement {
    return this.useAsCheckbox || document.createElement('input');
  }

  public getDefaultCheckbox(): HTMLInputElement {
    return this.defaultCheckbox || document.createElement('input');
  }

  public getTextFields(): NodeListOf<HTMLInputElement> {
    const inputs = this.view.querySelectorAll('input[type="text"]') as NodeListOf<HTMLInputElement>;
    return inputs;
  }

  public getSelect(): HTMLSelectElement {
    return this.select || document.createElement('select');
  }

  public trackTextFields(textFields: NodeListOf<HTMLInputElement> | HTMLInputElement[]): void {
    const currentTextFields = this.getTextFields();

    textFields.forEach((textField, index) => {
      const handler = this.trackTextField.bind(this, textField);
      this.trackingHandlers.push(handler);

      const currentTextField = currentTextFields[index];
      currentTextField.addEventListener('input', handler);

      this.syncTextFields(textField, currentTextField);
    });
  }

  public trackSelect(select: HTMLSelectElement): void {
    const localSelect = select;
    localSelect.value = this.select?.value || '';
    localSelect.dispatchEvent(new Event('change'));

    this.selectHandler = this.syncSelect.bind(this, select);

    this.select?.addEventListener('change', this.selectHandler);
  }

  public untrackTextFields(): void {
    const currentTextFields = this.getTextFields();

    this.trackingHandlers.forEach((handler, index) => {
      const currentTextField = currentTextFields[index];

      currentTextField.removeEventListener('input', handler);
    });

    this.trackingHandlers = [];
  }

  public untrackSelect(): void {
    if (this.selectHandler) {
      this.select?.removeEventListener('change', this.selectHandler);
    }
  }

  public disable(): void {
    const inputs = this.view.querySelectorAll('input');
    inputs.forEach((input) => {
      const localInput = input;

      if (localInput.hasAttribute(`${DataAttrs.DEFAULT_ADDRESS}`)) {
        return;
      }

      localInput.disabled = true;
    });

    if (this.select) {
      this.select.disabled = true;
    }
  }

  public enable(): void {
    const inputs = this.view.querySelectorAll('input');
    inputs.forEach((input) => {
      const localInput = input;

      localInput.disabled = false;
    });

    if (this.select) {
      this.select.disabled = false;
    }
  }

  public collectCredentials(ids: string[]): Address {
    const credentials: Address = {
      streetName: '',
      postalCode: '',
      city: '',
      country: this.select?.value || '',
    };

    const textFields = this.getTextFields();

    textFields.forEach((textField) => {
      if (textField.id === ids[0]) {
        credentials.streetName = textField.value;
      }

      if (textField.id === ids[1]) {
        credentials.city = textField.value;
      }

      if (textField.id === ids[2]) {
        credentials.postalCode = textField.value;
      }
    });

    return credentials;
  }

  private syncTextFields(textField: HTMLInputElement, currentTextField: HTMLInputElement): void {
    const localTextField = textField;

    localTextField.value = currentTextField.value;
    localTextField.dispatchEvent(new InputEvent('input'));
  }

  private syncSelect(select: HTMLSelectElement): void {
    const localSelect = select;
    const currentSelect = this.select;

    localSelect.value = currentSelect?.value || '';
    localSelect.dispatchEvent(new Event('change'));
  }

  private trackTextField(textField: HTMLInputElement, e: Event): void {
    const localTextField = textField;
    const currentTextField = e.currentTarget;

    if (currentTextField instanceof HTMLInputElement) {
      localTextField.value = currentTextField.value;
      localTextField.dispatchEvent(new InputEvent('input'));
    }
  }

  private configureTitle(titleText: string): void {
    const title = this.view.querySelector(`[${DataAttrs.TITLE}]`);

    if (title) {
      title.textContent = titleText;
    }
  }

  private configureLabels(ids: string[]): void {
    const labels = this.view.querySelectorAll(`[${DataAttrs.LABEL}]`);
    labels.forEach((label, index) => {
      label.setAttribute('for', ids[index]);
    });
  }

  private configureInputs(): void {
    const rows = this.view.querySelectorAll(`[${DataAttrs.ROW}]`);
    const labels = this.view.querySelectorAll(`[${DataAttrs.LABEL}]`);

    AddressInputsOptions.forEach((inputOptions, index) => {
      const localInputOptions = inputOptions;
      const id = labels[index].getAttribute('for') || '';

      localInputOptions.id = id;
      localInputOptions.dataAttr = {
        name: 'type',
        value: id,
      };

      let inputObject: InputView | null = null;

      if (index === POSTAL_CODE_INPUT_INDEX) {
        this.postalCodeInputObject = new DynamicInputView(
          PostalCodeRegExps[DEFAULT_COUNTRY],
          PostalCodeErrorMessages[DEFAULT_COUNTRY]
        );
        inputObject = this.postalCodeInputObject;
      } else {
        inputObject = new InputView();
      }

      this.inputObjects.push(inputObject);

      const inputRow = inputObject.buildInputView(localInputOptions);

      rows[index].append(inputRow);
    });
  }

  private configureSelect(id: string): void {
    const countriesRow = this.view.querySelector(`[${DataAttrs.COUNTRIES_ROW}]`);
    const label = countriesRow?.querySelector(`[${DataAttrs.LABEL}]`);
    label?.setAttribute('for', id);

    this.select = new SelectView().buildSelectView(Countries, id);

    this.select?.addEventListener('change', this.changePostalCodeInputValidation.bind(this));

    countriesRow?.append(this.select);
  }

  private configureCheckboxes(titleText: string, checkboxesIds: string[]): void {
    const checkboxes: NodeListOf<HTMLInputElement> = this.view.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox, index) => {
      const localCheckbox = checkbox;

      localCheckbox.id = checkboxesIds[index];

      const row = localCheckbox.parentElement;
      const label = row?.querySelector('label');
      label?.setAttribute('for', checkboxesIds[index]);

      if (index === USE_AS_CHECKBOX_INDEX) {
        if (label) {
          label.textContent += titleText;
        }

        this.useAsCheckbox = localCheckbox;
      }

      if (index === DEFAULT_CHECKBOX_INDEX) {
        this.defaultCheckbox = checkbox;
      }
    });
  }

  private changePostalCodeInputValidation(): void {
    const countryCode = this.select?.value || '';

    this.postalCodeInputObject?.setRegExp(PostalCodeRegExps[countryCode]);
    this.postalCodeInputObject?.setErrorMessage(PostalCodeErrorMessages[countryCode]);

    this.postalCodeInputObject?.validateInput();
  }
}
