import Alpine from 'alpinejs';
import Converter from '../../components/Converter/Converter';
import HeaderViewAlpine from './Alpine/HeaderViewAlpine';
import HeaderViewHTML from './HeaderView.html';
import CART_PRODUCT_COUNT from './data';

export default class HeaderView {
  public draw(): void {
    Alpine.data('Header', HeaderViewAlpine);
    document.body.append(Converter.htmlToElement(HeaderViewHTML)!);
  }

  public setProductAmount(amount: number): void {
    const cartCount: HTMLElement = document.querySelector(`#${CART_PRODUCT_COUNT}`) as HTMLElement;
    cartCount.textContent = String(amount);
  }
}
