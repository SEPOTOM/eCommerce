import AddressView from '../AddressView';
import { Address } from '../../../../types';

const TITLE = 'Billing Address';
const INPUTS_IDS = ['bill-street', 'bill-city', 'bill-postal-code'];
const CHECKBOXES_IDES = ['bill-use-as'];

export default class BillingAddressView extends AddressView {
  public buildAddressBlockView(): HTMLDivElement {
    return super.buildAddressBlockView(TITLE, INPUTS_IDS, CHECKBOXES_IDES);
  }

  public collectCredentials(): Omit<Address, 'country'> {
    return super.collectCredentials(INPUTS_IDS);
  }
}
