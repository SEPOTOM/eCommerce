import Converter from '../../components/Converter/Converter';
import HTML from './RegistrationView.html';
import Registration from '../../api/Registration/Registration';
import { CustomerCredentials } from '../../types';
import { DataAttrs } from './data';

export default class RegistrationView {
  private form = Converter.htmlToElement<HTMLFormElement>(HTML) || document.createElement('form');

  public buildRegistrationView(): HTMLFormElement {
    this.configureButton();
    this.configureForm();

    return this.form;
  }

  private configureButton(): void {
    const button = this.form.querySelector(`[${DataAttrs.BUTTON}]`);
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

  private validateInputs(): void {
    this.form.removeEventListener('click', this.validateInputs);
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
