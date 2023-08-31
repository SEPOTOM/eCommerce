import Converter from '../../components/Converter/Converter';
/* eslint-disable import/no-cycle */
import Customer from '../../api/Customer/Customer';
import HTML from './ProfileView.html';
import UserInfoView from './UserInfoView/UserInfoView';
import BillingAddressesView from './AddressesView/BillingAddressesView/BillingAddressesView';
import ShippingAddressesView from './AddressesView/ShippingAddressesView/ShippingAddressesView';
import ErrorView from './ErrorView/ErrorView';
import ButtonsView from './ButtonsView/ButtonsView';
import { DataAttrs } from './data';

const EXIT_EDIT_MODE_DELAY = 1000;
const DATE_DATA_INDEX = 2;

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
  }

  private exitEditMode(): void {
    this.view.dataset.edit = 'false';

    this.userInfo.exitEditMode();
  }

  private async sendChanges(): Promise<void> {
    const userInfoCredentials = this.userInfo.collectCredentials();

    const [month, day, year] = userInfoCredentials.birthDate.split('/');
    const formattedDate = `${year}-${month}-${day}`;

    const response = await new Customer()
      .updateFirstName(userInfoCredentials.firstName)
      .updateLastName(userInfoCredentials.lastName)
      .updateBirthDate(formattedDate)
      .sendUpdateRequest();

    if ('message' in response) {
      console.error(response.message);
    } else {
      setTimeout(this.exitEditMode.bind(this), EXIT_EDIT_MODE_DELAY);

      const userInfoData = [response.firstName, response.lastName];

      if (response.dateOfBirth) {
        userInfoData.push(response.dateOfBirth);
      }

      this.updateInfo(userInfoData);
    }
  }

  private updateInfo(userInfoData: string[]): void {
    const localUserInfoData = userInfoData;

    const [year, month, day] = localUserInfoData[DATE_DATA_INDEX];
    const formattedDate = `${month}/${day}/${year}`;
    localUserInfoData[DATE_DATA_INDEX] = formattedDate;

    this.userInfo.updateInfo(userInfoData);
  }
}
