import Converter from '../../../../components/Converter/Converter';
import HTML from './AddressView.html';
import ParagraphView from '../../ParagraphView/ParagraphView';
import InputView from '../../../InputView/InputView';
import DynamicInputView from '../../../InputView/DynamicInputView/DynamicInputView';
import SelectView from '../../../SelectView/SelectView';
import { Address } from '../../../../types';
import { AddressLabels, DataAttrs, AddressInputsOptions } from '../../data';
import { Countries, DEFAULT_COUNTRY } from '../../../../data/countries';
import { PostalCodeErrorMessages, PostalCodeRegExps } from '../../../../data/validation';

const COUNTRY_FIELD_INDEX = 2;
const POSTAL_CODE_FIELD_INDEX = 3;

export default class AddressView {
  private view = Converter.htmlToElement<HTMLDivElement>(HTML) || document.createElement('div');

  private selectObject = new SelectView();

  private postalCodeInputObject: DynamicInputView | null = null;

  private inputObjects: InputView[] = [];

  private paragraphsObjects: ParagraphView[] = [];

  public buildView(addressData: Address, determinant = ''): AddressView {
    this.view.dataset.id = `${addressData.id}`;

    this.configureInfoBlock(addressData);
    this.configureEditBlock(determinant);

    return this;
  }

  public getView(): HTMLDivElement {
    return this.view;
  }

  public getData(): Address {
    const data: Address = {
      country: this.selectObject.getValue(),
      streetName: '',
      city: '',
      postalCode: '',
      id: this.view.dataset.id,
    };

    this.inputObjects.forEach((inputObject) => {
      const inputType = inputObject.getAttr('data-type');

      if (inputType.includes('street')) {
        data.streetName = inputObject.getValue();
      }
      if (inputType.includes('city')) {
        data.city = inputObject.getValue();
      }
      if (inputType.includes('postal-code')) {
        data.postalCode = inputObject.getValue();
      }
    });

    return data;
  }

  public updateView(data: string[]): void {
    data.forEach((fieldData, index) => {
      this.paragraphsObjects[index].setContent(fieldData);
    });
  }

  public updateId(id: string): void {
    this.view.dataset.id = id;
  }

  public makeDefault(): void {
    this.view.dataset.default = 'true';
  }

  public makeNew(): void {
    this.view.dataset.new = 'true';
  }

  public makeExisting(): void {
    this.enableFields();
    this.view.dataset.deleted = 'false';
    this.view.dataset.new = 'false';
  }

  public isDefault(): boolean {
    return this.view.dataset.default === 'true';
  }

  public enterEditMode(): void {
    const infoValues = this.getInfoValues();
    this.setEditValues(infoValues);
    this.validateFields();

    this.view.dataset.edit = 'true';
  }

  public exitEditMode(): void {
    this.view.dataset.edit = 'false';
    this.makeExisting();
  }

  public needToDelete(): boolean {
    return this.view.dataset.deleted === 'true';
  }

  public remove(): void {
    this.view.remove();
  }

  private configureInfoBlock(addressData: Address): void {
    const infoBlock = this.view.querySelector(`[${DataAttrs.INFO_BLOCK}]`);

    const contents = [
      [AddressLabels.STREET, addressData.streetName],
      [AddressLabels.CITY, addressData.city],
      [AddressLabels.COUNTRY, addressData.country],
      [AddressLabels.CODE, addressData.postalCode],
    ];

    contents.forEach(([label, content]) => {
      const paragraphsObject = new ParagraphView();
      this.paragraphsObjects.push(paragraphsObject);
      infoBlock?.append(paragraphsObject.buildView(label, content));
    });
  }

