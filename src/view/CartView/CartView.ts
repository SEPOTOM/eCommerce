/* eslint-disable import/no-cycle */
import Converter from '../../components/Converter/Converter';
import Cart from '../../components/Cart/Cart';
import HTML from './CartView.html';
import ProductView from './ProductView/ProductView';
import ErrorView from '../ErrorView/ErrorView';
import { ProductInfo } from '../../types';
import { DataAttrs } from './data';

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
    const cartData = await this.cart.getCart();

    if ('message' in cartData) {
      this.showError(cartData.message);
      return;
    }

    this.configureList(cartData.getProductsInfo());
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
}
