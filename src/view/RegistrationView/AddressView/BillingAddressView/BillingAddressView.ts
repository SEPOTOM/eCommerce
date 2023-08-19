import AddressView from '../AddressView';

const TITLE = 'Billing Address';
const IDS = ['bill-street', 'bill-city', 'bill-postal-code'];
const CHECKBOXES_IDES = ['bill-use-as'];

export default class BillingAddressView extends AddressView {
  public buildAddressBlockView(): HTMLDivElement {
    return super.buildAddressBlockView(TITLE, IDS, CHECKBOXES_IDES);
  }
}
