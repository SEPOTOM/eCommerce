import Converter from '../../../components/Converter/Converter';
import HTML from './AddressesView.html';
import AddressView from './AddressView/AddressView';
import { CustomerDataResponse, Address } from '../../../types';
import { DataAttrs, AddressTypes } from '../data';
import { DEFAULT_COUNTRY } from '../../../data/countries';

const DEFAULT_ADDRESS_DATA: Address = {
  streetName: '',
  city: '',
  country: DEFAULT_COUNTRY,
  postalCode: '',
};

enum ClassNames {
  GRAY_BG = 'bg-gray-100',
}

enum Ids {
  BILLING = 'billingAddressIds',
  SHIPPING = 'shippingAddressIds',
  DEFAULT_BILLING = 'defaultBillingAddressId',
  DEFAULT_SHIPPING = 'defaultShippingAddressId',
}

export default abstract class AddressesView {
  private view = Converter.htmlToElement<HTMLElement>(HTML) || document.createElement('section');

  private addresses: AddressView[] = [];

  private newAddresses: AddressView[] = [];

  private biggestAddressId = 0;

  constructor(private type: string) {}

  public buildView(customerData: CustomerDataResponse): HTMLElement {
    this.configureTitle();
    this.configureList(customerData);
    this.configureAddButton();
    this.colorAddresses();

    return this.view;
  }

  public enterEditMode(): void {
    this.addresses.forEach((address) => {
      address.enterEditMode();
    });

    this.view.dataset.edit = 'true';
  }

  public exitEditMode(): void {
    this.removeNewAddresses();
    this.newAddresses = [];

    this.addresses.forEach((address) => {
      address.exitEditMode();
    });

    this.view.dataset.edit = 'false';
  }

  public getCurrentAddressesData(): Address[] {
    return this.addresses.map((newAddress) => newAddress.getData());
  }

  public getNewAddressesData(): Address[] {
    return this.newAddresses.map((newAddress) => newAddress.getData());
  }

  public getDeletedAddresses(): Address[] {
    return this.addresses.filter((address) => address.needToDelete()).map((address) => address.getData());
  }

  public deleteAddresses(): void {
    this.addresses = this.addresses.filter((address) => {
      if (address.needToDelete()) {
        address.remove();
        return false;
      }
      return true;
    });
  }

  public addAddresses(): void {
    this.updateAddresses(this.newAddresses);

    this.addresses = this.addresses.concat(this.newAddresses);
    this.newAddresses = [];
  }

  public updateExistingAddresses(ids: string[]): void {
    this.updateAddresses(this.addresses);
    this.addresses.forEach((address, index) => {
      address.updateId(ids[index]);
    });
  }

  private updateAddresses(addresses: AddressView[]): void {
    addresses.forEach((address) => {
      const addressData = address.getData();
      const addressInfo = [addressData.streetName, addressData.city, addressData.country, addressData.postalCode];
      address.updateView(addressInfo);
    });
  }

  private configureTitle(): void {
    const title = this.view.querySelector(`[${DataAttrs.ADDRESSES_TITLE}]`);
    const titlePrefix = `${this.type[0].toUpperCase()}${this.type.slice(1)}`;

    if (title) {
      title.textContent = `${titlePrefix} ${title.textContent}`;
    }
  }

  private configureAddButton(): void {
    const addButton = this.view.querySelector(`[${DataAttrs.ADD_ADDRESS_BUTTON}]`);
    addButton?.addEventListener('click', this.addAddress.bind(this, true));
  }

  private addAddress(isEdit = false): void {
    const addressesList = this.view.querySelector(`[${DataAttrs.ADDRESSES_LIST}]`);
    const newAddress = new AddressView().buildView(
      DEFAULT_ADDRESS_DATA,
      `-${this.type}-${(this.biggestAddressId += 1)}`
    );

    if (isEdit) {
      newAddress.enterEditMode();
    }

    this.newAddresses.push(newAddress);
    addressesList?.append(newAddress.getView());

    this.colorAddresses();
  }

  private configureList(customerData: CustomerDataResponse): void {
    const list = this.view.querySelector(`[${DataAttrs.ADDRESSES_LIST}]`);

    const addressIds = this.type === AddressTypes.BILLING ? Ids.BILLING : Ids.SHIPPING;
    const defaultId = this.type === AddressTypes.BILLING ? Ids.DEFAULT_BILLING : Ids.DEFAULT_SHIPPING;

    // The reverse method is needed because
    // new addresses are added to the beginning of the array on the server,
    // and on the page new addresses are added to the end
    customerData[addressIds].reverse().forEach((id: string) => {
      const addressData = customerData.addresses.find((address) => address.id === id);

      if (addressData) {
        const address = new AddressView().buildView(addressData, `-${this.type}-${(this.biggestAddressId += 1)}`);
        const addressView = address.getView();

        if (id === customerData[defaultId]) {
          address.makeDefault();

          list?.prepend(addressView);
          this.addresses.unshift(address);
          this.setHaveDefault();

          return;
        }

        list?.append(addressView);
        this.addresses.push(address);
      }
    });
  }

  private colorAddresses(): void {
    const totalAddresses = [...this.addresses, ...this.newAddresses];

    totalAddresses.forEach((address, index) => {
      if (address.isDefault()) {
        return;
      }

      if (index % 2 === 0) {
        address.getView().classList.add(ClassNames.GRAY_BG);
      }
    });
  }

  private setHaveDefault(): void {
    this.view.dataset.haveDefault = 'true';
  }

  private removeNewAddresses(): void {
    this.newAddresses.forEach((newAddress) => {
      newAddress.remove();
    });
  }
}
