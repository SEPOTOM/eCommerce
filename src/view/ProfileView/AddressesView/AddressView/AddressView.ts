import Converter from '../../../../components/Converter/Converter';
import HTML from './AddressView.html';
import ParagraphView from '../../ParagraphView/ParagraphView';
import InputView from '../../../InputView/InputView';
import SelectView from '../../../SelectView/SelectView';
import { Address } from '../../../../types';
import { AddressLabels, DataAttrs, AddressInputsOptions } from '../../data';
import { Countries } from '../../../../data/countries';

const COUNTRY_FIELD_INDEX = 2;

export default class AddressView {
  private view = Converter.htmlToElement<HTMLDivElement>(HTML) || document.createElement('div');

  private selectObject = new SelectView();

  private inputObjects: InputView[] = [];

  public buildView(addressData: Address, determinant = ''): AddressView {
    this.configureInfoBlock(addressData);
    this.configureEditBlock(determinant);

    return this;
  }

  public getView(): HTMLDivElement {
    return this.view;
  }

  public makeDefault(): void {
    this.view.dataset.default = 'true';
  }

  public isDefault(): boolean {
    return this.view.dataset.default === 'true';
  }

  public enterEditMode(): void {
    this.view.dataset.edit = 'true';
  }

  public exitEditMode(): void {
    this.view.dataset.edit = 'false';
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
      infoBlock?.append(new ParagraphView().buildView(label, content));
    });
  }

  private configureEditBlock(determinant: string): void {
    const editBlock = this.view.querySelector(`[${DataAttrs.EDIT_BLOCK}]`);
    const labels = editBlock?.querySelectorAll(`[${DataAttrs.LABEL}]`);
    const rows = editBlock?.querySelectorAll(`[${DataAttrs.ROW}]`);

    if (labels && rows) {
      this.configureLabels(labels, determinant);
      this.configureInputs(rows, labels);
      this.configureSelect(rows[COUNTRY_FIELD_INDEX], labels[COUNTRY_FIELD_INDEX]);
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

      const inputObject = new InputView();
      inputObject.makeSmall();
      inputObject.makeErrorDynamic();

      this.inputObjects.push(inputObject);

      const inputView = inputObject.buildInputView(inputOptions);

      row.append(inputView);

      optionsIndex += 1;
    });
  }

  private configureSelect(row: Element, label: Element): void {
    const id = label.getAttribute('for') || '';

    const select = this.selectObject.buildSelectView(Countries, id);

    this.selectObject.makeSmall();

    row.append(select);
  }
}
