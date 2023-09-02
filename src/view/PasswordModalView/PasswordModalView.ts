import Converter from '../../components/Converter/Converter';
/* eslint-disable import/no-cycle */
import Customer from '../../api/Customer/Customer';
import Authorization from '../../api/Authorization/Authorization';
import Tokens from '../../components/Tokens/Tokens';
import Router from '../../components/Router/Router';
import HTML from './PasswordModalView.html';
import InputView from '../InputView/InputView';
import { PasswordData } from './types';
import { DataAttrs, ModalInputsOptions } from './data';

const DEFAULT_INPUT_VALUE = '';
const HIDE_MODAL_DELAY = 1000;

enum ClassNames {
  HIDDEN = 'hidden',
  NO_OVERFLOW = 'overflow-hidden',
}

enum ErrorMessages {
  INVALID_FIELD = 'Please, make sure that all fields are filled in correctly.',
}

export default class PasswordModalView {
  private view = Converter.htmlToElement<HTMLDivElement>(HTML) || document.createElement('div');

  private errorBlock = this.view.querySelector(`[${DataAttrs.ERROR_BLOCK}]`) || document.createElement('div');

  private inputsObjects: InputView[] = [];

  public buildView(): HTMLElement {
    this.configureView();
    this.configureInputs();
    this.configureSaveButton();

    return this.view;
  }

  public show(): void {
    this.view.classList.remove(ClassNames.HIDDEN);

    document.body.classList.add(ClassNames.NO_OVERFLOW);
  }

  public hide(): void {
    this.view.classList.add(ClassNames.HIDDEN);

    document.body.classList.remove(ClassNames.NO_OVERFLOW);
  }

  private configureView(): void {
    this.hide();

    this.view.addEventListener('click', (e) => {
      const { target } = e;

      if (target instanceof HTMLElement) {
        const isInsideContent = target.closest(`[${DataAttrs.MODAL_CONTENT}]`);
        const isCloseButton = target.closest(`[${DataAttrs.CANCEL_BUTTON}]`);

        if (!isInsideContent || isCloseButton) {
          this.hide();
          this.clear();
          this.hideErrorMessage();
        }
      }
    });
  }

  private configureInputs(): void {
    const rows = this.view.querySelectorAll(`[${DataAttrs.ROW}]`);
    const labels = this.view.querySelectorAll(`[${DataAttrs.LABEL}]`);

    ModalInputsOptions.forEach((inputOptions, index) => {
      const localInputOptions = inputOptions;
      const id = labels[index]?.getAttribute('for') || '';

      localInputOptions.id = id;
      localInputOptions.dataAttr = {
        name: 'type',
        value: id,
      };

      const inputObject = new InputView();

      this.inputsObjects.push(inputObject);

      const inputRow = inputObject.buildInputView(localInputOptions);

      rows[index]?.append(inputRow);
    });
  }

  private configureSaveButton(): void {
    const saveButton = this.view.querySelector(`[${DataAttrs.SAVE_BUTTON}]`);
    saveButton?.addEventListener('click', () => {
      if (this.isFieldsValid()) {
        this.changePassword();
      } else {
        this.showErrorMessage(ErrorMessages.INVALID_FIELD);
        this.validateFields();
      }
    });
  }

  private clear(): void {
    this.inputsObjects.forEach((inputObject) => {
      inputObject.setValue(DEFAULT_INPUT_VALUE);
      inputObject.hideError();
    });
  }

  private async changePassword(): Promise<void> {
    this.hideErrorMessage();

    const passwordData = this.getPasswordData();

    const response = await Customer.changePassword(passwordData.currentPassword, passwordData.newPassword);

    if ('message' in response) {
      this.showErrorMessage(response.message);
      return;
    }

    const tokens = await Authorization.loginBasicAuth(response.email, passwordData.newPassword);

    if ('message' in tokens) {
      this.showErrorMessage(tokens.message);
      return;
    }

    this.showSuccessMessage();

    setTimeout(() => {
      this.hide();
      this.clear();

      Tokens.setCustomerTokens(tokens);
      Router.toProfilePage();
    }, HIDE_MODAL_DELAY);
  }

  private getPasswordData(): PasswordData {
    const data: PasswordData = {
      currentPassword: '',
      newPassword: '',
    };

    const inputs = this.view.querySelectorAll('input');

    inputs.forEach((input) => {
      const inputType = input.dataset.type;

      if (inputType === 'old-password') {
        data.currentPassword = input.value;
      }

      if (inputType === 'new-password') {
        data.newPassword = input.value;
      }
    });

    return data;
  }

  private isFieldsValid(): boolean {
    const inputs = this.view.querySelectorAll('input');

    for (let i = 0; i < inputs.length; i += 1) {
      if (inputs[i].dataset.valid !== 'true') {
        return false;
      }
    }

    return true;
  }

  private showSuccessMessage(): void {
    this.view.dataset.success = 'true';
  }

  private showErrorMessage(message: string): void {
    this.view.dataset.error = 'true';
    this.errorBlock.textContent = message;
  }

  private hideErrorMessage(): void {
    this.view.dataset.error = 'false';
  }

  private validateFields(): void {
    this.inputsObjects.forEach((inputObject) => {
      inputObject.validateInput();
    });
  }
}
