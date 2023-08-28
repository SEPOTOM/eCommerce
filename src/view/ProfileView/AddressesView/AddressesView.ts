import Converter from '../../../components/Converter/Converter';
import HTML from './AddressesView.html';
import AddressView from './AddressView/AddressView';
import { CustomerDataResponse } from '../../../types';
import { DataAttrs, AddressTypes } from '../data';

enum ClassNames {
  GRAY_BG = 'bg-gray-100',
}

export default abstract class AddressesView {
  private view = Converter.htmlToElement<HTMLElement>(HTML) || document.createElement('section');

  constructor(private type: string) {}

  public buildView(customerData: CustomerDataResponse): HTMLElement {
    this.configureTitle();
    this.configureList(customerData);

    return this.view;
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

    const addressIds = this.type === AddressTypes.BILLING ? 'billingAddressIds' : 'shippingAddressIds';

    customerData[addressIds].forEach((id: string, index) => {
      const addressData = customerData.addresses.find((address) => address.id === id);

      if (addressData) {
        const address = new AddressView().buildView(addressData);

        if (index % 2 === 0) {
          address.classList.add(ClassNames.GRAY_BG);
        }

        list?.append(address);
      }
    });
  }
}
