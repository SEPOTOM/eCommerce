/* eslint-disable import/no-cycle */
import Converter from '../../components/Converter/Converter';
import Cart from '../../components/Cart/Cart';
import HTML from './CartView.html';
import ProductView from './ProductView/ProductView';
import ErrorView from '../ErrorView/ErrorView';
import { ProductInfo } from '../../types';
import { DataAttrs, Events } from './data';

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
      if (this.isListEmpty()) {
        this.makeEmpty();
      }
    });

    const cartData = await this.cart.getCart();

    if ('message' in cartData) {
      this.showError(cartData.message);
      return;
    }

    const productsInfo = cartData.getProductsInfo();

    if (productsInfo.length > 0) {
      this.configureList(productsInfo);
      this.makeFilled();
    }
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
      return list.children.length > 0;
    }

    return true;
  }
}
