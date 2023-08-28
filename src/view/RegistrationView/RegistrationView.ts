import Converter from '../../components/Converter/Converter';
import HTML from './RegistrationView.html';
import { FormErrorMessages, DataAttrs } from './data';
import { CustomerCredentials } from '../../types';
import BillingAddressView from './AddressView/BillingAddressView/BillingAddressView';
import ShippingAddressView from './AddressView/ShippingAddressView/ShippingAddressView';
import UserInfoView from './UserInfoView/UserInfoView';
/* eslint-disable import/no-cycle */
import Registration from '../../api/Registration/Registration';

const ERROR_DISPLAY_TIME_MS = 3000;

export default class RegistrationView {
  private form = Converter.htmlToElement<HTMLFormElement>(HTML) || document.createElement('form');

  private billingAddressObject = new BillingAddressView();

  private shippingAddressObject = new ShippingAddressView();

  private userInfoObject = new UserInfoView();

  private errorBlock: HTMLDivElement | null = null;

  private errorTimeoutId = 0;

  public buildRegistrationView(): HTMLFormElement {
    this.configureAddresses();
    this.configureUserInfo();
    this.configureButton();
    this.configureErrorBlock();
    this.configureCheckboxes();
    this.configureForm();

    return this.form;
  }

  public static draw(): void {
    const main: HTMLElement = document.querySelector('main')!;
    main.innerHTML = '';
    main.append(new RegistrationView().buildRegistrationView());
  }

  private configureAddresses(): void {
    this.form.prepend(this.shippingAddressObject.buildAddressBlockView());
    this.form.prepend(this.billingAddressObject.buildAddressBlockView());
  }

  private configureUserInfo(): void {
    this.form.prepend(this.userInfoObject.buildView());
  }

  private configureButton(): void {
    const button = this.form.querySelector(`[${DataAttrs.BUTTON}]`);
    button?.addEventListener('click', this.sendForm.bind(this));
  }

  private configureCheckboxes(): void {
    const billingCheckbox = this.billingAddressObject.getUseAsCheckbox();
    billingCheckbox.addEventListener('change', () => {
      if (billingCheckbox.checked) {
        const shippingTextFields = this.shippingAddressObject.getTextFields();
        const shippingSelect = this.shippingAddressObject.getSelect();

        this.shippingAddressObject.disable();

        this.billingAddressObject.trackTextFields(shippingTextFields);
        this.billingAddressObject.trackSelect(shippingSelect);
      } else {
        this.billingAddressObject.untrackTextFields();
        this.billingAddressObject.untrackSelect();

        this.shippingAddressObject.enable();
      }
    });

    const shippingCheckbox = this.shippingAddressObject.getUseAsCheckbox();
    shippingCheckbox.addEventListener('change', () => {
      if (shippingCheckbox.checked) {
        const billingTextFields = this.billingAddressObject.getTextFields();
        const billingSelect = this.billingAddressObject.getSelect();

        this.billingAddressObject.disable();

        this.shippingAddressObject.trackTextFields(billingTextFields);
        this.shippingAddressObject.trackSelect(billingSelect);
      } else {
        this.shippingAddressObject.untrackTextFields();
        this.shippingAddressObject.untrackSelect();

        this.billingAddressObject.enable();
      }
    });
  }

  private configureForm(): void {
    this.validateInputs = this.validateInputs.bind(this);
    this.form.addEventListener('click', this.validateInputs);
  }

  private configureErrorBlock(): void {
    this.errorBlock = this.form.querySelector('[data-error-reg]');
  }

  private async sendForm(e: Event): Promise<void> {
    e.preventDefault();

    const delay = 1000;
    const { form } = this;
    const formValid = RegistrationView.validateForm(form);

    if (formValid) {
      this.hideErrorBlock();

      const regObject = new Registration();

      const credentials = this.collectCredentials();
      const response = await regObject.register(credentials);

      if (response.ok) {
        this.hideErrorBlock();
        form.dataset.registered = 'true';

        // Redirect to Login page
        // TODO: Need to trigger after show sucess message
        setTimeout(async () => {
          await regObject.login(credentials.email, credentials.password);
        }, delay);
      } else {
        form.dataset.registered = 'false';
        this.showErrorBlock(response.message);
      }
    } else {
      clearTimeout(this.errorTimeoutId);

      this.showErrorBlock(FormErrorMessages.INVALID);

      this.errorTimeoutId = window.setTimeout(this.hideErrorBlock.bind(this), ERROR_DISPLAY_TIME_MS);
    }
  }

  private collectCredentials(): CustomerCredentials {
    const userInfoCredentials = this.userInfoObject.collectCredentials();
    const billingAddressCredentials = this.billingAddressObject.collectCredentials();
    const shippingAddressCredentials = this.shippingAddressObject.collectCredentials();
    const useBillingAsDefault = this.billingAddressObject.getDefaultCheckbox().checked;
    const useShippingAsDefault = this.shippingAddressObject.getDefaultCheckbox().checked;

    const credentials: CustomerCredentials = {
      ...userInfoCredentials,
      addresses: [],
      shippingAddresses: [],
      billingAddresses: [],
    };

    credentials.addresses.push({
      ...billingAddressCredentials,
    });
    credentials.billingAddresses.push(credentials.addresses.length - 1);

    if (useBillingAsDefault) {
      credentials.defaultBillingAddress = credentials.addresses.length - 1;
    }

    credentials.addresses.push({
      ...shippingAddressCredentials,
    });
    credentials.shippingAddresses.push(credentials.addresses.length - 1);

    if (useShippingAsDefault) {
      credentials.defaultShippingAddress = credentials.addresses.length - 1;
    }

    return credentials;
  }

  private validateInputs(): void {
    this.userInfoObject.validateInputs();
    this.billingAddressObject.validateInputs();
    this.shippingAddressObject.validateInputs();

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

  private showErrorBlock(message: string): void {
    if (this.errorBlock) {
      this.errorBlock.textContent = message;
      this.errorBlock.hidden = false;
    }
  }

  private hideErrorBlock(): void {
    if (this.errorBlock) {
      this.errorBlock.hidden = true;
    }
  }
}
