import AddressView from '../AddressView';

const TITLE = 'Shipping Address';
const IDS = ['ship-street', 'ship-city', 'ship-postal-code'];

export default class ShippingAddressView extends AddressView {
  public buildAddressBlockView(): HTMLDivElement {
    return super.buildAddressBlockView(TITLE, IDS);
  }
}
