import AddressView from '../AddressView';
import { Address } from '../../../../types';

const TITLE = 'Billing Address';
const OPPOSITE_TITLE = 'Shipping Address';
const INPUTS_IDS = ['bill-street', 'bill-city', 'bill-postal-code'];
const CHECKBOXES_IDES = ['bill-use-as'];
const SELECT_ID = 'bill-countries';

export default class BillingAddressView extends AddressView {
  public buildAddressBlockView(): HTMLDivElement {
    return super.buildAddressBlockView(TITLE, INPUTS_IDS, CHECKBOXES_IDES, OPPOSITE_TITLE, SELECT_ID);
  }

  public collectCredentials(): Address {
    return super.collectCredentials(INPUTS_IDS);
  }
}
