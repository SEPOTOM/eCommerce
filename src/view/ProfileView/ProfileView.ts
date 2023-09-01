import Converter from '../../components/Converter/Converter';
/* eslint-disable import/no-cycle */
import Customer from '../../api/Customer/Customer';
import HTML from './ProfileView.html';
import UserInfoView from './UserInfoView/UserInfoView';
import BillingAddressesView from './AddressesView/BillingAddressesView/BillingAddressesView';
import ShippingAddressesView from './AddressesView/ShippingAddressesView/ShippingAddressesView';
import ErrorView from './ErrorView/ErrorView';
import ButtonsView from './ButtonsView/ButtonsView';
import PasswordModalView from '../PasswordModalView/PasswordModalView';
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
  }

  private exitEditMode(): void {
    this.view.dataset.edit = 'false';

    this.userInfo.exitEditMode();

    this.hideMessages();
  }

  private async sendChanges(): Promise<void> {
    this.hideMessages();

    if (!this.validateFields()) {
      this.showErrors(ErrorMessages.INVALID_FIELDS);
      return;
    }

    const userInfoCredentials = this.userInfo.collectCredentials();

    const [month, day, year] = userInfoCredentials.birthDate.split('/');
    const formattedDate = `${year}-${month}-${day}`;

    const response = await new Customer()
      .updateEmail(userInfoCredentials.email)
      .updateFirstName(userInfoCredentials.firstName)
      .updateLastName(userInfoCredentials.lastName)
      .updateBirthDate(formattedDate)
      .sendUpdateRequest();

    if ('message' in response) {
      this.showErrors(response.message);
    } else {
      setTimeout(this.exitEditMode.bind(this), EXIT_EDIT_MODE_DELAY);

      this.buttonsViews.forEach((buttonsView) => {
        buttonsView.showSuccessMessage();
      });

      const userInfoData = [response.email, response.firstName, response.lastName];

      if (response.dateOfBirth) {
        userInfoData.push(response.dateOfBirth);
      }

      this.updateInfo(userInfoData);
    }
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
