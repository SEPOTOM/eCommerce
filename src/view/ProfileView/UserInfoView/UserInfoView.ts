import Converter from '../../../components/Converter/Converter';
import HTML from './UserInfoView.html';
import ParagraphView from '../ParagraphView/ParagraphView';
import InputView from '../../InputView/InputView';
import DateInputView from '../../InputView/DateInputView/DateInputView';
import { CustomerDataResponse } from '../../../types';
import { UserInfoCredentials } from '../types';
import { DataAttrs, ParagraphLabels, UserInfoInputsOptions, BIRTH_DATE_INPUT_INDEX } from '../data';

export default class UserInfoView {
  private view = Converter.htmlToElement<HTMLElement>(HTML) || document.createElement('section');

  private paragraphsObjects: ParagraphView[] = [];

  private inputsObjects: InputView[] = [];

  public buildView(customerData: CustomerDataResponse): HTMLElement {
    this.configureInfoBlock(customerData);
    this.configureEditBlock();

    return this.view;
  }

  public enterEditMode(): void {
    this.view.dataset.edit = 'true';

    const currentUserData = this.getCurrentData();

    this.updateInputsValues(currentUserData);
  }

  public exitEditMode(): void {
    this.view.dataset.edit = 'false';
  }

  public collectCredentials(): UserInfoCredentials {
    const credentials: UserInfoCredentials = {
      email: '',
      firstName: '',
      lastName: '',
      birthDate: '',
    };

    const editBlock = this.view.querySelector(`[${DataAttrs.EDIT_BLOCK}]`);

    if (editBlock) {
      const inputs = editBlock.querySelectorAll('input');

      inputs.forEach((input) => {
        const inputType = `${input.dataset.type}`;

        if (inputType === 'email') {
          credentials.email = input.value;
        }
        if (inputType === 'first-name') {
          credentials.firstName = input.value;
        }
        if (inputType === 'last-name') {
          credentials.lastName = input.value;
        }
        if (inputType === 'birth-date') {
          credentials.birthDate = input.value;
        }
      });
    }

    return credentials;
  }

  public updateInfo(contents: string[]): void {
    this.paragraphsObjects.forEach((paragraphsObject, index) => {
      paragraphsObject.setContent(contents[index]);
    });
  }

  private updateInputsValues(userData: string[]): void {
    this.inputsObjects.forEach((inputObject, index) => {
      inputObject.setValue(userData[index]);
    });
  }

  private configureInfoBlock(customerData: CustomerDataResponse): void {
    const paragraphsData = [
      [ParagraphLabels.EMAIL, customerData.email],
      [ParagraphLabels.FIRST_NAME, customerData.firstName],
      [ParagraphLabels.LAST_NAME, customerData.lastName],
    ];

    if (typeof customerData.dateOfBirth === 'string') {
      const [year, month, day] = customerData.dateOfBirth.split('-');
      const formattedDate = `${month}/${day}/${year}`;

      paragraphsData.push([ParagraphLabels.BIRTH_DATE, formattedDate]);
    }

    const infoBlock = this.view.querySelector(`[${DataAttrs.INFO_BLOCK}]`);

    paragraphsData.forEach(([label, content]) => {
      const paragraphObject = new ParagraphView();

      this.paragraphsObjects.push(paragraphObject);

      infoBlock?.append(paragraphObject.buildView(label, content));
    });
  }

  private configureEditBlock(): void {
    const rows = this.view.querySelectorAll(`[${DataAttrs.ROW}]`);
    const labels = this.view.querySelectorAll(`[${DataAttrs.LABEL}]`);

    UserInfoInputsOptions.forEach((inputOptions, index) => {
      const localInputOptions = inputOptions;
      const id = labels[index]?.getAttribute('for') || '';

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

      inputObject.makeSmall();
      inputObject.makeErrorDynamic();

      this.inputsObjects.push(inputObject);

      const inputRow = inputObject.buildInputView(localInputOptions);

      rows[index]?.append(inputRow);
    });
  }

  private getCurrentData(): string[] {
    return this.paragraphsObjects.map((paragraphObject) => paragraphObject.getContent());
  }
}
