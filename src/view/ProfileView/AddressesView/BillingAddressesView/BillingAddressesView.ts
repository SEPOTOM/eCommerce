import AddressesView from '../AddressesView';
import { AddressTypes } from '../../data';

export default class BillingAddressesView extends AddressesView {
  constructor() {
    super(AddressTypes.BILLING);
  }
}