  private configureEditBlock(determinant: string): void {
    const editBlock = this.view.querySelector(`[${DataAttrs.EDIT_BLOCK}]`);
    const labels = editBlock?.querySelectorAll(`[${DataAttrs.LABEL}]`);
    const rows = editBlock?.querySelectorAll(`[${DataAttrs.ROW}]`);

    if (labels && rows) {
      this.configureLabels(labels, determinant);
      this.configureSelect(rows[COUNTRY_FIELD_INDEX], labels[COUNTRY_FIELD_INDEX]);
      this.configureInputs(rows, labels);
      this.configureDeleteButton();
      this.configureRestoreButton();
    }
  }

  private configureLabels(labels: NodeListOf<Element>, determinant: string): void {
    labels.forEach((label) => {
      label.setAttribute('for', `${label.getAttribute('for')}${determinant}`);
    });
  }

  private configureInputs(rows: NodeListOf<Element>, labels: NodeListOf<Element>): void {
    let optionsIndex = 0;

    rows.forEach((row, index) => {
      if (index === COUNTRY_FIELD_INDEX) {
        return;
      }

      const id = labels[index].getAttribute('for') || '';

      const inputOptions = AddressInputsOptions[optionsIndex];
      inputOptions.id = id;
      inputOptions.dataAttr = {
        name: 'type',
        value: id,
      };

      let inputObject;

      if (index === POSTAL_CODE_FIELD_INDEX) {
        inputObject = new DynamicInputView(
          PostalCodeRegExps[DEFAULT_COUNTRY],
          PostalCodeErrorMessages[DEFAULT_COUNTRY]
        );
        this.postalCodeInputObject = inputObject;
      } else {
        inputObject = new InputView();
      }

      inputObject.makeSmall();
      inputObject.makeErrorDynamic();

      this.inputObjects.push(inputObject);

      row.append(inputObject.buildInputView(inputOptions));

      optionsIndex += 1;
    });
  }

  private configureSelect(row: Element, label: Element): void {
    const id = label.getAttribute('for') || '';

    this.selectObject.makeSmall();

    const select = this.selectObject.buildSelectView(Countries, id);
    select.addEventListener('change', this.changePostalCodeValidation.bind(this));

    row.append(select);
  }

  private configureDeleteButton(): void {
    const deleteButton = this.view.querySelector(`[${DataAttrs.DELETE_BUTTON}]`);
    deleteButton?.addEventListener('click', this.makeDeleted.bind(this));
  }

  private configureRestoreButton(): void {
    const restoreButton = this.view.querySelector(`[${DataAttrs.RESTORE_BUTTON}]`);
    restoreButton?.addEventListener('click', this.makeExisting.bind(this));
  }

  private changePostalCodeValidation(): void {
    const countryCode = this.selectObject.getValue();

    this.postalCodeInputObject?.setRegExp(PostalCodeRegExps[countryCode]);
    this.postalCodeInputObject?.setErrorMessage(PostalCodeErrorMessages[countryCode]);

    this.postalCodeInputObject?.validateInput();
  }

  private getInfoValues(): string[] {
    return this.paragraphsObjects.map((paragraphObject) => paragraphObject.getContent());
  }

  public setEditValues(values: string[]): void {
    let inputIndex = 0;

    values.forEach((value, index) => {
      if (index === COUNTRY_FIELD_INDEX) {
        this.selectObject.setValue(value);
        this.selectObject.dispatchEvent(new Event('change'));
        return;
      }

      const input = this.inputObjects[inputIndex];
      input.setValue(value);

      inputIndex += 1;
    });
  }

  private validateFields(): void {
    this.inputObjects.forEach((inputObject) => {
      inputObject.validateInput();
    });
  }

  private makeDeleted(): void {
    if (this.isNew()) {
      this.remove();
    }

    this.disableFields();
    this.view.dataset.deleted = 'true';
  }

  private disableFields(): void {
    this.selectObject.disable();
    this.inputObjects.forEach((inputObject) => {
      inputObject.disable();
    });
  }

  private enableFields(): void {
    this.selectObject.enable();
    this.inputObjects.forEach((inputObject) => {
      inputObject.enable();
    });
  }

  private isNew(): boolean {
    return this.view.dataset.new === 'true';
  }
}
