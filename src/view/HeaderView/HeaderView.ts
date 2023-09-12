import Alpine from 'alpinejs';
import Converter from '../../components/Converter/Converter';
import HeaderViewAlpine from './Alpine/HeaderViewAlpine';
import HeaderViewHTML from './HeaderView.html';
// eslint-disable-next-line import/no-cycle
import CartAPI from '../../api/CartAPI/CartAPI';
// eslint-disable-next-line import/no-cycle
import Cart from '../../components/Cart/Cart';

export default class HeaderView {
  public draw(): void {
    Alpine.data('Header', HeaderViewAlpine);
    document.body.append(Converter.htmlToElement(HeaderViewHTML)!);
    this.setDefaultProductAmount();
  }

  private async setDefaultProductAmount(): Promise<void> {
    const cartState = await CartAPI.get();
    const cart = new Cart();
    cart.updateCurrentCart(cartState);
  }
}
