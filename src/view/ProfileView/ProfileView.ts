import Converter from '../../components/Converter/Converter';
/* eslint-disable import/no-cycle */
import Customer from '../../api/Customer/Customer';
import HTML from './ProfileView.html';
import UserInfoView from './UserInfoView/UserInfoView';
import BillingAddressesView from './AddressesView/BillingAddressesView/BillingAddressesView';
import ShippingAddressesView from './AddressesView/ShippingAddressesView/ShippingAddressesView';
import ErrorView from '../ErrorView/ErrorView';
import ButtonsView from './ButtonsView/ButtonsView';
import PasswordModalView from '../PasswordModalView/PasswordModalView';
import AddressView from './AddressesView/AddressView/AddressView';
import { CustomerDataResponse } from '../../types';
import { DataAttrs, BIRTH_DATE_INPUT_INDEX } from './data';

const EXIT_EDIT_MODE_DELAY = 1000;

enum ErrorMessages {
  INVALID_FIELDS = 'Please, make sure that all fields are filled in correctly.',
}

export default class ProfileView {
  private view = Converter.htmlToElement<HTMLDivElement>(HTML) || document.createElement('div');

  private userInfo = new UserInfoView();

  private billingAddresses = new BillingAddressesView();

  private shippingAddresses = new ShippingAddressesView();

  private error = new ErrorView();

  private passwordModal = new PasswordModalView();

  private buttonsViews = [new ButtonsView(), new ButtonsView()];

  constructor() {
    this.configureView();
  }

  public draw(): void {
    const main = document.querySelector('main');

    if (main) {
      main.innerHTML = '';
      main.append(this.view);
    }
  }

  private async configureView(): Promise<void> {
    const customerData = await Customer.getCurrentCustomer();

    if (!('message' in customerData)) {
      this.view.append(this.buttonsViews[0].buildView());
      this.view.append(this.userInfo.buildView(customerData));
      this.view.append(this.billingAddresses.buildView(customerData));
      this.view.append(this.shippingAddresses.buildView(customerData));
      this.view.append(this.buttonsViews[1].buildView());

      document.body.append(this.passwordModal.buildView());

      this.configureButtons();
    } else {
      this.view.innerHTML = '';
      this.view.append(this.error.buildView(customerData.message));
    }
  }

  private configureButtons(): void {
    const editButton = this.view.querySelector(`[${DataAttrs.EDIT_BUTTON}]`);
    editButton?.addEventListener('click', this.enterEditMode.bind(this));

    const changePasswordButton = this.view.querySelector(`[${DataAttrs.CHANGE_PASSWORD_BUTTON}]`);
    changePasswordButton?.addEventListener('click', this.passwordModal.show.bind(this.passwordModal));

    this.buttonsViews.forEach((buttonsView) => {
      buttonsView.getCancelButton().addEventListener('click', this.exitEditMode.bind(this));
      buttonsView.getSaveButton().addEventListener('click', this.sendChanges.bind(this));
    });
  }

  private enterEditMode(): void {
    this.view.dataset.edit = 'true';

    this.userInfo.enterEditMode();
    this.billingAddresses.enterEditMode();
    this.shippingAddresses.enterEditMode();
  }

  private exitEditMode(): void {
    this.view.dataset.edit = 'false';

    this.userInfo.exitEditMode();
    this.billingAddresses.exitEditMode();
    this.shippingAddresses.exitEditMode();

    this.hideMessages();
  }

  private getTotalResponse(responses: (CustomerDataResponse | Error | null)[]): CustomerDataResponse | Error | null {
    for (let i = 0; i <= responses.length; i += 1) {
      const response = responses[i];
      if (response && 'message' in response) {
        return response;
      }
    }

    return responses.find((response) => response) || responses[responses.length - 1];
  }

  private async sendChanges(): Promise<void> {
    this.hideMessages();

    if (!this.validateFields()) {
      this.showErrors(ErrorMessages.INVALID_FIELDS);
      return;
    }

    const response = await this.sendExistingChanges();
    const defaultResponse = await this.deleteDefaultAddresses();
    const removeDefaultResponse = await this.removeDefaultAddresses();
    const billingResponse = await this.sendNewBillingAddresses();
    const shippingResponse = await this.sendNewShippingAddresses();

    const totalResponse = this.getTotalResponse([
      shippingResponse,
      billingResponse,
      removeDefaultResponse,
      defaultResponse,
      response,
    ]);

    if (!totalResponse) {
      return;
    }

    if ('message' in totalResponse) {
      this.showErrors(totalResponse.message);
      return;
    }

    setTimeout(() => {
      this.updateView(totalResponse);
      this.exitEditMode();
    }, EXIT_EDIT_MODE_DELAY);

    this.buttonsViews.forEach((buttonsView) => {
      buttonsView.showSuccessMessage();
    });
  }

