/* eslint-disable import/no-cycle */
import Converter from '../../components/Converter/Converter';
import Cart from '../../components/Cart/Cart';
import HTML from './CartView.html';
import ProductView from './ProductView/ProductView';
import ErrorView from '../ErrorView/ErrorView';
import { ProductInfo } from '../../types';
import { DataAttrs, Events } from './data';

const HIDE_DELAY = 3000;

export default class CartView {
  private view = Converter.htmlToElement<HTMLDivElement>(HTML) || document.createElement('div');

  private cart = new Cart();

  private productsObjects: ProductView[] = [];

  constructor() {
    this.configureView();
  }

  public draw(): void {
    const main = document.querySelector('main');

    if (main) {
      main.innerHTML = '';
      main.append(this.view);
    }
  }

  private async configureView(): Promise<void> {
    this.view.addEventListener(Events.PRODUCT_DELETED, () => {
      setTimeout(() => {
        if (this.isListEmpty()) {
          this.makeEmpty();
        }
      }, 0);
    });

    this.view.addEventListener(Events.CHANGE_TOTAL_PRICE, this.updateTotalPrice.bind(this));

    const cartData = await this.cart.getCart();

    if ('message' in cartData) {
      this.showError(cartData.message);
      return;
    }

    const productsInfo = cartData.getProductsInfo();

    if (productsInfo.length > 0) {
      this.configurePromoButton();
      this.configureList(productsInfo);
      this.configureTotalPrice(cartData.getTotalPrice());
      this.makeFilled();
    }
  }

  private configurePromoButton(): void {
    const promoButton = this.view.querySelector(`[${DataAttrs.PROMO_BUTTON}]`);
    promoButton?.addEventListener('click', this.applyPromoCode.bind(this));
  }

  private configureList(productsInfo: ProductInfo[]): void {
    const list = this.view.querySelector(`[${DataAttrs.PRODUCTS_LIST}]`);

    productsInfo.forEach((productInfo, index) => {
      const productObject = new ProductView(this.cart);
      this.productsObjects.push(productObject);

      const productItem = productObject.buildView(productInfo, `${index}`);
      list?.append(productItem);
    });
  }

  private configureTotalPrice(totalPrice: string): void {
    const totalPriceBlock = this.view.querySelector(`[${DataAttrs.TOTAL_PRICE}]`);

    if (totalPriceBlock) {
      totalPriceBlock.textContent = totalPrice;
    }
  }

  private showError(message: string): void {
    const errorBlock = new ErrorView().buildView(message);

    this.view.innerHTML = '';
    this.view.append(errorBlock);
  }

  private makeFilled(): void {
    this.view.dataset.filled = 'true';
  }

  private makeEmpty(): void {
    this.view.dataset.filled = 'false';
  }

  private isListEmpty(): boolean {
    const list = this.view.querySelector(`[${DataAttrs.PRODUCTS_LIST}]`);

    if (list) {
      return list.children.length === 0;
    }

    return true;
  }

  private updateTotalPrice(): void {
    const totalPrice = this.cart.getTotalPrice();
    this.configureTotalPrice(totalPrice);
  }

  private updateProductsTotalPrices(): void {
    this.productsObjects.forEach((productObject) => {
      productObject.updateTotalPrice();
    });
  }

  private async applyPromoCode(): Promise<void> {
    const promoInput = this.view.querySelector(`[${DataAttrs.PROMO_INPUT}]`);

    if (promoInput instanceof HTMLInputElement) {
      const code = promoInput.value;

      if (code === '') {
        return;
      }

      const response = await this.cart.applyPromoCode(code);

      if (response instanceof Error) {
        return;
      }

      promoInput.value = '';

      this.updateTotalPrice();
      this.updateProductsTotalPrices();

      this.showPromoSuccess();

      setTimeout(this.hidePromoSuccess.bind(this), HIDE_DELAY);
    }
  }

  private showPromoSuccess(): void {
    const promoSuccessBlock = this.view.querySelector(`[${DataAttrs.PROMO_SUCCESS}]`);

    if (promoSuccessBlock instanceof HTMLElement) {
      promoSuccessBlock.classList.remove('hidden');
    }
  }

  private hidePromoSuccess(): void {
    const promoSuccessBlock = this.view.querySelector(`[${DataAttrs.PROMO_SUCCESS}]`);

    if (promoSuccessBlock instanceof HTMLElement) {
      promoSuccessBlock.classList.add('hidden');
    }
  }
}
