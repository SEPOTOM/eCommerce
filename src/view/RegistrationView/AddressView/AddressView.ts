import Converter from '../../../components/Converter/Converter';
import HTML from './AddressView.html';
import InputView from '../InputView/InputView';
import DynamicInputView from '../InputView/DynamicInputView/DynamicInputView';
import { PostalCodeRegExps, PostalCodeErrorMessages, DEFAULT_COUNTRY, AddressInputsOptions, DataAttrs } from '../data';

const POSTAL_CODE_INPUT_INDEX = 2;

export default abstract class AddressView {
  private view: HTMLDivElement = Converter.htmlToElement<HTMLDivElement>(HTML) || document.createElement('div');

  private postalCodeInputObject: DynamicInputView | null = null;

  private inputObjects: InputView[] = [];

  public buildAddressBlockView(titleText: string, ids: string[]): HTMLDivElement {
    this.configureTitle(titleText);
    this.configureLabels(ids);
    this.configureInputs();

    return this.view;
  }

  public validateInputs(): void {
    this.inputObjects.forEach((inputObject) => {
      inputObject.validateInput();
    });
  }

  public changePostalCodeInputValidation(countyCode: string): void {
    this.postalCodeInputObject?.setRegExp(PostalCodeRegExps[countyCode]);
    this.postalCodeInputObject?.setErrorMessage(PostalCodeErrorMessages[countyCode]);

    this.postalCodeInputObject?.validateInput();
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
}
