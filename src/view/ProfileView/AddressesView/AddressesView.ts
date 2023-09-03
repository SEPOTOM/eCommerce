import Converter from '../../../components/Converter/Converter';
import HTML from './AddressesView.html';
import AddressView from './AddressView/AddressView';
import { CustomerDataResponse } from '../../../types';
import { DataAttrs, AddressTypes } from '../data';

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

  constructor(private type: string) {}

  public buildView(customerData: CustomerDataResponse): HTMLElement {
    this.configureTitle();
    this.configureList(customerData);
    this.colorAddresses();

    return this.view;
  }

  public enterEditMode(): void {
    this.view.dataset.edit = 'true';
  }

  public exitEditMode(): void {
    this.view.dataset.edit = 'false';
  }

  private configureTitle(): void {
    const title = this.view.querySelector(`[${DataAttrs.ADDRESSES_TITLE}]`);
    const titlePrefix = `${this.type[0].toUpperCase()}${this.type.slice(1)}`;

    if (title) {
      title.textContent = `${titlePrefix} ${title.textContent}`;
    }
  }

  private configureList(customerData: CustomerDataResponse): void {
    const list = this.view.querySelector(`[${DataAttrs.ADDRESSES_LIST}]`);

    const addressIds = this.type === AddressTypes.BILLING ? Ids.BILLING : Ids.SHIPPING;
    const defaultId = this.type === AddressTypes.BILLING ? Ids.DEFAULT_BILLING : Ids.DEFAULT_SHIPPING;

    customerData[addressIds].forEach((id: string) => {
      const addressData = customerData.addresses.find((address) => address.id === id);

      if (addressData) {
        const address = new AddressView().buildView(addressData);
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
    this.addresses.forEach((address, index) => {
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
}
