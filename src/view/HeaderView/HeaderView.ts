import Alpine from 'alpinejs';
import Converter from '../../components/Converter/Converter';
import HeaderViewAlpine from './Alpine/HeaderViewAlpine';
import HeaderViewHTML from './HeaderView.html';
import CART_PRODUCT_COUNT from '../../components/Cart/data';

export default class HeaderView {
  public draw(): void {
    Alpine.data('Header', HeaderViewAlpine);
    document.body.append(Converter.htmlToElement(HeaderViewHTML)!);
    this.setDefaultCartAmount();
  }

  private setDefaultCartAmount(): void {
    const amount = localStorage.getItem('cartAmount');
    if (amount) {
      const cartCount: HTMLElement = document.querySelector(`#${CART_PRODUCT_COUNT}`) as HTMLElement;
      cartCount.textContent = String(amount);
    }
  }
}
