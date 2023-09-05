import AddressesView from '../AddressesView';
import { AddressTypes } from '../../data';

export default class ShippingAddressesView extends AddressesView {
  constructor() {
    super(AddressTypes.SHIPPING);
  }
}
