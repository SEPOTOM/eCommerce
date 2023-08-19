import AddressView from '../AddressView';

const TITLE = 'Shipping Address';
const IDS = ['ship-street', 'ship-city', 'ship-postal-code'];
const CHECKBOXES_IDES = ['ship-use-as'];

export default class ShippingAddressView extends AddressView {
  public buildAddressBlockView(): HTMLDivElement {
    return super.buildAddressBlockView(TITLE, IDS, CHECKBOXES_IDES);
  }
}