  private async sendExistingChanges(): Promise<CustomerDataResponse | Error> {
    const userInfoCredentials = this.userInfo.collectCredentials();
    const billingAddresses = this.billingAddresses.getCurrentAddressesData();
    const shippingAddresses = this.shippingAddresses.getCurrentAddressesData();
    const deletedBillingAddresses = this.billingAddresses.getDeletedAddresses();
    const deletedShippingAddresses = this.shippingAddresses.getDeletedAddresses();
    const defaultBillingAddress = this.billingAddresses.getDefaultAddress();
    const defaultShippingAddress = this.shippingAddresses.getDefaultAddress();

    const [month, day, year] = userInfoCredentials.birthDate.split('/');
    const formattedDate = `${year}-${month}-${day}`;

    const request = new Customer()
      .updateEmail(userInfoCredentials.email)
      .updateFirstName(userInfoCredentials.firstName)
      .updateLastName(userInfoCredentials.lastName)
      .updateBirthDate(formattedDate)
      .updateAddresses(billingAddresses)
      .updateAddresses(shippingAddresses)
      .deleteAddresses(deletedBillingAddresses)
      .deleteAddresses(deletedShippingAddresses);

    if (defaultBillingAddress instanceof AddressView) {
      const id = defaultBillingAddress.getId();
      if (id) {
        request.setDefaultBilling(id);
      }
    }

    if (defaultShippingAddress instanceof AddressView) {
      const id = defaultShippingAddress.getId();
      if (id) {
        request.setDefaultShipping(id);
      }
    }

    const response = await request.sendUpdateRequest();

    return response;
  }

  private async deleteDefaultAddresses(): Promise<CustomerDataResponse | Error | null> {
    const defaultBillingAddress = this.billingAddresses.getDefaultAddress();
    const defaultShippingAddress = this.shippingAddresses.getDefaultAddress();
    let billingId: string | undefined;
    let shippingId: string | undefined;

    if (defaultBillingAddress instanceof AddressView && defaultBillingAddress.needToDelete()) {
      billingId = defaultBillingAddress.getId() || undefined;
    }

    if (defaultShippingAddress instanceof AddressView && defaultShippingAddress.needToDelete()) {
      shippingId = defaultShippingAddress.getId() || undefined;
    }

    if (billingId || shippingId) {
      return new Customer().deleteDefaultAddresses(billingId, shippingId);
    }

    return null;
  }

  private async removeDefaultAddresses(): Promise<CustomerDataResponse | Error | null> {
    const defaultBillingAddressId = this.billingAddresses.getDefaultAddress();
    const defaultShippingAddressId = this.shippingAddresses.getDefaultAddress();

    const request = new Customer();

    if (typeof defaultBillingAddressId === 'string') {
      request.removeDefaultBilling(defaultBillingAddressId);
    }

    if (typeof defaultShippingAddressId === 'string') {
      request.removeDefaultShipping(defaultShippingAddressId);
    }

    if (typeof defaultBillingAddressId === 'string' || typeof defaultShippingAddressId === 'string') {
      return request.sendUpdateRequest();
    }

    return null;
  }

  private async sendNewBillingAddresses(): Promise<CustomerDataResponse | Error | null> {
    const newBillingAddresses = this.billingAddresses.getNewAddressesData();

    if (newBillingAddresses.length > 0) {
      const response = await new Customer().addBillingAddresses(newBillingAddresses);
      return response;
    }

    return null;
  }

  private async sendNewShippingAddresses(): Promise<CustomerDataResponse | Error | null> {
    const newShippingAddresses = this.shippingAddresses.getNewAddressesData();

    if (newShippingAddresses.length > 0) {
      const response = await new Customer().addShippingAddresses(newShippingAddresses);
      return response;
    }

    return null;
  }

  private validateFields(): boolean {
    const fields = this.view.querySelectorAll(`[${DataAttrs.VALID}]`);

    for (let i = 0; i < fields.length; i += 1) {
      if (fields[i].getAttribute(DataAttrs.VALID) !== 'true') {
        return false;
      }
    }

    return true;
  }

  private updateView(response: CustomerDataResponse): void {
    const userInfoData = [response.email, response.firstName, response.lastName];

    if (response.dateOfBirth) {
      userInfoData.push(response.dateOfBirth);
    }

    this.updateInfo(userInfoData);
    this.billingAddresses.updateView(response);
    this.shippingAddresses.updateView(response);
  }

  private updateInfo(userInfoData: string[]): void {
    const localUserInfoData = userInfoData;

    localUserInfoData[BIRTH_DATE_INPUT_INDEX] = this.formatDate(localUserInfoData[BIRTH_DATE_INPUT_INDEX]);

    this.userInfo.updateInfo(userInfoData);
  }

  private formatDate(date: string): string {
    const [year, month, day] = date.split('-');
    const formattedDate = `${month}/${day}/${year}`;
    return formattedDate;
  }

  private showErrors(message: string): void {
    this.buttonsViews.forEach((buttonsView) => {
      buttonsView.showErrorMessage(message);
    });
  }

  private hideMessages(): void {
    this.buttonsViews.forEach((buttonsView) => {
      buttonsView.hideSuccessMessage();
      buttonsView.hideErrorMessage();
    });
  }
}
