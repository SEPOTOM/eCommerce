import Alpine from 'alpinejs';
import Converter from '../../components/Converter/Converter';
import HeaderViewAlpine from './Alpine/HeaderViewAlpine';
import HeaderViewHTML from './HeaderView.html';

export default class HeaderView {
  public draw(): void {
    Alpine.data('Header', HeaderViewAlpine);
    document.body.append(Converter.htmlToElement(HeaderViewHTML)!);
    this.setDefaultCartAmount();
  }

  public static setBasketCount(value: number): void {
    const basket: HTMLElement = document.querySelector('[data-element="cart-count"]')!;
    const count: string = value > 99 ? '99' : `${value}`;
    localStorage.setItem('cartAmount', count);
    basket.innerHTML = count;
  }

  private setDefaultCartAmount(): void {
    const basket: HTMLElement = document.querySelector('[data-element="cart-count"]')!;
    if (localStorage.getItem('cartAmount')) basket.innerHTML = localStorage.getItem('cartAmount')!;
  }
}
