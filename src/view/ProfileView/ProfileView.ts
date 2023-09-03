import Converter from '../../components/Converter/Converter';
/* eslint-disable import/no-cycle */
import Customer from '../../api/Customer/Customer';
import HTML from './ProfileView.html';
import UserInfoView from './UserInfoView/UserInfoView';
import BillingAddressesView from './AddressesView/BillingAddressesView/BillingAddressesView';
import ShippingAddressesView from './AddressesView/ShippingAddressesView/ShippingAddressesView';
import ErrorView from './ErrorView/ErrorView';
import ButtonsView from './ButtonsView/ButtonsView';
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

      this.configureButtons();
    } else {
      this.view.innerHTML = '';
      this.view.append(this.error.buildView(customerData.message));
    }
  }

  private configureButtons(): void {
    const editButton = this.view.querySelector(`[${DataAttrs.EDIT_BUTTON}]`);
    editButton?.addEventListener('click', this.enterEditMode.bind(this));

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

  private async sendChanges(): Promise<void> {
    this.hideMessages();

    if (!this.validateFields()) {
      this.showErrors(ErrorMessages.INVALID_FIELDS);
      return;
    }

    const response = await this.sendExistingChanges();
    const billingResponse = await this.sendNewBillingAddresses();
    const shippingResponse = await this.sendNewShippingAddresses();

    if ('message' in response) {
      this.showErrors(response.message);
      return;
    }

    if ('message' in billingResponse) {
      this.showErrors(billingResponse.message);
      return;
    }

    if ('message' in shippingResponse) {
      this.showErrors(shippingResponse.message);
      return;
    }

    setTimeout(this.exitEditMode.bind(this), EXIT_EDIT_MODE_DELAY);

    this.buttonsViews.forEach((buttonsView) => {
      buttonsView.showSuccessMessage();
    });

    this.updateView(response);
  }

  private async sendExistingChanges(): Promise<CustomerDataResponse | Error> {
    const userInfoCredentials = this.userInfo.collectCredentials();
    const billingAddresses = this.billingAddresses.getCurrentAddressesData();
    const shippingAddresses = this.shippingAddresses.getCurrentAddressesData();

    const [month, day, year] = userInfoCredentials.birthDate.split('/');
    const formattedDate = `${year}-${month}-${day}`;

    const response = await new Customer()
      .updateEmail(userInfoCredentials.email)
      .updateFirstName(userInfoCredentials.firstName)
      .updateLastName(userInfoCredentials.lastName)
      .updateBirthDate(formattedDate)
      .updateAddresses(billingAddresses)
      .updateAddresses(shippingAddresses)
      .sendUpdateRequest();

    return response;
  }

  private async sendNewBillingAddresses(): Promise<CustomerDataResponse | Error> {
    const newBillingAddresses = this.billingAddresses.getNewAddressesData();
    const response = await new Customer().addBillingAddresses(newBillingAddresses);
    return response;
  }

  private async sendNewShippingAddresses(): Promise<CustomerDataResponse | Error> {
    const newShippingAddresses = this.shippingAddresses.getNewAddressesData();
    const response = await new Customer().addShippingAddresses(newShippingAddresses);
    return response;
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
    // The reverse method is needed because
    // new addresses are added to the beginning of the array on the server,
    // and on the page new addresses are added to the end
    this.billingAddresses.updateExistingAddresses(response.billingAddressIds.reverse());
    this.shippingAddresses.updateExistingAddresses(response.shippingAddressIds.reverse());
    this.billingAddresses.addAddresses();
    this.shippingAddresses.addAddresses();
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
