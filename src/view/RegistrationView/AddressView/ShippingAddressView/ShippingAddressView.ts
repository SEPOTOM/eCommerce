import AddressView from '../AddressView';
import { Address } from '../../../../types';

const TITLE = 'Shipping Address';
const INPUTS_IDS = ['ship-street', 'ship-city', 'ship-postal-code'];
const CHECKBOXES_IDES = ['ship-use-as'];

export default class ShippingAddressView extends AddressView {
  public buildAddressBlockView(): HTMLDivElement {
    return super.buildAddressBlockView(TITLE, INPUTS_IDS, CHECKBOXES_IDES);
  }

  public collectCredentials(): Omit<Address, 'country'> {
    return super.collectCredentials(INPUTS_IDS);
  }
}
